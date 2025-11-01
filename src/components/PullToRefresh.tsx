import { RefreshCw } from "lucide-react";

interface PullToRefreshProps {
  isPulling: boolean;
  pullDistance: number;
  threshold: number;
}

export const PullToRefresh = ({ isPulling, pullDistance, threshold }: PullToRefreshProps) => {
  if (!isPulling) return null;

  const rotation = (pullDistance / threshold) * 360;
  const opacity = Math.min(pullDistance / threshold, 1);

  return (
    <div
      className="fixed top-0 left-0 right-0 flex justify-center items-center z-50 transition-all duration-200"
      style={{
        transform: `translateY(${Math.min(pullDistance - 40, 40)}px)`,
        opacity,
      }}
    >
      <div className="bg-card rounded-full p-3 shadow-hover">
        <RefreshCw
          className="w-6 h-6 text-primary"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      </div>
    </div>
  );
};
