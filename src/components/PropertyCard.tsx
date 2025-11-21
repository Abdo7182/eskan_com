import { Property } from "../data/properties";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Bed, Bath, Maximize2, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const backendUrl = "https://abdo238923.pythonanywhere.com";

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // معالجة المنطقة
  const areaName =
    typeof property.area === "object" && property.area !== null
      ? property.area.name
      : property.area || "غير محدد";

  return (
    <Card className="property-card overflow-hidden group">
      <div className="relative h-64 overflow-hidden">

        {/* =======================
            عرض الصورة + fallback
        ========================== */}
        <img
          src={
            property.images?.length > 0
              ? property.images[0]?.startsWith("http")
                ? property.images[0]
                : `${backendUrl}${property.images[0]}`
              : "/default.jpg"
          }
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.onerror = null; // منع إعادة التحميل
            const parent = e.currentTarget.parentElement;

            e.currentTarget.style.display = "none"; // إخفاء الصورة

            if (parent) {
              parent.innerHTML = `
                <div style="
                  width: 100%;
                  height: 100%;
                  background: #f3f3f3;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  gap: 8px;
                  color: #666;
                  font-size: 16px;
                ">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                    width="42" 
                    height="42" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#888" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                  >
                    <path d="M2 2l20 20"></path>
                    <path d="M9.5 9.5L4 4h4l2-2h4l2 2h4l-4 4"></path>
                    <path d="M21 21H3a1 1 0 0 1-1-1V8"></path>
                    <path d="M8.32 8.32a4 4 0 1 0 5.36 5.36"></path>
                  </svg>
                  <span>الصورة غير متاحة</span>
                </div>
              `;
            }
          }}
        />

        {/* طبقة التظليل */}
        <div className="card-gradient-overlay absolute inset-0" />

        {/* شارة مميز */}
        {property.featured && (
          <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
            مميز
          </Badge>
        )}

        {/* زر المفضلة */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Star
            className={`h-4 w-4 ${
              isFavorite ? "fill-yellow-400 text-yellow-400" : ""
            }`}
          />
        </Button>

        {/* السعر */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div className="bg-background/95 backdrop-blur-sm px-4 py-2 rounded-lg">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-primary">
                {property.price.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">جنيه/شهر</span>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* العنوان والمنطقة */}
          <div>
            <h3 className="font-bold text-lg mb-1 line-clamp-1">
              {property.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{areaName}</span>
            </div>
          </div>

          {/* التفاصيل */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4 text-muted-foreground" />
              <span>{property.rooms} غرف</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4 text-muted-foreground" />
              <span>{property.bathrooms} حمام</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize2 className="h-4 w-4 text-muted-foreground" />
              <span>{property.size} م²</span>
            </div>
          </div>

          {/* الوسوم */}
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">{property.type}</Badge>
            <Badge variant="outline">
              {property.furnished ? "مفروشة" : "غير مفروشة"}
            </Badge>
            <Badge variant="outline">الطابق {property.floor}</Badge>
          </div>

          {/* الأزرار */}
          <div className="flex gap-2 pt-2">
            <Button asChild className="flex-1">
              <Link to={`/property/${property.id}`}>عرض التفاصيل</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
