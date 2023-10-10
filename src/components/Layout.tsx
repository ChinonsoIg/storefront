import { ReactNode, FC, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface ILayout {
  children?: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
const [searchTerm, setSearchTerm] = useState("");


  return (
    <div className="flex flex-col items-center justify-start h-screen w-full max-w-[1240px]">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="w-full max-w-[1240px] px-5 pt-0">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;

export const getServerSideProps = async () => {
  // Fetch data from external API
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const resProducts = await fetch(`${BASE_URL}/products/storefront`);

  const resCategories = await fetch(`${BASE_URL}/categories`);

  const products = await resProducts.json();
  const categories = await resCategories.json();

  return { props: { products, categories } };
}