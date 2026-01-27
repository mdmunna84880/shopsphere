
function Skeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-full animate-pulse my-12">
      {/* Image Skeleton */}
      <div className="aspect-square bg-gray-200 rounded-2xl flex justify-center items-center">
        <div className="w-3/4 h-3/4 bg-gray-300 rounded-lg"></div>
      </div>
      {/* Content Section */}
      <div className="flex flex-col gap-4 p-4">
        {/* Category */}
        <div className="h-6 w-24 bg-gray-200 rounded"></div>        
        {/* Title */}
        <div className="h-10 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-10 w-1/2 bg-gray-200 rounded"></div>        
        {/* Rating */}
        <div className="h-8 w-40 bg-gray-200 rounded mt-4"></div>        
        {/* Pricing Box*/}
        <div className="h-20 w-full bg-gray-100 rounded-lg border border-gray-200 flex items-center px-4 gap-4">
          <div className="h-8 w-24 bg-gray-300 rounded"></div>
          <div className="h-6 w-20 bg-gray-200 rounded"></div>
        </div>
        {/* Description*/}
        <div className="space-y-2 pt-4">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
        </div>        
        {/* Dilevery and Waranty*/}
        <div className="flex justify-between py-4">
          <div className="h-5 w-32 bg-gray-200 rounded"></div>
          <div className="h-5 w-32 bg-gray-200 rounded"></div>
        </div>        
        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-auto">
          <div className="h-12 bg-gray-300 rounded-lg"></div>
          <div className="h-12 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;