import React, { useState } from "react";
import { HiTemplate } from "react-icons/hi";
import { FaShapes, FaUpload } from "react-icons/fa6";
import templates from "../utils/templates";
import { snowDesigns, bases } from "../utils/elements";

import SnowGblobeGlobal from "../images/templates/globe.jpg";
import { ToastContainer, toast } from "react-toastify";

import DummyLogo from "../images/dummy-logo.png";

const CreateDesign = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Templates");
  const [projectName, setProjectName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [uploadedImages, setUploadedImages] = useState([]);

  const [selectedBase, setSelectedBase] = useState("");
  const [selectedSnowDesign, setSelectedSnowDesign] = useState("");
  const [selectedLogo, setSelectedLogo] = useState("");

  const sideMenu = [
    {
      menuName: "Templates",
      icon: (
        <HiTemplate
          size={35}
          className={`${
            selectedMenuItem === "Templates"
              ? "text-[#85B6FF]"
              : "text-gray-400"
          }`}
        />
      ),
    },
    {
      menuName: "Elements",
      icon: (
        <FaShapes
          size={35}
          className={`${
            selectedMenuItem === "Elements" ? "text-[#85B6FF]" : "text-gray-400"
          }`}
        />
      ),
    },
    {
      menuName: "Uploads",
      icon: (
        <FaUpload
          size={35}
          className={`${
            selectedMenuItem === "Uploads" ? "text-[#85B6FF]" : "text-gray-400"
          }`}
        />
      ),
    },
  ];

  // Handle Active Menu Selection
  const handleMenuItemClick = (menuName) => {
    setSelectedMenuItem(menuName);
  };

  // Handle Snow Globe Base Design Selection
  const handleBaseClick = (base) => {
    setSelectedTemplate((prevTemplate) => ({
      ...prevTemplate,
      base: base.image,
    }));

    setSelectedBase(base.baseName);
  };

  // Handle Snow Design Selection
  const handleSnowDesignClick = (snowDesign) => {
    setSelectedTemplate((prevTemplate) => ({
      ...prevTemplate,
      snowDesign: snowDesign.image,
    }));

    setSelectedSnowDesign(snowDesign.snowDesign);
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);

    if (files.length + uploadedImages.length > 3) {
      toast.warning("You can only upload a maximum of 3 images.");
      return;
    }

    const images = files.filter((file) => file.type.startsWith("image/"));

    if (images.length > 0) {
      setUploadedImages((prevImages) => [...prevImages, ...images]);
    }
  };

  // Handle Logo Selection
  const handleUploadedImageSelection = (image) => {
    setSelectedTemplate((prevTemplate) => ({
      ...prevTemplate,
      logo: image,
    }));

    setSelectedLogo(image);
  };

  return (
    <section>
      <div className="flex">
        {/* Navigation Drawer */}
        <div className="w-[390px] h-screen bg-[#776C8D]/40 shadow-lg border-2 border-gray-500 border-l-0 flex">
          {/* Side Menu */}
          <div className="w-[120px] h-full bg-[#83859b]/40 flex flex-col gap-3 items-center py-5">
            {sideMenu.map((menu, index) => (
              <button
                key={index}
                className={`flex flex-col justify-center items-center w-full h-auto py-2 space-y-1 ${
                  selectedMenuItem === menu.menuName
                    ? "text-[#85B6FF]"
                    : "text-gray-400"
                }`}
                onClick={() => handleMenuItemClick(menu.menuName)}
              >
                {menu.icon}
                <p className="text-[12px] font-bold">{menu.menuName}</p>
              </button>
            ))}
          </div>

          {/* Side Menu Items */}
          <div className="w-full h-auto flex flex-col box-border py-4 ml-4">
            {selectedMenuItem === "Templates" && (
              <div>
                <h3 className="text-lg font-bold text-white body-text">
                  Templates
                </h3>
                {templates.map((template, index) => (
                  <img
                    key={index}
                    src={template.thumbnailImage}
                    alt={template.templateName}
                    onClick={() => setSelectedTemplate(template)}
                    className="w-[180px] transition-all ease-in-out hover:bg-[#85B6FF] h-[144px] object-contain border border-white cursor-pointer rounded-lg shadow-md mt-3"
                  />
                ))}
              </div>
            )}

            {selectedMenuItem === "Elements" && (
              <div>
                <h3 className="text-lg font-bold text-white body-text">
                  Base Shape
                </h3>
                {bases.map((base, index) => (
                  <div key={index} className="mt-2">
                    <p className="text-sm text-gray-400 mb-1">
                      {base.baseName}
                    </p>
                    <img
                      src={base.image}
                      alt={base.baseName}
                      onClick={() => handleBaseClick(base)}
                      className={`w-[180px] transition-all p-5 ease-in-out ${
                        selectedBase === base.baseName
                          ? "bg-[#85B6FF]"
                          : "bg-none"
                      } hover:bg-[#85B6FF] h-[100px] object-contain border border-white cursor-pointer rounded-lg shadow-md`}
                    />
                  </div>
                ))}

                <h3 className="text-lg font-bold text-white body-text mt-5">
                  Snow Designs
                </h3>
                {snowDesigns.map((snowDesign, index) => (
                  <div key={index} className="mt-2">
                    <p className="text-sm text-gray-400 mb-1">
                      {snowDesign.snowDesign}
                    </p>
                    <img
                      src={snowDesign.image}
                      alt={snowDesign.snowDesign}
                      onClick={() => handleSnowDesignClick(snowDesign)}
                      className={`w-[180px] ${
                        selectedSnowDesign === snowDesign.snowDesign
                          ? "border-4 border-[#85B6FF]"
                          : "border"
                      } hover:border-2 hover:border-[#85B6FF] h-[100px] object-cover border border-white cursor-pointer rounded-lg shadow-md`}
                    />
                  </div>
                ))}
              </div>
            )}

            {selectedMenuItem === "Uploads" && (
              <div className="p-2">
                <label className="bg-[#85B6FF] text-black w-[170px] h-[50px] rounded-[40px] text-lg font-bold flex justify-center items-center transition-all duration-300 ease-in-out hover:ring-2 hover:ring-green-400 cursor-pointer">
                  Upload File
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <h3 className="text-lg font-bold text-white body-text mt-5">
                  Uploads
                </h3>
                <div className="flex flex-wrap gap-3 mt-3">
                  {uploadedImages.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Upload ${index + 1}`}
                      onClick={() =>
                        handleUploadedImageSelection(URL.createObjectURL(image))
                      }
                      className={`w-[170px] h-[130px] ${
                        selectedLogo === selectedTemplate.logo
                          ? "bg-[#85B6FF]"
                          : "bg-none"
                      } object-contain border border-white rounded-lg shadow-md cursor-pointer`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Create Design Canvas */}
        <div className="w-full h-screen flex flex-col px-20">
          {/* Control Buttons */}
          <div className="flex items-center gap-8 w-full h-auto p-2">
            <a
              href="/designs"
              className="bg-[#85B6FF] text-black w-[180px] h-[57px] rounded-[40px] text-lg font-bold flex justify-center items-center transition-all duration-300 ease-in-out hover:ring-2 hover:ring-green-400"
            >
              Designs
            </a>

            <button className="bg-[#85B6FF] text-black w-[180px] h-[57px] rounded-[40px] text-lg font-bold flex justify-center items-center transition-all duration-300 ease-in-out hover:ring-2 hover:ring-green-400">
              Save
            </button>

            <button className="bg-[#85B6FF] text-black w-[180px] h-[57px] rounded-[40px] text-lg font-bold flex justify-center items-center transition-all duration-300 ease-in-out hover:ring-2 hover:ring-green-400">
              Submit
            </button>
          </div>

          {/* Design Canvas */}
          <div className="w-full">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project Name"
              className="text-[25px] text-white font-bold bg-transparent border-b border-white outline-none w-full mt-10"
            />

            <div className="w-full h-[520px] bg-gray-800/50 text-white mt-5 flex flex-col items-center pt-16">
              {Object.keys(selectedTemplate).length === 0 ? (
                <p className="text-3xl font-bold">
                  Please select a template to begin.
                </p>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <h3 className="font-semibold text-xl mb-10 text-left bg-sky-600/70 px-5 py-[10px] rounded-3xl rounded-tr-none shadow-gray-400 shadow-xl">
                    {selectedTemplate.templateName}
                  </h3>
                  {/* Snow Globe */}
                  <div className="relative flex justify-center items-center w-64 h-64">
                    <img
                      src={SnowGblobeGlobal}
                      alt="Global Snow Globe"
                      className="w-60 h-60 object-contain -mt-6 z-0 relative"
                    />
                    {/* Snow Design */}
                    {selectedTemplate.snowDesign && (
                      <div className="absolute -top-[3px] left-0 w-full h-full flex justify-center items-center">
                        <img
                          src={selectedTemplate.snowDesign}
                          alt="Selected Snow Design"
                          className="w-56 h-56 rounded-full bg-sky-300 object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Snow Globe Base */}
                  <div className="relative w-48 h-24 -mt-[46px]">
                    <img
                      src={selectedTemplate.base}
                      alt={selectedTemplate.templateName}
                      className="w-48 h-24 object-contain z-[5]"
                    />

                    {selectedTemplate.logo && (
                      <div className="absolute top-0 left-0 w-48 h-24 flex justify-center items-center">
                        <img
                          src={selectedTemplate.logo}
                          className="w-14 h-14 object-cover overflow-hidden"
                          alt="uploaded-logo"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default CreateDesign;
