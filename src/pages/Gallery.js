import GalleryImage1 from "../../src/images/gallery/GI1.png";
import GalleryImage2 from "../../src/images/gallery/GI2.png";
import GalleryImage3 from "../../src/images/gallery/GI3.png";
import GalleryImage4 from "../../src/images/gallery/GI4.png";
import GalleryImage5 from "../../src/images/gallery/GI5.png";
import GalleryImage6 from "../../src/images/gallery/GI6.png";

const Gallery = () => {
  const galleryImages = [
    {
      name: "Image1",
      src: GalleryImage1,
    },
    {
      name: "Image2",
      src: GalleryImage2,
    },
    {
      name: "Image3",
      src: GalleryImage3,
    },
    {
      name: "Image4",
      src: GalleryImage4,
    },
    {
      name: "Image5",
      src: GalleryImage5,
    },
    {
      name: "Image6",
      src: GalleryImage6,
    },
  ];
  return (
    <section className="px-28 pb-16">
      <div className="mt-12">
        <h2 className="text-white body-text text-[25px] font-bold">Gallery</h2>
      </div>

      <div className="w-full h-auto grid grid-cols-3 gap-y-16 mt-12">
        {galleryImages.map((galleryImage, index) => (
          <div className="col-span-1 overflow-hidden flex justify-center">
            <img
              key={index}
              src={galleryImage.src}
              alt={galleryImage.name}
              className="w-[306px] h-[192px] rounded-[10px] object-cover cursor-pointer overflow-hidden transform transition-all ease-in-out duration-300 hover:scale-95 hover:shadow-xl"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
