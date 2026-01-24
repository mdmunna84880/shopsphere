import React from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

import Button from "components/ui/Button";
import Link from "components/ui/Link";
import Rating from "components/common/product/Rating";
import { formatCurrencyToUS } from "utils/formatCurrency";

function ProductCard({
  id,
  title,
  price,
  category,
  image,
  rating,
  isInCart,
  isInWishlist,
  wishlistOnClick,
  addToCartOnClick,
}) {
  return (
    <div className="group relative flex flex-col w-full max-w-70 bg-surface border border-subtle rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-square w-full overflow-hidden bg-black/5">
        <Link to={`product/${id}`} className="block w-full h-full p-6">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply"
          />
        </Link>
        <div className="absolute top-3 left-3">
          <Button
            variant="accent"
            size="sm"
            className="pointer-events-none text-xs font-semibold px-2 py-1 h-auto"
          >
            20% OFF
          </Button>
        </div>

        <div className="absolute top-3 right-3">
          <Button
            className="rounded-full w-8 h-8 p-0 bg-surface shadow-sm flex items-center justify-center border-none hover:scale-110"
            onClick={() => wishlistOnClick(id)}
          >
            {isInWishlist ? (
              <FiHeart className="h-5 w-5 fill-red-500 transition-colors" />
            ) : (
              <FiHeart className="h-5 w-5 text-muted hover:text-red-500 transition-colors" />
            )}
          </Button>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            {category}
          </p>
          <h3 className="text-main font-medium min-h-10">
            <Link
              to={`product/${id}`}
              className="block w-full leading-snug line-clamp-2 hover:underline decoration-subtle"
            >
              {title}
            </Link>
          </h3>
        </div>
        <div>
          <Rating rate={rating.rate} count={rating.count} />
        </div>
        <div className="mt-auto space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-main">
              {formatCurrencyToUS(price)}
            </span>
            <span className="text-sm text-muted line-through decoration-muted">
              {formatCurrencyToUS(price * (1 / 0.8))}
            </span>
          </div>
          <div className="text-xs font-medium text-green-600 bg-green-50 w-fit px-2 py-1 rounded">
            Free Delivery By Tomorrow
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {isInCart ? (
              <Link
                href="/cart"
                variant="nav"
                className="w-full text-sm flex items-center justify-center bg-accent"
              >
                Go to Cart
              </Link>
            ) : (
              <Button
                variant="secondary"
                className="w-full flex justify-center gap-2 items-center text-sm"
                leftIcon={<FiShoppingCart />}
                onClick={() => addToCartOnClick(id)}
              >
                Add to Cart
              </Button>
            )}
            <Link
              href="/buy"
              variant="primary"
              className="w-full text-sm flex items-center justify-center"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
