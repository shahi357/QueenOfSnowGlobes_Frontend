import React, { useEffect, useState } from "react";
import { useCart } from "../components/CartContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { PiPackage, PiPaintBrushDuotone } from "react-icons/pi";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";

import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const [viewMyOrders, setViewMyOrders] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [userCustomOrders, setUserCustomOrders] = useState([]);

  const userEmail = sessionStorage.getItem("userEmail");

  const displayNormalOrdersTable = () => {
    return (
      <Table aria-label="Normal Orders Table">
        <TableHeader>
          <TableColumn>Order Number</TableColumn>
          <TableColumn>Items</TableColumn>
          <TableColumn>Image</TableColumn>
          <TableColumn>Total</TableColumn>
          <TableColumn>Date</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No orders found."}>
          {userOrders.map((order, index) => (
            <TableRow key={index}>
              <TableCell>{order.orderNumber}</TableCell>
              <TableCell>
                <ul>
                  {order.cartItems.map((item, idx) => (
                    <li key={idx}>
                      {item.name} (x{item.quantity})
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>
                {order.cartItems[0]?.image ? (
                  <img
                    src={order.cartItems[0].image}
                    alt={order.cartItems[0].name}
                    className="h-16 w-16 object-cover"
                    loading="lazy"
                  />
                ) : (
                  "No image"
                )}
              </TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const displayCustomOrdersTable = () => {
    return (
      <Table aria-label="Custom Orders Table">
        <TableHeader>
          <TableColumn>Order Number</TableColumn>
          <TableColumn>Project Name</TableColumn>
          <TableColumn>Template</TableColumn>
          <TableColumn>Base</TableColumn>
          <TableColumn>Snow Design</TableColumn>
          <TableColumn>Logo</TableColumn>
          <TableColumn>Date</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No custom orders found."}>
          {userCustomOrders.map((order, index) => (
            <TableRow key={index}>
              <TableCell>{order.orderNumber}</TableCell>
              <TableCell>{order.projectName}</TableCell>
              <TableCell>{order.template.templateName}</TableCell>
              <TableCell>{order.template.base}</TableCell>
              <TableCell>{order.template.snowDesign}</TableCell>
              <TableCell>
                {order.template.logo ? (
                  <img
                    src={order.template.logo}
                    alt="Logo"
                    className="h-16 w-16 object-cover"
                    loading="lazy"
                  />
                ) : (
                  "No logo"
                )}
              </TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  let tabs = [
    {
      id: "normal",
      label: "Normal",
      icon: <PiPackage />,
      content: displayNormalOrdersTable(),
    },
    {
      id: "custom",
      label: "Custom",
      icon: <PiPaintBrushDuotone />,
      content: displayCustomOrdersTable(),
    },
  ];

  useEffect(() => {
    console.log("ShoppingCart component loaded, Cart Items:", cart);

    fetchUserOrders(userEmail);
    fetchUserCustomOrders(userEmail);
  }, [cart]);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0) {
      updateCartQuantity(item.id, newQuantity);
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    const email = sessionStorage.getItem("userEmail");

    const orderDetails = {
      cartItems: cart.map((item) => ({
        name: item.name,
        price: item.price,
        image: item.src,
        quantity: item.quantity,
      })),
      total: calculateTotalPrice(),
      email: email,
    };

    try {
      const response = await fetch("/api/orders/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        toast.success("Order has been placed successfully!");
        clearCart(); // Clear the cart
      } else {
        toast.error("Opps, your cart seems empty.");
      }
    } catch (error) {
      toast.error("An error occurred while placing the order.");
    }
  };

  const fetchUserOrders = async (email) => {
    try {
      const response = await fetch(`/api/orders/user/${email}`);
      const orders = await response.json();
      setUserOrders(orders);
    } catch (error) {
      console.log("Error fetching user orders:", error);
    }
  };

  const fetchUserCustomOrders = async (email) => {
    try {
      const response = await fetch(`/api/orders/customOrders/user/${email}`);
      const customOrders = await response.json();
      setUserCustomOrders(customOrders);
    } catch (error) {
      console.log("Error fetching user orders:", error);
    }
  };

  return (
    <section className="px-28 pb-16">
      <div className="mt-12 flex justify-between items-center mb-4">
        <h2 className="text-white body-text text-[25px] font-bold">
          {viewMyOrders ? "My Orders" : "Shopping Cart"}
        </h2>
        <Button
          variant="solid"
          color="primary"
          size="lg"
          onClick={() => setViewMyOrders(!viewMyOrders)}
          startContent={
            viewMyOrders ? (
              <AiOutlineShoppingCart size={25} />
            ) : (
              <PiPackage size={25} />
            )
          }
        >
          {viewMyOrders ? "Shopping Cart" : "My Orders"}
        </Button>
      </div>

      {viewMyOrders ? (
        <>
          <div className="w-full h-auto flex flex-col gap-3">
            <Tabs
              aria-label="Dynamic tabs"
              items={tabs}
              variant="solid"
              color="success"
              size="lg"
              radius="lg"
            >
              {(item) => (
                <Tab
                  key={item.id}
                  title={
                    <div className="flex items-center space-x-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  }
                >
                  <Card>
                    <CardBody>{item.content}</CardBody>
                  </Card>
                </Tab>
              )}
            </Tabs>
          </div>
        </>
      ) : (
        <>
          <div className="bg-white rounded-xl p-8 mt-8">
            <Table aria-label="Cart Items Table">
              <TableHeader>
                <TableColumn>S.N.</TableColumn>
                <TableColumn>Product Name</TableColumn>
                <TableColumn>Image</TableColumn>
                <TableColumn>Quantity</TableColumn>
                <TableColumn>Price</TableColumn>
                <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody emptyContent={"Your cart is empty!!"}>
                {cart.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <img
                        src={item.src}
                        alt={item.name}
                        className="w-[100px] h-[70px] rounded-[10px] object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Button
                          isIconOnly
                          variant="bordered"
                          color="primary"
                          onClick={() =>
                            handleQuantityChange(item, item.quantity - 1)
                          }
                        >
                          <AiOutlineMinus size={16} />
                        </Button>
                        <span className="mx-5">{item.quantity}</span>
                        <Button
                          isIconOnly
                          variant="bordered"
                          color="primary"
                          onClick={() =>
                            handleQuantityChange(item, item.quantity + 1)
                          }
                        >
                          <AiOutlinePlus size={16} />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>${item.price * item.quantity}</TableCell>
                    <TableCell>
                      <Button
                        variant="solid"
                        color="danger"
                        onClick={() => removeFromCart(item.id)}
                        startContent={<MdDeleteOutline size={20} />}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Cart Total and Checkout Button */}
            <div className="mt-8 flex justify-end items-center">
              <span className="text-black text-xl font-bold mr-8">
                Total: ${calculateTotalPrice().toFixed(2)}
              </span>
              <Button
                color="success"
                onClick={handleCheckout}
                startContent={<AiOutlineShoppingCart size={20} />}
              >
                Place Order
              </Button>
            </div>
          </div>
        </>
      )}

      <ToastContainer />
    </section>
  );
};

export default ShoppingCart;
