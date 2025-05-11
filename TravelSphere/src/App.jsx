// App.jsx
import { SignIn } from "./Authentication/Signin";
import { SignUp } from "./Authentication/Signup";
import { DestinationSelector } from "./Pages/Destinations";
import { HomePage } from "./Pages/Home";
import { ContactUs } from "./Pages/ContactUs";
import WishlistPage from "./Pages/Wishlist";
import Gallery from "./Pages/Gallery";
import CartPage from "./Pages/Cart";
import { WishlistProvider } from "./Context/WishlistContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./Components/Layout";

export const App = () => {
  return (
    <BrowserRouter>
      <WishlistProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/destination" element={<DestinationSelector />} />
          </Route>
        </Routes>
      </WishlistProvider>
    </BrowserRouter>
  );
};
