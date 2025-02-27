import { People } from "@/types";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CastCard({ person }: { person: People }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => setImageLoaded(true);

  return (
    <div className="flex flex-col items-center">
      {!imageLoaded && !person.profile_path && (
        <div className="w-full aspect-[2/3] rounded-lg bg-muted/20 flex items-center justify-center text-muted-foreground">
          No Image Available
        </div>
      )}
      {!imageLoaded && person.profile_path && <Skeleton className="w-full aspect-[2/3] rounded-lg" />}
      {person.profile_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
          alt={person.name}
          className={`w-full rounded-lg transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0 hidden"
          }`}
          onLoad={handleImageLoad}
        />
      )}
      <p className="text-xs mt-4 text-center">{person.name}</p>
      <p className="text-xs mt-2 text-center text-muted-foreground">{person.character}</p>
    </div>
  );
}
