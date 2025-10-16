import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { AreaCard } from "@/components/AreaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Building2, Shield, Clock, Award } from "lucide-react";
import { alexandriaAreas } from "@/data/properties";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import { fetchProperties } from "@/api";
import { Property as PropertyType } from "@/data/properties";

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
          style={{ backgroundImage: `url(${heroBg})` }}
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

export default Index;

const FeatureCard = ({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) => (
  <div className="text-center space-y-3">
    <div className="inline-flex p-4 bg-primary/10 rounded-full">{icon}</div>
    <h3 className="font-bold text-lg">{title}</h3>
    <p className="text-sm text-muted-foreground">{text}</p>
  </div>
);
