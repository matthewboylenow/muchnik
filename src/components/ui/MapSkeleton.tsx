export function MapSkeleton({ height = '400px' }: { height?: string }) {
  return (
    <div
      className="bg-gray-200 animate-pulse rounded-lg relative overflow-hidden"
      style={{ height }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-gray-300 border-t-gold rounded-full animate-spin mb-3"></div>
          <p className="text-gray-500 text-sm font-medium">Loading map...</p>
        </div>
      </div>
    </div>
  );
}
