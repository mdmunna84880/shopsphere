import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { FiHeart } from "react-icons/fi";
import { CiDeliveryTruck } from "react-icons/ci";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { IoMdArrowRoundBack } from "react-icons/io";

import Rating from "components/common/product/Rating";
import Container from "components/ui/Container";
import Link from "components/ui/Link";
import Button from "components/ui/Button";
import { addToCart } from "store/slices/cartSlice";
import { getProductDetails } from "store/slices/productSlice";
import { formatCurrencyToUS } from "utils/formatCurrency";
import { toggleWishlist } from "store/slices/wishlistSlice";
import Skeleton from "./Skelton";


function ProductDetail() {
  const dispatch = useDispatch();
// Getting params using react-router
  const { id } = useParams();
//   State from store
  const { selectedProduct, error, status } = useSelector(
    (state) => state.products,
  );
  const { cartItems } = useSelector((state) => state.cart);
  const { items: wishlistItem } = useSelector((state) => state.wishlist);
  const isLoading = status === "loading";
//   In the cart or wishlist or not
  const isInCart = cartItems.some((item) => item.id === Number(id));
  const isInWishlist = wishlistItem.some((item) => item.id === Number(id));

//   Dispatching or calling to get product on change of id, or dispatch
  useEffect(() => {
    dispatch(getProductDetails(Number(id)));
  }, [id, dispatch]);

  if(error) return <h3 className="text-lg mt-8 text-error">{error}</h3>

  // When the product is loading
  if(isLoading) return <Skeleton />

  return (
    <Container className="mt-16 sm:mt-20 py-12 bg-page min-h-screen">
    <Link href="/" variant="nav" mainCN={"flex items-center gap-4"} className={"mb-4"}><IoMdArrowRoundBack />Back to Dashboard</Link>
      {/* When loaded successfully */}
      {!isLoading && !error && (
        <div className="grid grid-cols-2 gap-4 w-full h-full shadow-md hover:shadow-lg rounded-2xl group">
          <div className="h-full relative overflow-hidden bg-black/5 flex justify-center items-center">
          {/* Images and Badges */}
            <div className="w-100 h-full flex justify-center items-center">
              <img
                src={selectedProduct?.image}
                alt={selectedProduct?.title}
                className="w-full object-contain transition-transform duration-500 scale-90 group-hover:scale-100 mix-blend-multiply p-4"
              />
            </div>
            <div className="absolute top-3 left-3">
              <Button
                variant="accent"
                size="sm"
                className="pointer-events-none text-base font-semibold px-2 py-1 h-auto"
              >
                20% OFF
              </Button>
            </div>

            <div className="absolute top-3 right-3">
              <Button
                className="rounded-full w-8 h-8 p-0 bg-surface shadow-sm flex items-center justify-center border-none hover:scale-110 text-lg"
                onClick={() => dispatch(toggleWishlist(selectedProduct))}
              >
                {isInWishlist ? (
                  <FiHeart className="h-5 w-5 fill-red-500 transition-colors" />
                ) : (
                  <FiHeart className="h-5 w-5 text-muted hover:text-red-500 transition-colors" />
                )}
              </Button>
            </div>
          </div>
          {/* Content */}
          <div className="flex flex-col gap-2 p-4">
            <p className="uppercase text-lg text-accent">
              {selectedProduct?.category}
            </p>
            <h3 className="text-2xl md:text-3xl lg:text-4xl text-main">
              {selectedProduct?.title}
            </h3>
            <Rating
              rateClassName={"text-3xl"}
              starClassName={"w-8 h-8"}
              className={"mt-4"}
              rate={selectedProduct?.rating?.rate}
              count={selectedProduct?.rating?.count}
            />
            <div className="flex items-baseline gap-2 p-4 border border-subtle/40 w-full rounded-lg bg-gray-200">
              <span className="text-xl lg:text-3xl font-bold text-main">
                {formatCurrencyToUS(selectedProduct?.price)}
              </span>
              <span className="text-base lg:text-lg text-muted line-through decoration-muted">
                {formatCurrencyToUS(selectedProduct?.price * (1 / 0.8))}
              </span>
            </div>
            <p className="text-lg pt-4 text-main">
              {selectedProduct?.description}
            </p>
            <div className="flex justify-between text-lg">
              <p className="text-muted flex items-center gap-2">
                <CiDeliveryTruck className="text-main text-lg" />
                Free Delevery
              </p>
              <p className="text-muted flex items-center gap-2">
                <VscWorkspaceTrusted className="text-main text-lg" /> 1 Year
                Waranty
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 justify-between">
              {!isInCart && (
                <Button
                  variant="secondary"
                  onClick={() => dispatch(addToCart({id:Number(id)}))}
                >
                  Add to Cart
                </Button>
              )}
              {isInCart && (
                <Link variant="secondary" href="/cart" className={""}>
                  Go to Cart
                </Link>
              )}
              <Link
                variant="primary"
                href="/buy"
                className={"p-1 text-xl flex justify-center"}
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default ProductDetail;
