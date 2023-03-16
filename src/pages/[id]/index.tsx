import React from 'react'
import { useRouter } from "next/router";

const SingleProduct = () => {
  const router = useRouter();
  console.log("pr : ", router)

  return (
    <div>SingleProduct</div>
  )
}

export default SingleProduct