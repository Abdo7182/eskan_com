import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { fetchProperties } from "@/data/properties";
import { SearchFilters } from "@/components/SearchFilters";
import { useSearchParams } from "react-router-dom";
import { API_URL } from "@/config";

// تعريف واجهة البيانات
interface Property {
  id: string;
  name: string;
  address: string;
  price: number;
  area?: any; // جعلناها any لتقبل كائن أو نص
  rooms?: number;
  bathrooms?: number;
  size?: number;
  type?: string;
  furnished?: boolean;
  floor?: number;
  featured?: boolean;
  images: { image_url: string }[];
}

const Properties: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialArea = searchParams.get("area") || "";

  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // جلب البيانات
const Index = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties()
      .then((data) => {
        // يمكنك تخصيص العدد أو التصفية (مثل featured فقط)
        setProperties(data.slice(0, 6));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const displayAreas = alexandriaAreas.slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0 hero-gradient" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              اعثر على شقتك المثالية
              <br />
              <span className="text-secondary">في الإسكندرية</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              آلاف العقارات المتاحة للإيجار في أفضل مناطق الإسكندرية
            </p>

            {/* Quick Search */}
            <div className="text-center mt-8">
              <Button asChild variant="outline" size="lg">
                <Link to="/properties" className="text-black">
                  عرض جميع المناطق
                </Link>
              </Button>
            </div>

            {/* <div className="bg-white rounded-lg p-2 shadow-xl max-w-2xl mx-auto">
              <div className="flex gap-2">
                <Input
                  placeholder="ابحث عن منطقة أو عقار..."
                  className="border-0 text-lg"
                />
                <Button size="lg" className="gap-2">
                  <Search className="h-5 w-5" />
                  بحث
                </Button>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-accent/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Building2 className="h-8 w-8 text-primary" />}
              title="آلاف العقارات"
              text="مجموعة واسعة من العقارات في جميع مناطق الإسكندرية"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-primary" />}
              title="موثوق وآمن"
              text="جميع العقارات معتمدة ومفحوصة من قبل فريقنا"
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8 text-primary" />}
              title="خدمة سريعة"
              text="استجابة فورية وتواصل مباشر مع الوسطاء"
            />
            <FeatureCard
              icon={<Award className="h-8 w-8 text-primary" />}
              title="أفضل الأسعار"
              text="عروض حصرية وأسعار تنافسية في السوق"
            />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            أحدث العقارات المضافة
          </h2>

          {loading ? (
            <div className="text-center">جارٍ التحميل...</div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              لا توجد عقارات حالياً.
            </p>
          )}
        </div>
      </section>

      {/* Areas */}
      {/* <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">استكشف مناطق الإسكندرية</h2>
            <p className="text-muted-foreground">اختر المنطقة المفضلة لديك</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayAreas.map((area) => (
              <AreaCard
                key={area}
                area={area}
                propertyCount={Math.floor(Math.random() * 50) + 10}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/properties">عرض جميع المناطق</Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            هل أنت وسيط عقاري؟
          </h2>
          <p className="text-lg mb-8 text-white/90">
            انضم إلى منصتنا وابدأ في عرض عقاراتك لآلاف المستخدمين
          </p>
          <Button size="lg" variant="secondary" className="gap-2">
            سجل كوسيط عقاري
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};
  // الفلاتر
  const handleSearch = (filters: any) => {
    let filtered = [...properties];

    if (filters.area) {
      filtered = filtered.filter((p) => {
        const pArea = typeof p.area === 'object' ? p.area.name : p.area;
        return pArea === filters.area;
      });
    }

    if (filters.rooms) {
      const roomCount = filters.rooms === "5+" ? 5 : parseInt(filters.rooms);
      filtered = filtered.filter((p) =>
        filters.rooms === "5+" ? (p.rooms || 0) >= roomCount : p.rooms === roomCount
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
                {/* هنا تم إصلاح الخطأ في الأقواس */}
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                  />
                ))}
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
