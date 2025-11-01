import { Skeleton } from "@/components/ui/skeleton";

export const TemplateSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-card shadow-soft animate-pulse">
      <div className="aspect-[9/16] relative bg-muted">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};

export const TemplateGridSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <TemplateSkeleton key={index} />
      ))}
    </>
  );
};
