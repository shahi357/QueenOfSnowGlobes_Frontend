import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoCartOutline, IoCheckmarkSharp } from "react-icons/io5";
import { Button, Tooltip } from "@nextui-org/react";
import { useCart } from "../components/CartContext";

const Shop = () => {
  const [shopItems, setShopItems] = useState([]);
  const { cart, addToCart } = useCart();

  const navigate = useNavigate();
  const sessionId = sessionStorage.getItem("sessionId");

  const fetchShopItems = async () => {
    try {
      const response = await fetch("/api/shop/items");
      const data = await response.json();
      if (response.ok) {
        setShopItems(data);
      } else {
        console.error("Failed to fetch shop items");
      }
    } catch (error) {
      console.error("Error fetching shop items");
    }
  };

  useEffect(() => {
    fetchShopItems();
  }, []);

  useEffect(() => {
    console.log("Updated Cart Items:", cart);
  }, [cart]);

  const handleAddToCart = (shopItem) => {
    if (!sessionId) {
      toast.error("Please sign in to add items to the cart.");
      navigate("/signin");
      return;
    }

    addToCart(shopItem);
    toast.success("Item added successfully to your cart.");
  };

  return (
    <section className="px-28 pb-16">
      <div className="mt-12">
        <h2 className="text-white body-text text-[25px] font-bold">Shop</h2>
      </div>

      <div className="w-full h-auto grid grid-cols-4 gap-y-16 mt-12 gap-x-10">
        {shopItems.map((shopItem, index) => {
          const isInCart = cart.some((item) => item.id === shopItem.id);

          return (
            <div
              key={index}
              className="col-span-1 h-auto flex flex-col justify-center items-center group"
            >
              <img
                src={shopItem.src}
                alt={shopItem.name}
                loading="lazy"
                className="w-[306px] h-[192px] rounded-[10px] object-cover group-hover:border-2 group-hover:border-white"
              />

              <div className="w-full h-auto flex justify-center items-center -mt-3">
                <div className="w-[306px] h-auto bg-[#904444] flex justify-between px-5 py-2 items-center group-hover:border-2 group-hover:border-white">
                  <span className="font-semibold text-white">
                    ${shopItem.price}
                  </span>

                  <Tooltip
                    content={isInCart ? "Already added to cart" : "Add to cart"}
                    closeDelay={50}
                    color={isInCart ? "primary" : "success"}
                  >
                    <Button
                      isIconOnly
                      color={isInCart ? "primary" : "success"}
                      aria-label="Add to cart"
                      onClick={() => handleAddToCart(shopItem)}
                      disabled={isInCart}
                    >
                      {isInCart ? (
                        <IoCheckmarkSharp size={20} />
                      ) : (
                        <IoCartOutline size={20} />
                      )}
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ToastContainer autoClose={1500} />
    </section>
  );
};

export default Shop;
