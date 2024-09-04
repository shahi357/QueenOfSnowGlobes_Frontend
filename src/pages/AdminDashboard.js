import { GrGallery } from "react-icons/gr";
import { AiOutlineShop } from "react-icons/ai";
import { PiPackage, PiPaintBrushDuotone } from "react-icons/pi";
import GalleryForm from "../components/GalleryForm";
import { useState } from "react";
import ShopForm from "../components/ShopForm";
import ManageOrders from "../components/ManageOrders";
import ManageCustomOrders from "../components/ManageCustomOrders";

const AdminDashboard = () => {
  const adminTasks = [
    {
      task: "Manage Orders",
      icon: <PiPackage className="text-7xl" />,
    },
    {
      task: "Custom Orders",
      icon: <PiPaintBrushDuotone className="text-7xl" />,
    },
    {
      task: "Manage Shop",
      icon: <AiOutlineShop className="text-7xl" />,
    },
    {
      task: "Manage Gallery",
      icon: <GrGallery className="text-7xl" />,
    },
  ];

  const [selectedTask, setSelectedTask] = useState("Manage Orders");

  const handleTaskSelection = (taskToPerform) => {
    setSelectedTask(taskToPerform);
  };

  return (
    <section className="px-28 pb-16 mt-20">
      <div>
        <h2 className="text-3xl font-bold text-gray-100">Welcome Admin!</h2>

        <div className="grid grid-cols-4 gap-10 mt-10">
          {adminTasks.map((adminTask, index) => (
            <div
              key={index}
              className={`col-span-1 border-2 flex flex-col justify-center items-center
                h-auto py-10 gap-5 rounded-xl bg-sky-100 cursor-pointer text-gray-700 transition-all ease-in-out duration-200
                ${
                  selectedTask === adminTask.task
                    ? "bg-sky-600 text-white"
                    : "bg-none"
                }
                hover:bg-sky-600 hover:text-white hover:shadow-xl`}
              onClick={() => handleTaskSelection(adminTask.task)}
            >
              {adminTask.icon}
              <p className="font-semibold text-xl">{adminTask.task}</p>
            </div>
          ))}
        </div>

        <div>
          {selectedTask === "Manage Gallery" ? (
            <GalleryForm />
          ) : selectedTask === "Manage Shop" ? (
            <ShopForm />
          ) : selectedTask === "Custom Orders" ? (
            <ManageCustomOrders />
          ) : (
            <ManageOrders />
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
