import styles from "@/styles/globals.module.css";
import Head from "next/head";
import Image, { ImageLoaderProps } from "next/image";
import { Inter } from "@next/font/google"
import { useEffect, useState } from "react";
import Link from "next/link";
import "animate.css";

import Product from "../components/Product";
import Layout from "../components/Layout";

import advert_trainer from "/public/images/advert_trainer.png";
import advert_top_purple from "/public/images/advert_top_purple.png";
import advert_apple_watch from "/public/images/advert_apple_watch.png";

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
  products: {
    products: Array<IProducts>;
    productsPerPage: number;
    totalProducts: number;
  };
  categories: {
    categories: Array<ICategory>;
    count: number;
  }
}


const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const Home = ({ products, categories }: IProps) => {
  const [phrase, setPhrase] = useState("");

  const findCategory = (id: string) => {
    const found = categories.categories.find((category) => category._id == id)?.categoryName;
    return found;
  };

  const categoriesNames = [...products.products.map(product => findCategory(product.categoryId))];

  // console.log("gh: ", categoriesNames);
  console.log("ghh: ", products);

  // if (phrase) {
  //   products = products.filter(p => p.name.toLowerCase().includes(phrase));
  // }

  return (
    <Layout>
      <div className="relative flex items-start gap-2">
        <nav className="hidden lg:block fixed top-24 w-48 h-96 px-4 py-2 shadow-md rounded-md border bg-white">
          <ul className="py-2">
            {categories.categories.map((category) => (
              <li key={category._id} className="capitalize py-1.5">
                <Link href={{ pathname: `/categories`, query: { categoryId: category._id } }}>
                  {category.categoryName}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="ml-0 lg:ml-56 mt-4">
          <section
            className="relative h-96 w-full bg-orange-500 rounded-md"
          >
            <p className="absolute top-[45%] z-10 font-extrabold text-3xl text-white px-2 animate__animated animate__bounce">
              Best online mall for ladies
            </p>

            <div className="absolute bottom-[3%] left-[5%] z-10">
              <Image
                loader={myLoader}
                src={advert_trainer}
                height={100}
                width={100}
                alt="l"
              />
            </div>
            <div className="absolute bottom-[25%] right-[4%] z-10">
              <Image
                loader={myLoader}
                src={advert_apple_watch}
                height={100}
                width={100}
                alt="l"
              />
            </div>
            <div className="absolute top-[3%] left-[5%] z-10">
              <Image
                loader={myLoader}
                src={advert_top_purple}
                height={100}
                width={100}
                alt="l"
              />
            </div>
            
            <div className="absolute z-0 h-96 w-full advert-table bg-purple-700 rounded-md">
            </div>
          </section>
          <section className="my-8">
            {categories.categories.map(category => (
              <div key={category._id} className="">
                {products.products.find(p => p.categoryId === category._id) && (
                  <div className="mb-8">
                    <h2 className="text-md lg:text-xl p-2 my-2 capitalize bg-[color:var(--primary-color-light)]">{category.categoryName}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-5"
                    >
                      {products.products.filter(product => product.categoryId === category._id).map(productInfo => (
                        <div key={productInfo._id}>
                          <Product {...productInfo} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </section>
        </main>
      </div>

    </Layout>
  )
}



export const getServerSideProps = async () => {
  // Fetch data from external API
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const resProducts = await fetch(`${BASE_URL}/products/storefront`);

  const resCategories = await fetch(`${BASE_URL}/categories`);

  const products = await resProducts.json();
  const categories = await resCategories.json();

  return { props: { products, categories } };
}



export default Home;