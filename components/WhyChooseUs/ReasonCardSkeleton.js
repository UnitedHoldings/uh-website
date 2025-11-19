const ReasonCardSkeleton = ({ index }) => {
  return (
    <div className="group relative bg-white/95 backdrop-blur-sm rounded-3xl p-6 border border-black/20 overflow-hidden">
      {/* Skeleton Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 opacity-5" />

      {/* Skeleton Accent Bar */}
      <div className="absolute top-0 left-0 w-2 h-full bg-gray-300" />

      <div className="relative z-10 bg-gray-200/40 rounded-2xl p-6 animate-pulse">
        <div className="flex items-start justify-between mb-6">
          <div className="h-12 w-12 bg-gray-300 rounded-xl animate-pulse" />
        </div>

        <div className="h-7 bg-gray-300 rounded mb-4 w-3/4 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-4/6 animate-pulse" />
        </div>

        {/* Skeleton Hover Effect Line */}
        <div className="absolute bottom-0 left-8 w-24 h-1 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};

export default ReasonCardSkeleton;