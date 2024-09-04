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

function ManageCustomOrders() {
  const [customOrders, setCustomOrders] = useState([]);

  // Fetch custom orders from the server
  const fetchCustomOrders = async () => {
    try {
      const response = await fetch("/api/orders/customOrders");
      const data = await response.json();

      if (response.ok) {
        setCustomOrders(data);
      } else {
        toast.error("Failed to fetch custom orders.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching custom orders.");
    }
  };

  // Handle delete custom order
  const handleDelete = async (orderNumber) => {
    try {
      const response = await fetch(`/api/orders/custom/delete/${orderNumber}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Custom order deleted successfully.");
        // Fetch the updated custom orders after deletion
        fetchCustomOrders();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete custom order.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchCustomOrders();
  }, []);

  return (
    <section className="py-10">
      <h1 className="text-2xl font-bold mb-4 text-white">Custom Orders</h1>
      <Table aria-label="Custom Orders Table">
        <TableHeader>
          <TableColumn>Order Number</TableColumn>
          <TableColumn>Project Name</TableColumn>
          <TableColumn>Template</TableColumn>
          <TableColumn>Base</TableColumn>
          <TableColumn>Snow Design</TableColumn>
          <TableColumn>Logo</TableColumn>
          <TableColumn>Customer Email</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No custom orders found."}>
          {customOrders.map((order, index) => (
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

export default ManageCustomOrders;
