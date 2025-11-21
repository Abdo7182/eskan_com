import { Property } from "../data/properties";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Bed, Bath, Maximize2, MapPin, Heart, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Star } from "lucide-react"; // ✅ بدل Heart بـ Star


const backendUrl = "https://abdo238923.pythonanywhere.com";

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // ✅ التعامل مع المنطقة (لأنها أصبحت كائن)
  const areaName =
    typeof property.area === "object" && property.area !== null
      ? property.area.name
      : property.area || "غير محدد";

  return (
    <Card className="property-card overflow-hidden group">
      <div className="relative h-64 overflow-hidden">
        {/* ✅ عرض الصورة */}
          <img
            src={
              property.images?.length > 0
? property.images[0]?.startsWith('http') ? property.images[0] : `${backendUrl}${property.images[0]}`                : "/default.jpg"
            }
            alt={property.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />


        <div className="card-gradient-overlay absolute inset-0" />

        {/* ✅ شارة مميز */}
        {property.featured && (
          <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
            مميز
          </Badge>
        )}

        {/* ✅ زر المفضلة */}
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

        {/* ✅ السعر */}
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
          {/* ✅ الاسم والمنطقة */}
          <div>
            <h3 className="font-bold text-lg mb-1 line-clamp-1">
              {property.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{areaName}</span>
            </div>
          </div>

          {/* ✅ تفاصيل العقار */}
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

          {/* ✅ الوسوم */}
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">{property.type}</Badge>
            <Badge variant="outline">
              {property.furnished ? "مفروشة" : "غير مفروشة"}
            </Badge>
            <Badge variant="outline">الطابق {property.floor}</Badge>
          </div>

          {/* ✅ الأزرار */}
          <div className="flex gap-2 pt-2">
            <Button asChild className="flex-1">
              <Link to={`/property/${property.id}`}>عرض التفاصيل</Link>
            </Button>
            {/* <Button variant="outline" size="icon">
              <Phone className="h-4 w-4" />
            </Button> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
