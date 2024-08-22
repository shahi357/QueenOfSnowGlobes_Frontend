import { FaCheck } from "react-icons/fa";
import { PiPenNibLight, PiChats, PiPackageLight } from "react-icons/pi";

const Dashboard = () => {
  const features = [
    {
      label: "Design",
      icon: <PiPenNibLight size={40} />,
    },
    {
      label: "Consult",
      icon: <PiChats size={40} />,
    },
    {
      label: "Order",
      icon: <PiPackageLight size={40} />,
    },
  ];
  return (
    <section>
      {/* Hero */}
      <div className="mx-auto text-white text-center flex flex-col justify-center items-center w-full min-h-[70vh]">
        <h2 className="text-[50px] uppercase mt-16">
          <strong className="text-[60px] sub-heading">
            Capture the Magic:
          </strong>
          <br />
          Snow globe for every season
        </h2>
        <p className="uppercase mt-10 text-[18px]">
          Create your own snow globe
        </p>

        <div className="mt-10 w-full h-auto flex justify-center items-center gap-4">
          <button className="bg-[#85B6FF] text-black w-[180px] h-[57px] rounded-[40px] text-lg font-bold">
            Customise
          </button>

          <button className="bg-[#85B6FF] text-black w-[180px] h-[57px] rounded-[40px] text-lg font-bold">
            Designs
          </button>
        </div>

        <div className="flex gap-5 items-center mt-10">
          {features.map((feature, index) => (
            <button
              key={index}
              className="flex gap-7 shadow-2xl justify-center items-center text-[24px] w-[244px] h-[80px] bg-[#181818] text-[#85B6FF]"
            >
              {feature.icon}
              <span className="text-white">{feature.label}</span>
              <FaCheck />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
