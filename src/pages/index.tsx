import styles from "@/styles/globals.module.css"
import Head from "next/head"
import Image from "next/image"
import { Inter } from "@next/font/google"
import { useEffect, useState } from "react";

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

interface IHome {
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


const Home = ({ products, categories }: IHome) => {
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
        <aside className="fixed top-24 left-11 w-48 h-96 px-4 py-2 shadow-md rounded-md border bg-white">
          <ul className="py-2">
            {categories.categories.map((category) => (
              <li className="capitalize py-1">
                {category.categoryName}
              </li>
            ))}
          </ul>
        </aside>
        {/* linear-gradient(to right bottom, #2f3441 50%, #212531 50%); */}
        <main className="ml-56 mt-4">
          <section
          className="relative h-96 w-full bg-orange-500 rounded-md"
          >
            <p className="absolute top-28 left-40 z-10 font-extrabold text-white text-4xl">
              ADVERT TABLE
              ADVERT TABLE
              ADVERT TABLE
              ADVERT TABLE
            </p>
            <div className="absolute z-0 h-96 w-full advert-table bg-purple-700 rounded-md">
            </div>
          </section>
          <section className="mt-5">
          {categories.categories.map(category => (
            <div key={category._id} className="">
              {products.products.find(p => p.categoryId === category._id) && (
                <div className="mb-5">
                  <h2 className="text-2xl py-5 capitalize">{category.categoryName}</h2>
                  <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
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
  // console.log("products: ", resProducts);

  const resCategories = await fetch(`${BASE_URL}/categories`);

  const products = await resProducts.json();
  const categories = await resCategories.json();

  return { props: { products, categories } };
}



export default Home;