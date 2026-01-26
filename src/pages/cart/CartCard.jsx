/** @format */

import Button from "components/ui/Button";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { cn } from "utils/cn";
import { formatCurrencyToUS } from "utils/formatCurrency";
import Link  from "components/ui/Link";

function CartCard({
  id,
  image,
  title,
  category,
  price,
  increaseQuantity,
  decreaseQuantity,
  quantity = 0,
  subtotal,
  deleteItem,
  className,
}) {
  return (
    <div
      className={cn(
        "flex justify-between bg-surface border border-subtle/40 group rounded-md md:rounded-2xl w-full",
        className,
      )}
    >
      <div className="flex">
        <div className="col-span-3 h-full bg-gray-200 w-32 flex justify-center items-center rounded-l-md md:rounded-l-2xl p-4 md:p-4">
          <Link href={`/product/${id}`} variant="nav">
            <div className="aspect-square w-20 ">
              <img
                src={image}
                alt={title}
                className="object-contain scale-90 group-hover:scale-100 transition-transform duration-300"
              />
            </div>
          </Link>
        </div>
        <div className="col-span-4 flex flex-col gap-4 p-4 md:p-4">
          <Link href={`/product/${id}`} variant="nav">
            <h2 className="text-main text-base sm:text-lg line-clamp-1">
              {title}
            </h2>
          </Link>
          <p className="text-muted capitalize text-sm sm:text-base">
            {category}
          </p>
          <p className="text-main text-base font-semibold">
            {formatCurrencyToUS(price)}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center w-50 p-4 md:p-4">
          <span>
            <Button
              variant="transparent"
              className={
                "bg-gray-200 p-1 rounded-l-sm rounded-r-none hover:bg-gray-300 cursor-pointer text-2xl"
              }
              onClick={decreaseQuantity}
            >
              <FaMinus className="font-semibold" />
            </Button>
          </span>
          <span className="px-2 text-2xl">{quantity}</span>
          <span>
            <Button
              variant="transparent"
              className={
                "bg-gray-200 p-1 rounded-r-sm rounded-l-none hover:bg-gray-300 cursor-pointer text-2xl"
              }
              onClick={increaseQuantity}
            >
              <FaPlus className="font-semibold" />
            </Button>
          </span>
        </div>
        <div className="col-span-1 p-4 md:p-4 flex flex-col text-base text-main">
          <span>Subtotal</span>
          <span>{formatCurrencyToUS(subtotal)}</span>
        </div>
        <div className="col-span-1 p-4 md:p-4">
          <Button
            variant="destructive"
            className={"p-1 text-xl"}
            onClick={deleteItem}
          >
            {<MdDelete />}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
