import { FiShoppingCart, FiHeart, FiBell, FiLogIn } from "react-icons/fi";

// Navlinks variables to change at one place
export const navLinks = [
    {
        label: "Cart",
        href: "/cart",
        icon: FiShoppingCart,
        hasBadge: true,
    },
    {
        label: "Wishlist",
        href: "/wishlist",
        icon: FiHeart,
        hasBadge: true,
    },
    {
        label: "Notification",
        href: "/notifications",
        icon: FiBell,
        hasBadge: false,
    },
    {
        label: "Login",
        href: "/login",
        icon: FiLogIn,
        hasBadge: false,
    }

]