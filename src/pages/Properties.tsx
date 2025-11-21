import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchFilters } from "@/components/SearchFilters";
import { useSearchParams } from "react-router-dom";
import { API_URL } from "@/config";

// 👇 نوع بيانات العقار القادم من Django
interface Property {
  id: string;
  name: string;
  address: string;
  price: number;
  area?: string;
  rooms?: number;
  type?: string;
  furnished?: boolean;
  images: string[];
}

const Properties: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialArea = searchParams.get("area") || "";

  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 جلب العقارات من API
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API_URL}/properties/`);
        setProperties(data);

        // لو فيه Area جاية من الرابط
        setFilteredProperties(
          initialArea
            ? data.filter((p: Property) => p.area === initialArea)
            : data
        );
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [initialArea]);

  // 🔍 الفلاتر
  const handleSearch = (filters: any) => {
    let filtered = [...properties];

    if (filters.area) {
      filtered = filtered.filter((p) => p.area === filters.area);
    }

    if (filters.rooms) {
      const roomCount = filters.rooms === "5+" ? 5 : parseInt(filters.rooms);
      filtered = filtered.filter((p) =>
        filters.rooms === "5+" ? p.rooms! >= roomCount : p.rooms === roomCount
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
                    property.images?.[0] ||
                    "https://via.placeholder.com/400x300?text=No+Image";

                  return (
                    <PropertyCard
                      key={property.id}
                      property={{ ...property, images: [imageUrl] }}
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
