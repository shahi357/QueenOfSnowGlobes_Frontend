import Design1Image from "../images/designs/design1.png";
import Design2Image from "../images/designs/design2.png";
import Design3Image from "../images/designs/design3.png";
import Design4Image from "../images/designs/design4.png";
import Design5Image from "../images/designs/design5.png";
import Design6Image from "../images/designs/design6.png";

const Designs = () => {
  const designs = [
    {
      name: "Design 1",
      imageSrc: Design1Image,
    },
    {
      name: "Design 2",
      imageSrc: Design2Image,
    },
    {
      name: "Design 3",
      imageSrc: Design3Image,
    },
    {
      name: "Design 4",
      imageSrc: Design4Image,
    },
    {
      name: "Design 5",
      imageSrc: Design5Image,
    },
    {
      name: "Design 6",
      imageSrc: Design6Image,
    },
  ];
  return (
    <section className="px-28 pb-16">
      <div className="mt-12 flex w-full items-center gap-10 py-5">
        <h2 className="text-white body-text text-[25px] font-bold">Designs</h2>
        <a
          href="/create"
          className="bg-[#85B6FF] text-black w-[180px] h-[57px] rounded-[40px] text-lg font-bold flex justify-center items-center transition-all duration-300 ease-in-out hover:ring-2 hover:ring-green-400"
        >
          Create New
        </a>
      </div>

      <div className="w-full h-auto grid grid-cols-3 gap-y-16 mt-12">
        {designs.map((design, index) => (
          <div className="col-span-1 h-auto flex flex-col justify-center items-center group">
            <img
              key={index}
              src={design.imageSrc}
              alt={design.name}
              className="w-[306px] h-[192px] rounded-[10px] object-cover cursor-pointer transition-all ease-linear duration-100 group-hover:border-2 group-hover:border-white"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Designs;
