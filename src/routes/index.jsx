import { useRoutes } from "react-router";

import MainLayout from "layouts/MainLayout";
import Cart from "pages/cart";
import Dashboard from "pages/dashboard";
import Login from "pages/login";
import NotFound from "pages/not-found";
import ProductDetail from "pages/product-detail";
import SingIn from "pages/register";
import Wishlist from "pages/wishlist";

function AppRouter() {
    // Create routes like routes and route but using hook.
    const elements = useRoutes([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                { index: true, element: <Dashboard /> },
                { path: "cart", element: <Cart /> },
                { path: "wishlist", element: <Wishlist /> },
                { path: "login", element: <Login /> },
                { path: "register", element: <SingIn />},
                { path: "product/:id", element: <ProductDetail /> },
                { path: "*", element: <NotFound />}
            ]
        }
    ])
    return elements;
}

export default AppRouter;