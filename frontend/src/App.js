import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Men from "./pages/men/Men";
import Women from "./pages/women/Women";
import Kid from "./pages/kid/Kid";
import Nav from "./components/nav/Nav";
import Product from "./pages/product/Product";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Footer from "./components/footer/Footer";
import ProductDetail from "./components/productDetail/ProductDetail";
import Checkout from "./pages/checkout/Checkout";
import Success from "./pages/success/Success";
import Cart from "./pages/cart/Cart";
import Profile from "./pages/profile/Profile";
import Forgetpw from "./components/forgetpw/Forgetpw";
import { CartProvider } from "./components/cartContext/cartContext";


function App() {
  return (
    <>
      <Router>
        <CartProvider>
          <Nav/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/product" element={<Product/>}/>
            <Route path="/men" element={<Men/>}/>
            <Route path="/women" element={<Women/>}/>
            <Route path="/kid" element={<Kid/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/productDetail/:id" element={<ProductDetail/>}/>
            <Route path="/checkout/:id" element={<Checkout/>}/>
            <Route path="/success" element = {<Success/>}/>
            <Route path="/cart" element = {<Cart/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/forgetpw" element={<Forgetpw/>}/>
          </Routes>
        </CartProvider>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
