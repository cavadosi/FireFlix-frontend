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
import CompanyCard from "@/components/core/CompanyCard";
import ProviderCard from "@/components/core/ProviderCard";
import { Info } from "lucide-react";
import { Movie, TVShow, WatchProvider } from "@/types";
import { isMovie } from "@/lib/utils";
import { format } from "date-fns";

export function MediaAditionalInfo({ media }: { media: Movie | TVShow }) {
  const providersKey = media.watchProviders?.results
    ? Object.keys(media.watchProviders.results)[0]
    : null;
  const providers = providersKey
    ? media.watchProviders?.results[providersKey]
    : null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full group/watchlist"
        >
          <Info className="size-sm" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto max-h-screen max-w-80">
        <SheetHeader>
          <SheetTitle>
            {isMovie(media) ? media.original_title : media.original_name}
          </SheetTitle>
          <Separator />

          <SheetDescription asChild>
            <div className="flex-col space-y-4">
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
                </>
              )}

              <Separator />
              {providers ? (
                <div>
                  {Object.keys(providers).map((category, key) => {
                    const categoryProviders = providers[category];
                    return categoryProviders && categoryProviders.length > 0 ? (
                      <div
                        key={key}
                        className="my-4 rounded-md bg-secondary p-2"
                      >
                        <h2 className="text-start text-lg font-semibold capitalize mb-4">
                          {category}
                        </h2>
                        <div className="flex flex-wrap gap-y-2">
                          {categoryProviders.map(
                            (provider: WatchProvider, key: number) => (
                              <ProviderCard key={key} provider={provider} />
                            )
                          )}
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              ) : (
                <div className="my-4 rounded-md bg-secondary p-4 text-center text-sm ">
                  No providers available.
                </div>
              )}

              <div>
                <Separator />
                {media.production_companies &&
                media.production_companies.length > 0 ? (
                  <>
                    <div className="my-4 rounded-md bg-secondary">
                      <h2 className="text-start text-lg font-semibold capitalize pt-2 px-2">
                        Produced by
                      </h2>
                      <div className=" flex flex-wrap">
                        {media.production_companies?.map((el) => (
                          <CompanyCard company={el} key={el.id} />
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="my-4 rounded-md bg-secondary p-4 text-center text-sm ">
                    No production companies available.
                  </div>
                )}
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
