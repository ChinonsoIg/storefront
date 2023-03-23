import React from "react";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import { addComma } from "utils/functions";
import { useRouter } from "next/router";

const Cart = () => {
  const router = useRouter();

  const {
    status,
    data: session
  } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin")
    },
  });
  // console.log("stat: ", status)
  // console.log("da: ", session)

  return (
    <Layout>
      <div className="grid lg:grid-cols-5 xl:grid-cols-4 gap-5">
        <section className="bg-white rounded-md shadow-md lg:col-span-3 xl:col-span-3">
          <h3 className="lg:text-xl font-semibold py-4 px-2 border-b-2 border-gray-100">Cart ({0})</h3>
          <div className="p-2">
            Cart items
          </div>
        </section>
        <section className="bg-white rounded-md shadow-md lg:col-span-2 xl:col-span-1">
          <h3 className="uppercase lg:text-xl px-2 py-3 font-semibold border-b-2 border-gray-100">Cart Summary</h3>
          <div className="flex justify-between items-center px-2 py-3 border-b-2 border-gray-100">
            <p className="font-semibold lg:text-lg">Subtotal</p>
            <p className="font-bold md:text-xl lg:text-2xl">₦ {addComma(1247582)}</p>
          </div>
          <div className="m-2">
            <button className="uppercase flex justify-center font-bold lg:text-lg py-3 tracking-wider">Checkout (₦ {addComma(1247582)})</button>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Cart;