import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import CompanyCard from "../core/CompanyCard";
import { Info } from "lucide-react";
import { Movie, TVShow } from "@/types";
import { isMovie } from "@/lib/utils";
import { format } from "date-fns";

export function MediaAditionalInfo({ media }: { media: Movie | TVShow }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full group/watchlist"
        >
          <Info className="size-md" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto max-h-screen max-w-80">
        <SheetHeader>
          <SheetTitle>
            {isMovie(media) ? media.original_title : media.original_name}
          </SheetTitle>
          <Separator />

          <SheetDescription>
            <div className="flex-col space-y-2">
              <p>{media.overview}</p>
              <Separator />
              {isMovie(media) ? (
                <>
                  <InfoRow
                    label="Release Date"
                    value={
                      media.release_date
                        ? format(new Date(media.release_date), "MMMM dd, yyyy")
                        : "N/A"
                    }
                  />
                  <InfoRow
                    label="Runtime"
                    value={media.runtime ? `${media.runtime} min` : "N/A"}
                  />

                  <InfoRow label="Popularity" value={media.popularity} />
                  <InfoRow
                    label="Budget"
                    value={
                      media.budget ? `$${media.budget.toLocaleString()}` : "N/A"
                    }
                  />
                  <InfoRow
                    label="Revenue"
                    value={
                      media.revenue
                        ? `$${media.revenue.toLocaleString()}`
                        : "N/A"
                    }
                  />
                  <InfoRow
                    label="Original Language"
                    value={media.original_language}
                  />
                  <InfoRow
                    label="Adult Content"
                    value={media.isAdult ? "Yes" : "No"}
                  />
                  <InfoRow label="Status" value={media.status} />
                  <InfoRow label="Homepage" value={media.homepage} isLink />
                </>
              ) : (
                <>
                  <InfoRow
                    label="First Air Date"
                    value={
                      media.first_air_date
                        ? format(
                            new Date(media.first_air_date),
                            "MMMM dd, yyyy"
                          )
                        : "N/A"
                    }
                  />
                  <InfoRow
                    label="Last Air Date"
                    value={
                      media.last_air_date
                        ? format(new Date(media.last_air_date), "MMMM dd, yyyy")
                        : "N/A"
                    }
                  />
                  <InfoRow label="Popularity" value={media.popularity} />
                  <InfoRow
                    label="Origin Country"
                    value={media.origin_country?.join(", ")}
                  />
                  <InfoRow
                    label="Original Language"
                    value={media.original_language}
                  />
                  <InfoRow label="Episodes" value={media.number_of_episodes} />
                  <InfoRow label="Seasons" value={media.number_of_seasons} />
                  <InfoRow label="Status" value={media.status} />
                </>
              )}
              <Separator />

              <div className="flex flex-wrap">
                {media.production_companies?.map((el) => (
                  <CompanyCard company={el} key={el.id} />
                ))}
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

function InfoRow({
  label,
  value,
  isLink,
}: {
  label: string;
  value?: string | number | null;
  isLink?: boolean;
}) {
  if (!value) return null;

  return (
    <div className="flex justify-between gap-x-2">
      <span className="font-bold">{label}:</span>
      {isLink ? (
        <a
          href={value as string}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline w-full truncate"
        >
          {value}
        </a>
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
}
