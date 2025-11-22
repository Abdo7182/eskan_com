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
      </section>
      {/* Features */}
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
