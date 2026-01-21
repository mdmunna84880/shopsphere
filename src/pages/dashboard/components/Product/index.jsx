import ProductCard from "./ProductCard";
import { addToCart } from "store/slices/cartSlice";
import { toggleWishlist as toggleWishlistAction } from "store/slices/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";

function Product({ products }) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { items: wishlistItem } = useSelector((state) => state.wishlist);

  // Checking whether the product via their id in cartItems
  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };
  // Checking whether the product via their id in Wishlist items
  const isInWishlist = (id) => {
    return wishlistItem.some((item) => item.id === id);
  };


  const hadleAddToCart = (id) => {
    dispatch(addToCart(products[id-1]));
  };

  const toggleWishlist = (id) => {
    dispatch(toggleWishlistAction(products[id-1]));
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center my-12 w-full">
      {products.map(({ id, title, price, category, image, rating }) => (
        <ProductCard
          key={id}
          id={id}
          title={title}
          price={price}
          image={image}
          rating={rating}
          category={category}
          isInCart={isInCart(id)}
          isInWishlist={isInWishlist(id)}
          wishlistOnClick={toggleWishlist}
          addToCartOnClick={hadleAddToCart}
        />
      ))}
    </div>
  );
}

export default Product;
