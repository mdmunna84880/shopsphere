/** @format */

import Button from "components/ui/Button";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Link from "components/ui/Link";
import Container from "components/ui/Container";
import WishlistCard from "./WishlistCard";
import { clearWishlist, removeFromWishlist } from "store/slices/wishlistSlice";
import { addToCart } from "store/slices/cartSlice";

function Wishlist() {
  const dispatch = useDispatch();
  // State from store
  const { items: wishlistItem } = useSelector((state) => state.wishlist);
  const {cartItems} = useSelector((state)=>state.cart);
  // Items in cart
  const isInCart = (id) => {
    return cartItems.some((item)=>item.id === id);
  }

  return (
    <div className="mt-16 sm:mt-20 bg-page min-h-screen mb-12">
      <Container className="py-8 flex justify-between">
        <h1 className="font-bold text-main text-xl lg:text-2xl">
          My Wishlist{" "}
          <span className="text-muted text-base">
            ({wishlistItem.length} items)
          </span>
        </h1>
        <div className="flex gap-4">
          <Link href="/">Back to Shop</Link>
          <Button
            variant="destructive"
            onClick={() => dispatch(clearWishlist())}
            disabled={wishlistItem.length === 0}
            leftIcon={<MdDelete />}
          >
            Clear All
          </Button>
        </div>
      </Container>
      {wishlistItem.length === 0 && <h3 className="text-lg md:text-xl lg:text-3xl text-main text-center">Your wishlist has no Items.</h3>}
      {
        wishlistItem.length > 0 && <Container className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {wishlistItem.map(({ id, title, category, image, price, rating }) => (
          <WishlistCard
            key={id}
            id={id}
            title={title}
            category={category}
            image={image}
            price={price}
            rating={rating}
            addInCart={() => dispatch(addToCart({ id }))}
            isINCart={isInCart(id)}
            removeFromWishlist={() => dispatch(removeFromWishlist({ id }))}
          />
        ))}
      </Container>
      }
    </div>
  );
}

export default Wishlist;
