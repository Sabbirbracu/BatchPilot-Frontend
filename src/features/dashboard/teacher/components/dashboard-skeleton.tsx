import { Skeleton } from "@/components/ui";

/** Same layout as the dashboard, so nothing jumps when the data lands. */
export function DashboardSkeleton() {
  return (
    <div aria-busy>
      <div className="flex items-center gap-3">
        <Skeleton className="size-11 rounded-2xl md:hidden" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 md:h-7 md:w-72" />
          <Skeleton className="h-6 w-36 md:h-4 md:w-48" />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-4 md:mt-5 xl:grid-cols-[minmax(0,1.22fr)_minmax(0,1fr)_minmax(250px,0.62fr)] xl:gap-5">
        <Skeleton className="h-[210px] rounded-[26px] md:h-[200px] xl:rounded-panel" />
        <div className="grid grid-cols-4 gap-2.5 xl:hidden">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[96px] rounded-[22px]" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-2 xl:gap-4">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[136px] rounded-[22px] xl:h-auto" />
          ))}
        </div>
        <Skeleton className="h-[300px] rounded-panel" />
      </div>
    </div>
  );
}
