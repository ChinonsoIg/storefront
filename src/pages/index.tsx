import styles from "@/styles/globals.module.css"
import Head from "next/head"
import Image from "next/image"
import { Inter } from "@next/font/google"
import { useEffect, useState } from "react";
import Link from "next/link";

import Product from "../components/Product";
import Footer from "../components/Footer";
import Layout from "../components/Layout";


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


const Home = ({ products, categories }: IProps) => {
  const [phrase, setPhrase] = useState("");

  const findCategory = (id: string) => {
    const found = categories.categories.find((category) => category._id == id)?.categoryName;
    return found;
  };

  const categoriesNames = [...products.products.map(product => findCategory(product.categoryId))];

  // console.log("gh: ", categoriesNames);
  // console.log("ghh: ", categories);

  // if (phrase) {
  //   products = products.filter(p => p.name.toLowerCase().includes(phrase));
  // }

  return (
    <Layout>
      <div className="relative flex items-start gap-2">
        <nav className="hidden lg:block absolute top-4 left-0 w-48 h-96 px-4 py-2 shadow-md rounded-md border bg-white">
          <ul className="py-2">
            {categories.categories.map((category) => (
              <li key={category._id} className="capitalize py-1.5">
                <Link href={{ pathname: `/categories`, query: {categoryId: category._id} }}>
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
            <p className="absolute top-10 lg:top-28 left-10 lg:left-40 z-10 font-extrabold text-white text-4xl">
              ADVERT TABLE
              ADVERT TABLE
              ADVERT TABLE
              ADVERT TABLE
            </p>
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