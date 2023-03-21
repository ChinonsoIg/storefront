import React from "react";
import Link from "next/link";

import Layout from "../../components/Layout";
import Product from "@/components/Product";
import { useRouter } from "next/router";

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


const Category = ({ products, categories }: IProps) => {
  const router = useRouter();
  const query = router.query.categoryId
  
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
        <main className="ml-0 lg:ml-56 mt-2 w-full">
          <section className="my-0 w-full">
            <h2 className="text-md lg:text-xl p-2 my-2 capitalize bg-[color:var(--primary-color-light)] w-full">
              {categories.categories.find((category) => category._id === query)?.categoryName
              }
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-5"
            >
              {products.products.filter(product => product.categoryId === query).map(productInfo => (
                <div key={productInfo._id}>
                  <Product {...productInfo} />
                </div>
              ))}
            </div>
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

export default Category;