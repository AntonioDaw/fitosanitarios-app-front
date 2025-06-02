const SkeletonCard = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4 space-y-4">
      <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto" />
      <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
      <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
    </div>
  );
};

export default SkeletonCard;