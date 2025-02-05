import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonMediaCard() {
  return (
    <div className="flex flex-col space-y-3 min-w-[110px]">
      <Skeleton className="h-[250px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4" />
        <div className="flex space-x-2 pt-2">
          <div className="grow">
            <Skeleton className="size-5 rounded-full" />
          </div>
          <Skeleton className="size-5 rounded-full" />
          <Skeleton className="size-5 rounded-full" />
        </div>
      </div>
    </div>
  );
}
