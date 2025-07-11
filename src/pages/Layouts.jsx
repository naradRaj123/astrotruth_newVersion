import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layouts = ({ children }) => {
  const location = useLocation();

  // Paths where header/footer should be hidden
  const hideHeaderFooterPaths = ["/user-dashboard", "/astro-dashboard"];

  // Hide if the current pathname starts with any of the specified paths
  const hideHeaderFooter = hideHeaderFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      <div>{children}</div>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default Layouts;
