import React, { useState } from "react";
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
  const [activeImage, setActiveImage] = useState(product.product?.image[0]);
  const router = useRouter();
  // console.log("pr : ", product.product);

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
            <div className="flex items-center justify-center h-60">
              <Image
                loader={myLoader}
                src={activeImage}
                height={200}
                width={200}
                alt={product.product?.name}
              />
            </div>
            <div className="flex items-center my-5">
              {product.product.image.map((url, ind) => (
                <div
                  key={ind}
                  className={`w-12 mr-3 mb-3 ${activeImage === url && "border-2 border-[color:var(--primary-color)]"}`}
                  onClick={() => setActiveImage(url)} >
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
              <p>+ shipping from &quot;Seller address&quot;</p>
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

      <section className="grid grid-cols-1 lg:grid-cols-4 grid-rows-1 lg:grid-rows-1  lg:gap-x-8 gap-y-4 my-5 grid-content relative">
        <div className="col-span-3 grid grid-col-1 grid-row-3 gap-5">
          <div className="rounded-md bg-[color:var(--white)] py-3 shadow-md">
            <h5 className="border-b-2 border-gray-100 pb-1 px-5 mb-2">Product description</h5>
            <p className="px-5">
              {product.product.description}<br />
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
            </p>
          </div>

          <div className="rounded-md bg-[color:var(--white)] py-3 shadow-md">
            <h5 className="border-b-2 border-gray-100 pb-1 px-5 mb-2">Specifications</h5>
            <p className="px-5">
              {"Product specification"}
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.<br />
              The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.<br />
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </p>
          </div>
          <div className="rounded-md bg-[color:var(--white)] py-3 shadow-md">
            <h5 className="border-b-2 border-gray-100 pb-1 px-5 mb-2">Customer feedback</h5>
            <p className="px-5">
              {"comments on ratings"}
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). <br />
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
            </p>
          </div>
        </div>

        <aside className="hidden lg:grid h-min rounded-md bg-[color:var(--white)] px-0 py-0 shadow-md gap-0.5 sticky top-24">
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

      <section className="my-10">
        <h3>Recently viewed products</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-5 mt-1"
        >
          {/* TODO: Recently viewed*/}
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