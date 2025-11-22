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
import { fetchProperties } from "@/data/properties";
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
