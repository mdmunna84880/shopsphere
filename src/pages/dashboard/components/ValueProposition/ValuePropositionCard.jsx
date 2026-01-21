import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ValuePropositionCard({ icon, title, subtitle }) {
  const Icon = icon;

  return (
    <motion.div
      variants={itemVariants}
      className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 lg:p-6 rounded-xl transition-all duration-300 hover:bg-black/5 cursor-default"
    >
      <div className="shrink-0 text-main">
        <Icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 stroke-[1.5]" />
      </div>

      <div className="flex flex-col">
        <h3 className="font-heading text-sm sm:text-base lg:text-lg font-bold text-main leading-tight">
          {title}
        </h3>
        <p className="font-body text-xs sm:text-sm text-muted font-normal mt-0.5 sm:mt-1">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}
