const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="text-center group">
          <div className="relative inline-block">
            <div className="w-20 h-16 bg-gray-300 rounded-lg mb-3 mx-auto animate-pulse" />
            <div className="absolute inset-0 bg-gray-200/20 blur-xl rounded-full transform scale-150" />
          </div>
          <div className="h-5 bg-gray-300 rounded w-24 mx-auto mb-2 animate-pulse" />
          <div className="h-3 bg-gray-300 rounded w-20 mx-auto animate-pulse" />
        </div>
      ))}
    </div>
  );
};

export default StatsSkeleton;
