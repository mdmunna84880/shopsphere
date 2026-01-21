import { motion, AnimatePresence } from "framer-motion";

import SliderButton from "./SliderButton";
import { CarouselContent } from "./CarouselContent";
import { PaginationDot } from "./PaginationDot";
import { useCarousel } from "./useCarousel";
import { slideVariants, imageVariants } from "./animations";
import { carouselItems } from "./carouselItems";

const SWIPE_THRESHOLD = 10000;

const Carousel = () => {
  const { currentIndex, direction, paginate, isPaused, setIsPaused } = useCarousel(carouselItems.length);

  const slide = carouselItems[currentIndex];

  const handleDragEnd = (_, { offset, velocity }) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -SWIPE_THRESHOLD) paginate(1);
    else if (swipe > SWIPE_THRESHOLD) paginate(-1);
  };

  return (
    <div
      className="relative w-full mt-16 sm:mt-20 h-[calc(100dvh-4rem)] sm:h-[calc(100dvh-5rem)] overflow-hidden bg-primary font-body group"
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`bg-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0 bg-primary"
        >
          <div
            className="w-full h-full bg-cover bg-center blur-3xl scale-110 opacity-50"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
        </motion.div>
      </AnimatePresence>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-10 flex flex-col w-full h-full cursor-grab active:cursor-grabbing md:flex-row"
        >
          <CarouselContent
            slide={slide}
            index={currentIndex}
            onInteract={() => setIsPaused(true)}
          />
          <div className="relative flex items-center justify-center order-1 w-full p-4 md:w-1/2 h-1/2 md:h-full sm:p-6 md:p-8 md:pr-12 lg:pr-16 md:order-2">
            <motion.img
              key={`img-${currentIndex}`}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-contain md:object-right max-h-[85%] sm:max-h-[90%] drop-shadow-2xl"
              draggable="false"
            />
          </div>
        </motion.div>
      </AnimatePresence>
      <SliderButton direction="prev" onClick={() => paginate(-1)} />
      <SliderButton direction="next" onClick={() => paginate(1)} />

      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3">
        {Array.from({ length: carouselItems.length }).map((_, idx) => (
          <PaginationDot
            key={idx}
            isActive={idx === currentIndex}
            isPaused={isPaused}
            onClick={() => paginate(idx - currentIndex)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;