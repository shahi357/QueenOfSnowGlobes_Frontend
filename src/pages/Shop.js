import ShopItemImage1 from "../../src/images/shop/SP1.png";
import ShopItemImage2 from "../../src/images/shop/SP2.png";
import ShopItemImage3 from "../../src/images/shop/SP3.png";
import ShopItemImage4 from "../../src/images/shop/SP4.png";
import ShopItemImage5 from "../../src/images/shop/SP5.png";
import ShopItemImage6 from "../../src/images/shop/SP6.png";

import { IoCartOutline } from "react-icons/io5";

const Shop = () => {
  const shopItems = [
    {
      name: "Item1",
      src: ShopItemImage1,
    },
    {
      name: "Item2",
      src: ShopItemImage2,
    },
    {
      name: "Item3",
      src: ShopItemImage3,
    },
    {
      name: "Item4",
      src: ShopItemImage4,
    },
    {
      name: "Item5",
      src: ShopItemImage5,
    },
    {
      name: "Item6",
      src: ShopItemImage6,
    },
  ];
  return (
    <section className="px-28 pb-16">
      <div className="mt-12">
        <h2 className="text-white body-text text-[25px] font-bold">Shop</h2>
      </div>

      <div className="w-full h-auto grid grid-cols-3 gap-y-16 mt-12">
        {shopItems.map((shopItem, index) => (
          <div className="col-span-1 h-auto flex flex-col justify-center items-center">
            <img
              key={index}
              src={shopItem.src}
              alt={shopItem.name}
              className="w-[306px] h-[192px] rounded-[10px] object-cover cursor-pointer transition-all ease-linear duration-100 hover:border-2 hover:border-white"
            />

            <div className="w-full h-auto flex justify-center items-center -mt-3">
              <div className="w-[306px] h-[38px] bg-[#904444] flex justify-center items-center">
                <IoCartOutline size={30} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Shop;
