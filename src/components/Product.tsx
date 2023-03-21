import Image, { ImageLoaderProps } from "next/image";
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

const myLoader = ({src, width, quality}: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const Product = ({
  _id: productId,
  name,
  price,
  image
}: IProduct) => {
  const router = useRouter();

  // console.log("rout: ", router)

  function addProduct() {
    console.log("add product")
  }

  return (
    <div className="w-full p-2 bg-white rounded-md shadow-lg lg:shadow-none hover:shadow-2xl">
      <Link href={{ pathname: `/${productId}`, query: productId }} className="grid grid-cols-1 grid-rows-2">
        <div className="bg-white flex align-center justify-center">
          <Image
            loader={myLoader}
            src={image[0]}
            height={200}
            width={200}
            alt={name}
          />
        </div>

        <div className="">
          <div className="mt-2">
            <p className="font-normal tex-sm md:text-md leading-4">{name}</p>
          </div>
          <div className="flex gap-1 lg:gap-3 text-sm lg:text-xl my-2">
            <p className="font-medium">₦{addComma(price)}</p>
            <p className="line-through text-[#aaa9a9]">₦{addComma(price)}</p>
          </div>
          <p className="text-sm mt-1 leading-4 text-red-500">{"TODO: Rate"}</p>
        </div>


      </Link>

      <button
        onClick={addProduct} className="mt-0 py-1 text-sm rounded-md">Add to Cart</button>
    </div>
  );
}

export default Product;