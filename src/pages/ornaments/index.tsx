import React from "react";
import Image from "next/image";
import Layout from "@/components/Layout";

import advert_trainer from "/public/images/advert_trainer.png";
import advert_top_purple from "/public/images/advert_top_purple.png";
import advert_apple_watch from "/public/images/advert_apple_watch.png";

const Ornaments = () => {
  return (
    <Layout>
      <div className="relative flex items-start gap-2">
        <nav className="hidden lg:block fixed top-24 w-48 h-96 px-4 py-2 shadow-md rounded-md border bg-white">
          <ul className="py-2">
            {/* {categories.categories.map((category) => (
              <li key={category._id} className="capitalize py-1.5">
                <Link href={{ 
                  pathname: `/${category.categoryName}`, 
                  // query: { categoryId: category._id } 
                }}>
                  {category.categoryName}
                </Link>
              </li>
            ))} */}
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
              {/* <Image
                loader={myLoader}
                src={advert_trainer}
                height={100}
                width={100}
                alt="l"
              /> */}
            </div>
            <div className="absolute bottom-[25%] right-[4%] z-10">
              {/* <Image
                loader={myLoader}
                src={advert_apple_watch}
                height={100}
                width={100}
                alt="l"
              /> */}
            </div>
            <div className="absolute top-[3%] left-[5%] z-10">
              {/* <Image
                loader={myLoader}
                src={advert_top_purple}
                height={100}
                width={100}
                alt="l"
              /> */}
            </div>
            
            <div className="absolute z-0 h-96 w-full advert-table bg-purple-700 rounded-md">
            </div>
          </section>
          <section className="my-8 w-full"> section
            {/* {categories.categories.map(category => (
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
            ))} */}
          </section>
        </main>
      </div>

    </Layout>
  )
}

export default Ornaments