import { FiHeart } from "react-icons/fi";

function ProductCardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center my-12 w-full">
    {Array.from({length: 8}, (_, i)=>i+1).map((i)=>(
        <div key={i} className="group relative flex flex-col w-full max-w-70 bg-surface border border-subtle rounded-lg overflow-hidden">
      {/* Image , badge and wishlist*/}
      <div className="relative aspect-square w-full bg-black/5">
        {/* Image */}
        <div className="w-full h-full p-6 flex items-center justify-center">
          <div className="skeleton w-full h-full" />
        </div>
        {/* Discount badge */}
        <div className="absolute top-3 left-3">
          <div className="skeleton h-6 w-14 rounded-md" />
        </div>
        {/* Wishlist Button */}
        <div className="absolute top-3 right-3">
          <div className="w-8 h-8 rounded-full bg-surface shadow-sm flex items-center justify-center skeleton">
            <div className="h-5 w-5 bg-black/5 skeleton"/>
          </div>
        </div>
      </div>
      {/* Content like title, category, rating, and buttons */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="space-y-2">
          <div className="skeleton h-3 w-20" />
          <div className="space-y-1">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-4/5" />
          </div>
        </div>
        <div className="flex items-center gap-2">
            {/* All Starts to represent the review */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="skeleton h-3 w-3 rounded-sm" />
            ))}
          </div>
          {/* Rating count */}
          <div className="skeleton h-3 w-6" />
        </div>
        {/* Price like original and discounted */}
        <div className="mt-auto space-y-3">
          <div className="flex items-baseline gap-2">
            <div className="skeleton h-6 w-20" />
            <div className="skeleton h-4 w-14" />
          </div>
          {/* Expected dilevery time */}
          <div className="skeleton h-5 w-40 rounded-md" />
          {/* Two buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="skeleton h-10 w-full rounded-md" />
            <div className="skeleton h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
    ))}
  </div>
  )
}

export default ProductCardSkeleton;
