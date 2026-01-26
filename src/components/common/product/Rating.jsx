import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import { cn } from "utils/cn";

export default function Rating({ rate=0, count=0, className, starClassName, rateClassName }){
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rate >= i) {
        stars.push(<FaStar key={i} className={cn("text-yellow-400 w-3.5 h-3.5", starClassName)} />);
      } else if (rate >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className={cn("text-yellow-400 w-3.5 h-3.5", starClassName)} />);
      } else {
        stars.push(<FaRegStar key={i} className={cn("text-muted/40 w-3.5 h-3.5", starClassName)} />);
      }
    }
    return stars;
  };

  return (
    <div className={cn("flex items-center gap-2 mb-3", className)}>
      <div className="flex gap-0.5">
        {renderStars()}
      </div>
      <span className={cn("text-xs text-muted font-medium ml-1", rateClassName)}>
         {rate} <span className="text-muted/60">({count.toLocaleString()})</span>
      </span>
    </div>
  );
};