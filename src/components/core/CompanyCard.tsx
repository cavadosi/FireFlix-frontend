import { ProductionCompany } from "@/types";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "../ui/card";

export default function CompanyCard({ company }: { company: ProductionCompany }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => setImageLoaded(true);

  return (
    <div className="p-2 flex-grow basis-1/3">
      <Card className="flex flex-col items-center shadow-md ">
        {!imageLoaded && company.logo_path && (
          <Skeleton className="w-full aspect-video rounded-t-lg " />
        )}
        {company.logo_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
            alt={company.name}
            className={`aspect-video object-contain rounded-t-lg transition-opacity duration-300 bg-sidebar-foreground p-2 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
          />
        ) : (
          <div className="w-full aspect-video flex items-center justify-center bg-sidebar-foreground rounded-t-lg">
            <span className="text-sm text-gray-500">No Image</span>
          </div>
        )}
        <p className="text-sm font-medium my-2 text-center">{company.name}</p>
      </Card>
    </div>
  );
}
