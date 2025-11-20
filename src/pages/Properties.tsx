import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchFilters } from "@/components/SearchFilters";
import { useSearchParams } from "react-router-dom";
import { API_URL } from "@/config";
import { mockProperties } from "@/data/properties";

// 👇 تعريف نوع العقار اللي بيجي من Django
interface Property {
  id: string;
  name: string;
  address: string;
  price: number;
    area?: string;
  rooms?: number;
  type?: string;
  furnished?: boolean;
  images: { image_url: string }[];
}

const Properties: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialArea = searchParams.get("area") || "";

  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<any>({});

  // 🔹 جلب العقارات من الـ API
  useEffect(() => {
    setLoading(true);
    // Use mock properties directly
    const data = mockProperties;
    setProperties(data);
    setFilteredProperties(
      initialArea
        ? data.filter(
            (p) =>
              p.area &&
              (p.area.name === initialArea ||
                p.area.id?.toString() === initialArea)
          )
        : data
    );
    setLoading(false);
  }, [initialArea]);
  // 🔍 وظيفة البحث والفلترة
  const handleSearch = (filters: any) => {
    setFilters(filters);
    let filtered = [...properties];

    // ✅ فلترة حسب المنطقة (الآن يعمل بشكل صحيح)
    if (filters.area) {
      filtered = filtered.filter(
        (p) =>
          p.area &&
          (p.area.name === filters.area ||
            p.area.id?.toString() === filters.area)
      );
    }

    if (filters.rooms) {
      const roomCount = filters.rooms === "5+" ? 5 : parseInt(filters.rooms);
      filtered = filtered.filter((p) =>
        filters.rooms === "5+"
          ? p.rooms! >= roomCount
          : p.rooms === roomCount
      );
    }

    if (filters.propertyType) {
      filtered = filtered.filter((p) => p.type === filters.propertyType);
    }

    if (filters.furnished !== "") {
      const isFurnished = filters.furnished === "true";
      filtered = filtered.filter((p) => p.furnished === isFurnished);
    }

    if (filters.priceRange) {
      filtered = filtered.filter(
        (p) =>
          Number(p.price) >= filters.priceRange[0] &&
          Number(p.price) <= filters.priceRange[1]
      );
    }

    setFilteredProperties(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />

      <main className="flex-1 mt-16">
        {/* هيدر الصفحة */}
        <div className="bg-primary/5 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">عقارات للإيجار</h1>
            <p className="text-muted-foreground">
              {initialArea
                ? `عقارات في ${initialArea}`
                : "جميع العقارات المتاحة"}
            </p>
          </div>
        </div>

        {/* الفلاتر والنتائج */}
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <SearchFilters onSearch={handleSearch} initialArea={initialArea} />
          </div>

          {loading ? (
            <div className="text-center text-gray-500 py-20">
              جارٍ تحميل العقارات...
            </div>
          ) : filteredProperties.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  عرض {filteredProperties.length} عقار
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => {
                  const imageUrl =
                    property.images && property.images.length > 0
                      ? property.images[0].image_url
                      : "https://via.placeholder.com/400x300?text=No+Image";

                  return (
                    <PropertyCard
                      key={property.id}
                      property={{ ...property, image: imageUrl }}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold mb-2">لا توجد نتائج</h3>
              <p className="text-muted-foreground">
                جرب تعديل معايير البحث للعثور على عقارات مناسبة
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Properties;
