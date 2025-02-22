import { ReviewList } from "@/types";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { format } from "date-fns";

export function MediaReviewList({ reviews }: { reviews: ReviewList | null }) {
  if (!reviews) return null;

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold pl-6 bg-sidebar">Reviews</h2>
      <h2 className="sr-only">Media review</h2>
      <Separator />
      <div className="flex flex-col items-center justify-center w-full px-6 pt-4">
        <div className="-my-10">
          {reviews.results.map((review, reviewIdx) => (
            <div
              key={review.id}
              className="flex space-x-4 text-sm text-muted-foreground"
            >
              <div className="flex-none py-10">
                <Avatar className="h-10 w-10 overflow-hidden rounded-full">
                  <AvatarImage
                    alt="Author avatar"
                    src={
                      review.author_details.avatar_path
                        ? `https://image.tmdb.org/t/p/w200/${review.author_details.avatar_path}`
                        : undefined
                    }
                    className="h-full w-full object-cover"
                  />
                  <AvatarFallback>
                    {review.author_details.username.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div
                className={cn(
                  reviewIdx === 0 ? "" : "border-t border-border",
                  "flex-1 py-10"
                )}
              >
                <h3 className="font-medium text-foreground">{review.author}</h3>
                <p>
                  <time dateTime={review.created_at}>
                    {format(new Date(review.created_at), "PPP")}
                  </time>
                </p>
                {review.author_details.rating ? (
                  <div className="mt-4 flex items-center">
                    {[...Array(10).keys()].map((rating) => (
                      <Star
                        key={rating}
                        aria-hidden="true"
                        className={cn(
                          review.author_details.rating! > rating
                            ? "text-amber-500 fill-amber-500"
                            : "text-muted",
                          "size-5 shrink-0"
                        )}
                      />
                    ))}
                  </div>
                ) : null}
                <p className="sr-only">
                  {review.author_details.rating} out of 10 stars
                </p>
                <div
                  dangerouslySetInnerHTML={{ __html: review.content }}
                  className="mt-4 text-sm/6 text-muted-foreground text-pretty"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
