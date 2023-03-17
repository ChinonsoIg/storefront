import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { addComma } from "utils/functions";

interface IProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string[];
}

const Product = ({
  _id: productId,
  name,
  price,
  description,
  image
}: IProduct) => {
  const router = useRouter();
  // console.log("pr : ", router)

  function addProduct() {
    console.log("add product")
  }

  return (
    <div className="w-full p-2 bg-white rounded-md shadow-none hover:shadow-2xl">
      <Link href={`/${productId}`}>
        <div className="bg-white flex align-center justify-center row-span-4">
          <img src={image[0]} alt={name} />
        </div>

        <div className="row-span-2">
        <div className="mt-2">
          <h3 className="font-normal text-lg">{name}</h3>
        </div>
        <div className="flex gap-3 text-xl font-medium my-2">
          <p>₦{addComma(price)}</p>
          <p className="line-through text-[#aaa9a9]">₦{addComma(price)}</p>
        </div>
        <p className="text-sm mt-1 leading-4 text-gray-500">{"TODO: Rate"}</p>
        </div>


      </Link>

      <button
        onClick={addProduct} className="mt-4 py-1 px-3 rounded-md">Add to Cart</button>
    </div>
  );
}

export default Product;