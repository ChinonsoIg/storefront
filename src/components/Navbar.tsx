import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Alex_Brush } from "@next/font/google";
import React, { useState, useEffect } from "react";
import { BsPersonCheck } from "react-icons/bs";
import { MdKeyboardArrowDown, MdPersonOutline, MdOutlineShoppingCart, MdSearch, MdMenu, MdClose } from "react-icons/md";

const alex_brush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
});

interface ISearch {
  searchTerm: string;
  setSearchTerm: (search: string) => void;
}

interface ICategory {
  categoryName: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  _id: string;
}

interface INavbar {
  categories: {
    categories: Array<ICategory>;
    count: number;
  }
}


const Navbar = ({ searchTerm, setSearchTerm }: ISearch, { categories }: INavbar) => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navBg, setNavBg] = useState("#fffefd");

  const router = useRouter();

  // console.log("cate: ", categories)

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    if (shadow) {
      setNavBg("#fffefd");
    } else {
      setNavBg("transparent");
    }
  }, [router, shadow]);

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 80) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };

    window.addEventListener("scroll", handleShadow);
  }, []);

  return (
    <div
      style={{ backgroundColor: `${navBg}` }}
      className={
        shadow
          ? "fixed top-0 w-full h-12 lg:h-20 shadow-xl z-[100] flex justify-center items-center"
          : "sticky top-0 py-5 w-full h-12 lg:h-20 z-[100] flex justify-center items-center text-[#fffefd]"
      }
    >
      <div className="flex justify-between items-center gap-8 w-full max-w-[1240px] h-full px-5 text-[color:var(--primary-color-dark)] font-semibold">
        <div className="flex gap-4 items-center">
        <div onClick={handleNav} className="lg:hidden">
          <MdMenu size={22} color="#311a02" />
        </div>
        <div className="flex-none">
          <Link href="/" className={`${alex_brush.className} text-xl font-bold 
        hover:text-[color:var(--primary-color)]`}
            aria-label="Go to home page">
            FemaleSuave
          </Link>
        </div>
        </div>

        <div className="w-full max-[1184px]: flex justify-end lg:justify-around items-center grow gap-4 lg:gap-5">
          <div className="flex items-center justify-end gap-4 lg:hidden">
            <div>
              <MdSearch size={22} color="#311a02" />
            </div>
            <div>
              <MdPersonOutline size={22} color="#311a02" />
            </div>
            <div onClick={handleNav}>
              <MdOutlineShoppingCart size={22} color="#311a02" />
            </div>
          </div>

          <form className="hidden lg:flex justify-between items-center gap-2 w-full">
            <input
              value={searchTerm}
              onChange={({ target }) => setSearchTerm(target.value)}
              type="text"
              placeholder="Search for products..."
              className="bg-gray-200 w-full py-2 px-4 rounded-md text-gray-500 font-normal border-none focus:border-none outline-none focus:outline-orange-600 outline-1"
            />
            <button className="w-max h-full p-2 rounded-md shadow-lg font-normal">Search</button>
          </form>

          <ul className="hidden lg:flex gap-5 items-center">
            <li className="text-bold uppercase hover:text-[color:var(--primary-color)]">
              <div className="hidden lg:flex justify-around items-center gap-1 bg-gray-200 py-2 px-4 rounded-md">
                <MdPersonOutline />
                <p>Account</p>
                <MdKeyboardArrowDown />
              </div>
              <div className="block lg:hidden">
                <MdPersonOutline size={20} />
              </div>
            </li>
            <li className="text-bold uppercase hover:text-[color:var(--primary-color)]">
              <div className="hidden lg:flex justify-around items-center gap-1 py-2">
                <MdOutlineShoppingCart />
                <p>Cart</p>
              </div>
              <div className="block lg:hidden">
                <MdOutlineShoppingCart size={20} />
              </div>
            </li>
          </ul>

        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={
          nav ? "lg:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        <div
          className={
            nav
              ? "lg:hidden fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-5 ease-in duration-500"
              : "fixed left-[-120%] top-0 p-5 ease-in duration-500"
          }
        >
          <div>
            <div className="flex justify-between items-center w-full">
              <Link href="/" className={`${alex_brush.className} text-xl font-bold text-[color:var(--primary-color-dark)]`} aria-label="Go to home page">
                FemaleSuave
              </Link>
              <div
                onClick={handleNav}
                className="rounded-full shadow-lg shadow-gray-400 p-2 cursor-pointer"
              >
                <MdClose size={20} color="#311a02" />
              </div>
            </div>

            <nav className="border-b border-gray-300 my-4">
              {/* <p className="w-[85%] md:w-[90%] py-4 text-base text-[#001a1a]">
                Let&apos;s build something legendary together.
              </p> */}

              {/* <aside className="hidden lg:block absolute top-4 left-0 w-48 h-96 px-4 py-2 shadow-md rounded-md border bg-white"> */}

              <ul className="w-[85%] md:w-[90%] py-2 text-[#000]">
                {/* {categories && categories.categories.map((category) => ( */}
                <li key={"category._id"} className="capitalize py-1">
                  {"category 1"}
                </li>
                {/* ))} */}
              </ul>

            </nav>
          </div>

          <div className="py-4 flex flex-col text-left">
            <div className="pt-40">
              <p className="uppercase tracking-widest text-[color:var(--primary-color)]">
                Need help? Contact us.
              </p>
              <div className="flex justify-between items-center my-4 w-full sm:w-[80%]">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Navbar;