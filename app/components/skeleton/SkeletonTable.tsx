import SkeletonCard from "./SkeletonCard";
import SkeletonTable from "./SkeletonTable"

const DashboardSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      {/* Título principal */}
      <div className="h-10 w-1/3 bg-gray-300 rounded" />

      {/* Grid de cards + tablas */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-4">
            <SkeletonCard />
            <SkeletonTable />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;