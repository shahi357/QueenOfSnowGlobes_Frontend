import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";

import { MdDeleteOutline } from "react-icons/md";

function ManageOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();

      if (response.ok) {
        setOrders(data);
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching orders.");
    }
  };

  const handleDelete = async (orderNumber) => {
    try {
      const response = await fetch(`/api/orders/delete/${orderNumber}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Order deleted successfully.");
        // Fetch the updated orders after deletion
        fetchOrders();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete order.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <section className="py-10">
      <h1 className="text-2xl font-bold mb-4 text-white">Orders</h1>
      <Table aria-label="Orders Table">
        <TableHeader>
          <TableColumn>Order Number</TableColumn>
          <TableColumn>Items</TableColumn>
          <TableColumn>Image</TableColumn>
          <TableColumn>Total</TableColumn>
          <TableColumn>Customer Email</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No orders found."}>
          {orders.map((order, index) => (
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
              <TableCell>{order.email}</TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  color="danger"
                  variant="solid"
                  onClick={() => handleDelete(order.orderNumber)}
                  startContent={<MdDeleteOutline size={20} />}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ToastContainer />
    </section>
  );
}

export default ManageOrders;
