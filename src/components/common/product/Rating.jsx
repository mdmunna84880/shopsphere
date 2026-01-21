import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import { cn } from "utils/cn";

export default function Rating({ rate, count, className }){
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rate >= i) {
        stars.push(<FaStar key={i} className="text-yellow-400 w-3.5 h-3.5" />);
      } else if (rate >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 w-3.5 h-3.5" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-muted/40 w-3.5 h-3.5" />);
      }
    }
    return stars;
  };

  return (
    <div className={cn("flex items-center gap-2 mb-3", className)}>
      <div className="flex gap-0.5">
        {renderStars()}
      </div>
      <span className="text-xs text-muted font-medium ml-1">
         {rate} <span className="text-muted/60">({count.toLocaleString()})</span>
      </span>
    </div>
  );
};