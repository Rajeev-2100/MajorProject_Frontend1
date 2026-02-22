import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import ProductListing from "./pages/ProductListing.jsx";
import ProductDetail from "./pages/ProductDetails.jsx";
import { CartProvider } from "./useContext/Cart.jsx";
import Cart from "./pages/Cart.jsx";
import WishListPage from "./pages/WishListPage.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Checkout from "./pages/Checkout.jsx";
import { UserProvider } from "./useContext/User.jsx";
import Order from "./pages/Order.jsx";
import OrderDetails from "./pages/OrderDetail.jsx";
import { OrderProvider } from "./useContext/Order.jsx";
import { ProductProvider } from "./useContext/product.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";

createRoot(document.getElementById("root")).render(
  <Router>
    <ProductProvider>
      <UserProvider>
        <CartProvider>
          <OrderProvider>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/productPage" element={<ProductListing />} />
              <Route path="/productPage/:productId" element={<ProductDetail />} />
              <Route path="/category/:categoryName" element={<CategoryPage/>}/>
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishList" element={<WishListPage />} />
              <Route path="/userProfile" element={<UserProfile />} />
              <Route path="/checkOut" element={<Checkout />} />
              <Route path="/order" element={<Order />} />
              <Route path="/order/:orderId" element={<OrderDetails />} />
            </Routes>
          </OrderProvider>
        </CartProvider>
      </UserProvider>
    </ProductProvider>
  </Router>,
);
