import React from "react";
import { useRouter } from "next/router";
import Image, { ImageLoaderProps } from "next/image";
import { GetServerSideProps } from "next";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdAddShoppingCart, MdFacebook } from "react-icons/md";
import { FaTwitter } from "react-icons/fa";
import { AiFillTwitterCircle, AiOutlineBars, AiOutlineFileText } from "react-icons/ai";
import { BiCommentCheck } from "react-icons/bi";

import Layout from "@/components/Layout";
import { addComma } from "utils/functions";
import Product from "@/components/Product";


interface IProduct {
  product: {
    categoryId: string,
    createdAt: string,
    createdBy: string,
    description: string,
    image: string[]
    name: string
    price: number
    quantity: string
    status: string
    updatedAt: string
    _id: string
  }
}

interface ICategory {
  categoryName: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  _id: string;
}

interface IProducts {
  categoryId: string;
  createdAt: string;
  createdBy: string;
  description: string;
  image: Array<string>;
  name: string;
  price: number;
  quantity: number;
  status: string;
  updatedAt: string;
  _id: string;
}

interface IProps {
  product: IProduct;
  categories: {
    categories: Array<ICategory>;
    count: number;
  };
  products: {
    products: Array<IProducts>;
    productsPerPage: number;
    totalProducts: number;
  };
}

const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const SingleProduct = ({ product, categories, products }: IProps) => {
  const router = useRouter();
  console.log("pr : ", product.product);

  const findCategory = (id: string) => {
    const found = categories.categories.find((category) => category._id == id)?.categoryName;
    return found;
  };

  return (
    <Layout>
      <section className="grid grid-cols-1 lg:grid-cols-4 grid-rows-1 lg:grid-rows-1 lg:gap-x-8 gap-y-4 my-5
      ">

        <div className="col-span-3 grid grid-col-1 lg:grid-cols-5 gap-5 bg-[color:var(--white)] rounded-md px-5 py-3 shadow-md">
          <div className="col-span-2">
            <div className="w-full">
              <Image
                loader={myLoader}
                src={product.product?.image[0]}
                height={200}
                width={200}
                alt={product.product?.name}
              />
            </div>
            <div className="my-5">
              {product.product.image.map((url, ind) => (
                <div key={ind} className="w-16 mr-3 mb-3">
                  <Image
                    loader={myLoader}
                    src={url}
                    height={200}
                    width={200}
                    alt={product.product?.name}
                  />
                </div>
              ))}
            </div>
            <p className="border-t-2 border-gray-100 pt-5 uppercase">
              Share this product
            </p>
            <ul className="flex items-start my-2 gap-3">
              <li>
                <MdFacebook size={22} color="#4267b2" />
              </li>
              <li>
                <FaTwitter size={20} color="#1da1f2" />
              </li>
            </ul>
          </div>
          <div className="col-span-3">
            <div className="w-full">
              <div className="flex justify-between text-[color:var(--primary-color-dark)] font-medium">
                <p className="text-sm">Seller name sore</p>
                <AiOutlineHeart size={22} color="#f68b1e" />
              </div>
              <p className="text-lg lg:text-2xl font-normal">{product.product.name}</p>
              <p className="text-sm">
                Category:{" "}
                <span>{findCategory(product.product.categoryId)}</span>
              </p>
              <div className="my-1">Star ratings</div>
              <p className="w-max px-2 py-0.2 rounded-sm font-medium text-sm text-[color:var(--white)] bg-[color:var(--primary-color)]">Free delivery*</p>
            </div>

            <div className="w-full my-5 py-5 border-t-2 border-b-2 border-gray-100 grid gap-1">
              <p className="text-md lg:text-2xl font-bold">
                ₦{addComma(product.product.price)}</p>
              <p>{product.product.status}</p>
              <p>+ shipping from "Seller address"</p>
              <button className="w-full flex items-center justify-start px-3 py-3 rounded-md font-medium mt-5 shadow-lg">
                <MdAddShoppingCart className="justify-self-start" size={22} />
                <span className="justify-self-center m-auto">Add to cart</span>
              </button>
            </div>
            <div>
              <p className="uppercase">Promotions</p>
              <p className="my-2 text-indigo-500">Report incorrect product information</p>
            </div>
          </div>
        </div>

        <aside className="rounded-md bg-[color:var(--white)] py-3 shadow-md h-max lg:h-auto">
          <h5 className="border-b-2 border-gray-100 pb-1 px-5 mb-2">Delivery address </h5>
          <p className="px-5">Lorem ipsum dolor sita</p>
        </aside>
      </section>

      <section className="grid 
      grid-cols-1 
      lg:grid-cols-4
      grid-rows-1
      lg:grid-rows-1 
      lg:gap-x-8 gap-y-4 my-5
      grid-content">

        <div className="col-span-3 grid grid-col-1 grid-row-3 gap-5">
          <div className="rounded-md bg-[color:var(--white)] py-3 shadow-md">
            <h5 className="border-b-2 border-gray-100 pb-1 px-5 mb-2">Product description</h5>
            <p className="px-5">{product.product.description}</p>
          </div>

          <div className="rounded-md bg-[color:var(--white)] py-3 shadow-md">
            <h5 className="border-b-2 border-gray-100 pb-1 px-5 mb-2">Specifications</h5>
            <p className="px-5">
              {"Product specification"}
              kjakj shs j dnk dihio jdoeiju oejowj jojoie eoiwo  ohjo hewjoe oe eu od eoje  ojuw h hehehuioe hi ejioe eoe whiefefjklha erh eha eoeaihe erih iieau whihi iikoei ehiheh ehihe oeue
            </p>
          </div>
          <div className="rounded-md bg-[color:var(--white)] py-3 shadow-md">
            <h5 className="border-b-2 border-gray-100 pb-1 px-5 mb-2">Customer feedback</h5>
            <p className="px-5">{"comments on ratings"}</p>
          </div>
        </div>

        <aside className="hidden lg:grid h-min rounded-md bg-[color:var(--white)] px-0 py-0 shadow-md gap-0.5">
          <p className="flex items-center gap-3 p-5 rounded-t-lg bg-gray-200">
            <AiOutlineFileText size={22} />
            Product description
          </p>
          <p className="flex items-center gap-3 p-5 bg-gray-200">
            <AiOutlineBars size={22} />
            Specifications
          </p>
          <p className="flex items-center gap-3 p-5 rounded-b-lg bg-gray-200">
            <BiCommentCheck size={22} />
            Customer feedback
          </p>
        </aside>
      </section>

      <section className="my-10">
        <h3>Similar products</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-5 mt-1"
        >
          {products.products.filter(singleProduct => singleProduct.categoryId === product.product.categoryId).map(productInfo => (
            <div key={productInfo._id}>
              <Product {...productInfo} />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )

}


export const getServerSideProps: GetServerSideProps<{ product: IProduct, categories: ICategory, products: IProducts }> = async (context) => {
  const productId = context?.params?.id;

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const resProduct = await fetch(`${BASE_URL}/products/storefront/${productId}`);
  const resCategories = await fetch(`${BASE_URL}/categories`);
  const resProducts = await fetch(`${BASE_URL}/products/storefront`);

  const product: IProduct = await resProduct.json();
  const categories: ICategory = await resCategories.json();
  const products: IProducts = await resProducts.json();

  return { props: { product, categories, products } };
}


export default SingleProduct;