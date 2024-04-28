import { useEffect } from "react";
import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router-dom";
import Home from "./scenes/home/Home";
import Navbar from "./scenes/global/Navbar";
import Footer from "./scenes/global/Footer";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import CartMenu from "./scenes/global/CartMenu";
import Login from "./scenes/loginPage"
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import { useSelector } from "react-redux";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const { pathname } = useLocation();
  
  // Check if the current route is the login page
  const isLoginPage = pathname === "/";
  const token = useSelector((state) => state.cart.token);
  console.log(token)
  const isAuth = Boolean(token);
  
  return (
    <div className="app">

        {!isLoginPage && <Navbar />}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="home" element={isAuth ? <Home /> : <Navigate to="/" />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Confirmation />} />
        </Routes>
        {!isLoginPage && <CartMenu />}
        {!isLoginPage && <Footer />}
    </div>
  );
}
function Router() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default Router;