import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import React, { useContext, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

import Landing from "./components/Landing";
import CreateArticle from "./components/admin/dashboard/CreadArticle";
import CreateCategory from "./components/admin/dashboard/CreateCategory";
import Authentication from "./components/auth/Authentication";
import Profile from "./components/auth/Profile";
import CategoryPage from "./components/CategoryPage";
import SpecProduct from "./components/SpecProduct";
import Admin from "./components/admin/dashboard/Admin";
import EditProduct from "./components/admin/dashboard/EditProduct";
import EditCategory from "./components/admin/dashboard/EditCategory";
import Stats from "./components/admin/stats/Stats";
import EditProfil from "./components/auth/EditProfil";
import CreateUser from "./components/admin/dashboard/CreateUser";
import AddPromotion from "./components/admin/dashboard/AddPromotion";
import PromotionalCode from "./components/admin/dashboard/PromotionalCode";
import EditUser from "./components/admin/dashboard/EditUser";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "./LanguageContext";
import CartPopup from "./components/utils/CartPopup";
import Cart from "./components/cart/Cart";
import CheckoutForm from "./components/utils/CheckoutForm";
import Return from "./components/utils/Return";
import ManageShipping from "./components/admin/dashboard/Shipping";
import { CartProvider } from "./CartContext";
import BillExample from "./components/auth/BillExample";

function App() {
  // SET LANGUAGE
  const { i18n } = useTranslation();
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    i18n.changeLanguage(language.toLowerCase());
  }, [language, i18n]);

  //SET STRIPE
  // Make sure to call `loadStripe` outside of a component’s render to avoid
  // recreating the `Stripe` object on every render.
  // This is your test secret API key.
  const stripePromise = loadStripe(
    "pk_test_51NUbU2GrTRGUcbUF4wXDLp4gi42TrFA6gfrQ8iEoTn9YffGugIvuCshIfh4uRUX96QqvPxmMowbf10hP6WnGFNGs00UYuvcxMa"
  );

  return (
    <CartProvider>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            {/* ALL */}
            <Route path="/" element={<Landing />}></Route>
            <Route path="/category/:id" element={<CategoryPage />}></Route>
            <Route path="/product/:id" element={<SpecProduct />}></Route>
            {/* ADMINS */}
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/createArticle" element={<CreateArticle />}></Route>
            <Route path="/createCategory" element={<CreateCategory />}></Route>
            <Route path="/createUser" element={<CreateUser />}></Route>
            <Route path="/editProduct/:id" element={<EditProduct />}></Route>
            <Route path="/editCategory/:id" element={<EditCategory />}></Route>
            <Route path="/editAdminUser/:id" element={<EditUser />}></Route>
            <Route path="/admin/stats" element={<Stats />}></Route>
            <Route path="/addPromo" element={<AddPromotion />}></Route>
            <Route path="/admin/code" element={<PromotionalCode />}></Route>
            <Route path="/manageShipping" element={<ManageShipping />}></Route>
            {/* USERS */}
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/editProfil/:id" element={<EditProfil />}></Route>
            <Route path="/authentication" element={<Authentication />}></Route>
            <Route path="/cartPopup" element={<CartPopup />}></Route>
            <Route
              path="/checkout"
              element={<CheckoutForm stripe={stripePromise} />}
            />
            <Route path="/return" element={<Return />} />
            <Route path="/billExample" element={<BillExample />}></Route>
          </Routes>
        </BrowserRouter>
        {/* GOOGLE ANALYTICS */}
        <Helmet>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-3DP4K2GG5P"
          ></script>
          <script>
            {`

              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-3DP4K2GG5P');
            `}
          </script>
        </Helmet>
      </HelmetProvider>
    </CartProvider>
  );
}

export default App;
