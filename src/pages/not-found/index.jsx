/** @format */
import { CiWarning } from "react-icons/ci";

import Link from "components/ui/Link";
import { cn } from "utils/cn";

function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="bg-gray-200 rounded-full border border-error shadow-md p-1 sm:p-2">
        <CiWarning
          size={22}
          className="text-lg text-error rounded-full font-extrabold stroke-1"
        />
      </div>
      <div className="mt-4 sm:mt-6 lg:mt-8 flex flex-col justify-center gap-2 sm:gap-3 lg:gap-4 text-center">
        <h1
          className={cn(
            "leading-tight bg-linear-to-r from-red-500 to-green-500 bg-clip-text text-transparent",
            "text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold",
          )}
        >
          404
        </h1>
        <h3 className="text-base sm:text-xl font-bold">Page not found</h3>
        <p className="mb-8 font-light text-muted">
          Oops! The page you are looking for doesn't exist. <br /> It might have
          been moved or deleted. Go back home
        </p>
      </div>
      <Link href="/" variant="secondary">l
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
