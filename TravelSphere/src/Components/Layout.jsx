// Components/Layout.jsx
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="mt-18">
        <Outlet /> {/* This renders the current page's component */}
      </main>
    </div>
  );
};
