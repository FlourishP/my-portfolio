interface SkeletonProps {
  className?: string;
  variant?: "text" | "circle" | "rect" | "card";
}

export function Skeleton({ className = "", variant = "text" }: SkeletonProps) {
  const base = "animate-shimmer rounded-lg";

  const variants = {
    text: "h-3 w-full",
    circle: "h-10 w-10 rounded-full",
    rect: "h-20 w-full",
    card: "h-32 w-full",
  };

  return (
    <div
      className={`${base} ${variants[variant]} ${className}`}
      aria-hidden="true"
    />
  );
}

export function StatSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex justify-between items-center">
          <Skeleton className="w-20" />
          <Skeleton className="w-8" />
        </div>
      ))}
    </div>
  );
}

export function TrackSkeleton() {
  return (
    <div className="space-y-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-3">
          <Skeleton className="w-6 h-4" />
          <div className="flex-1 space-y-1">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-20 h-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
