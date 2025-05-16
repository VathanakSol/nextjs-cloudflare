
export default function MetricCardSkeleton() {
  return (
    <div className="border rounded-lg p-4">
      <div className="h-4 w-1/2 bg-gray-200 rounded mb-2 animate-pulse"></div>
      <div className="h-8 w-3/4 bg-gray-300 rounded mt-2 animate-pulse"></div>
    </div>
  );
}