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


export default function ({ products, categories }: IHome) {
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
      <input value={phrase} onChange={e => setPhrase(e.target.value)} type="text" placeholder="Search for products..." className="bg-gray-200 w-full py-2 px-4 rounded-md" />

      <div>
        {categories.categories.map(category => (
          <div key={category._id}>
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

