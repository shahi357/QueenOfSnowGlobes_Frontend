import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Avatar } from "@nextui-org/react";
import { useCart } from "../components/CartContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useCart();

  const sessionId = sessionStorage.getItem("sessionId");
  const userRole = sessionStorage.getItem("userRole");

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 30;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    { label: "Home", link: "/" },
    { label: "Gallery", link: "/gallery" },
    { label: "About", link: "/about" },
    { label: "Shop", link: "/shop" },
  ];

  const socialLinks = [
    { site: "facebook", icon: <FaFacebook /> },
    { site: "instagram", icon: <FaInstagram /> },
    { site: "linkedin", icon: <FaLinkedin /> },
  ];

  const itemCount = cart.reduce((count, item) => count + item.quantity, 0); // Calculate total item count

  return (
    <nav
      className={`transition-all duration-300 ease-in-out fixed
      ${isScrolled ? "bg-black/60 top-0 z-50" : "bg-transparent"}
      flex justify-between items-center w-screen max-w-[2560px] px-10 py-5 text-white`}
    >
      <a
        href={
          sessionId !== null && userRole !== "admin"
            ? "/dashboard"
            : sessionId !== null && userRole === "admin"
            ? "/adminDashboard"
            : "/"
        }
        className="font-serif text-[40px] leading-[68px] heading"
      >
        Queen of Snow Globes
      </a>

      <div className="flex items-center gap-8">
        {links.map((link, index) => (
          <Link
            key={index}
            to={
              sessionId !== null &&
              link.label === "Home" &&
              userRole !== "admin"
                ? "/dashboard"
                : sessionId !== null &&
                  link.label === "Home" &&
                  userRole === "admin"
                ? "/adminDashboard"
                : link.link
            }
            className="text-xl"
          >
            {link.label}
          </Link>
        ))}

        {sessionId ? (
          <Link
            className="text-xl"
            onClick={() => {
              sessionStorage.clear();
              window.location.href = "/";
            }}
          >
            Logout
          </Link>
        ) : (
          <Link to="/signin" className="text-xl">
            Sign In
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        {sessionId && (
          <>
            <Avatar name={sessionStorage.getItem("firstName")} />

            {userRole !== "admin" && (
              <Link to="/cart" className="relative text-2xl p-3">
                <AiOutlineShoppingCart />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-yellow-600 text-white text-xs rounded-full w-[18px] h-[18px] flex justify-center items-center overflow-hidden">
                    {itemCount}
                  </span>
                )}
              </Link>
            )}
          </>
        )}

        {socialLinks.map((socialLink, index) => (
          <a
            className="text-2xl"
            key={index}
            href={`https://${socialLink.site}.com`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {socialLink.icon}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
