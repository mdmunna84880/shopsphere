/** @format */

import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";

import CartCard from "./CartCard";
import { clearCart, decreaseCart, increaseCart, removeFromCart } from "store/slices/cartSlice";
import { selectCartTotals } from "store/cartSelector";
import { formatCurrencyToUS } from "utils/formatCurrency";
import { cn } from "utils/cn";
import Button from "components/ui/Button";
import Link from "components/ui/Link";

function Cart() {
  const dispatch = useDispatch();
//   Totla cart quantity, cart items and cart total amount
  const { cartTotalQuantity, cartTotalAmount } = useSelector(selectCartTotals);
  const { cartItems } = useSelector((state) => state.cart);
  //  Tax in percentage
  const tax = 18;
 //   Calculate the total sub total amount
  const calculateSubtotal = (price, quantity) =>{
    return price * quantity;
  }
//   Calculate the tax price
  const calculateTotalTax = (price, tax)=>{
    return price * (tax/100);
  }
//   Calulate total amount like tax, shipping, and everything
  const calculateTotal = (...prices) =>{
    return prices.reduce((acc, price)=>(price + acc), 0)
  }

  return (
    <div className="mt-16 sm:mt-20 p-12 bg-page">
      <h1 className="text-4xl text-center mb-12 font-bold text-main">
        Shopping Cart{" "}
        <span className="text-base font-normal">
          ({cartTotalQuantity} Items)
        </span>
      </h1>

      {
        cartTotalQuantity > 0 && <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex justify-between px-2">
            <p className="text-main text-xl">Products Detail</p>
            <Button leftIcon={<MdDelete />} variant="destructive" onClick={()=>dispatch(clearCart())}>
              Clear Cart
            </Button>
          </div>
          {cartItems.map(
            ({ id, title, image, price, cartQuantity, category }) => (
              <CartCard
                key={id}
                id={id}
                title={title}
                image={image}
                price={price}
                category={category}
                increaseQuantity={() => dispatch(increaseCart({id}))}
                decreaseQuantity={() => dispatch(decreaseCart({id}))}
                deleteItem={()=>dispatch(removeFromCart(id))}
                quantity={cartQuantity}
                subtotal={calculateSubtotal(price, cartQuantity)}
              />
            ),
          )}
        </div>
        <div
          className={cn(
            "sticky top-30 bg-surface lg:col-span-4 h-80 border",
            "border-subtle/40 rounded-md md:rounded-xl shadow-md md:shadow-lg",
            "flex flex-col gap-4 px-4 md:px-6 py-2 md:py-4",
          )}
        >
          <h2 className="text-center text-main text-base sm:text-xl md:text-2xl">
            Order Summary
          </h2>
          <p className="flex justify-between items-center text-bas">
            <span>Subtotal</span>
            <span>{formatCurrencyToUS(cartTotalAmount)}</span>
          </p>
          <p className="flex justify-between items-center text-base">
            <span>Shipping Estimate</span> <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between items-center text-base">
            <span>Tax Estimate</span>
            <span>{formatCurrencyToUS(calculateTotalTax(tax, cartTotalAmount))}</span>
          </p>
          <div className="w-full h-px bg-subtle" />
          <p className="flex justify-between items-center text-main font-bold text-base md:text-lg">
            <span>Order Total</span>
            <span>{formatCurrencyToUS(calculateTotal(calculateTotalTax(tax, cartTotalAmount), cartTotalAmount))}</span>
          </p>
          <Button>Checkout</Button>
        </div>
      </div>
      }
      {
        cartTotalQuantity == 0 && <div className="flex flex-col gap-4 min-h-screen ">
            <span className="text-lg text-center">You haven't added anything.</span>
            <span className="text-center"><Link href="/">Continue Shopping</Link></span>
        </div>
      }
    </div>
  );
}

export default Cart;
