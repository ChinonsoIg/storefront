import {useContext} from "react";

interface IProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string[];
}

const Product = ({
  _id, 
  name, 
  price, 
  description, 
  image
}: IProduct) => {
  function addProduct() {
    console.log("add product")
  }

  return (
    <div className="w-52">
      <div className="bg-blue-100 p-5 rounded-xl">
        <img src={image[0]} alt=""/>
      </div>
      <div className="mt-2">
        <h3 className="font-bold text-lg">{name}</h3>
      </div>
      <p className="text-sm mt-1 leading-4 text-gray-500">{description}</p>
      <div className="flex mt-1">
        <div className="text-2xl font-bold grow">₦{price}</div>
        <button
          onClick={addProduct} className="bg-emerald-400 text-white py-1 px-3 rounded-xl">+</button>
      </div>
    </div>
  );
}

export default Product;