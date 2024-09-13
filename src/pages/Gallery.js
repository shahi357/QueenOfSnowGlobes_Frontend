import { useState, useEffect } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [popUpImage, setPopUpImage] = useState({});

  const handleImagePopUp = (galleryImage) => {
    onOpen();
    setPopUpImage(galleryImage);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/gallery/images");
        const data = await response.json();
        if (response.ok) {
          setGalleryImages(data);
          console.log(data);
        } else {
          console.error("Failed to fetch gallery images");
        }
      } catch (error) {
        console.error("Error fetching gallery images");
      }
    };

    fetchImages();
  }, []);

  return (
    <section className="px-28 pb-16">
      <div className="mt-12">
        <h2 className="text-white body-text text-[25px] font-bold">Gallery</h2>
      </div>

      <div className="w-full h-auto grid grid-cols-4 gap-y-16 mt-12 gap-x-10">
        {galleryImages.length !== 0 ? (
          <>
            {galleryImages.map((galleryImage, index) => (
              <div
                key={index}
                className="col-span-1 overflow-hidden flex justify-center"
              >
                <img
                  src={galleryImage.src}
                  alt={galleryImage.name}
                  loading="lazy"
                  className="w-[306px] h-[192px] rounded-[10px] object-cover cursor-pointer overflow-hidden transform transition-all ease-in-out duration-300 hover:scale-95 hover:shadow-xl"
                  onClick={() => handleImagePopUp(galleryImage)}
                />
              </div>
            ))}
          </>
        ) : (
          <div className="col-span-3 h-[300px] p-5 text-gray-700 text-lg font-semibold flex justify-center items-center bg-white rounded-lg shadow-lg">
            <p>No items in gallery yet.</p>
          </div>
        )}
      </div>

      <Modal
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        size="4xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Gallery</ModalHeader>
              <ModalBody className="pb-10">
                <img
                  src={popUpImage.src}
                  alt={popUpImage.name}
                  className="w-full h-full max-w-[1000px] max-h-[600px] rounded-[10px] object-contain object-center"
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};

export default Gallery;
