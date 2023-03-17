import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Alex_Brush } from "@next/font/google";
import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown, MdPersonOutline, MdOutlineShoppingCart } from "react-icons/md";
// import { navItems, socials } from "../utils/Functions";

const alex_brush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
});

export const navItems = [
  { name: "home", url: "/", id: "1" },
  { name: "about", url: "/about", id: "2" },
  { name: "skills", url: "/skills", id: "3" },
  { name: "projects", url: "/projects", id: "4" },
  { name: "contact", url: "/contact", id: "5" },
];


const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navBg, setNavBg] = useState("#fffefd");
  // const [linkColor, setLinkColor] = useState("#311a02");
  const [logoColor, setLogoColor] = useState("#311a02");

  const router = useRouter();

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    if (shadow) {
      setNavBg("#fffefd");
      // setLinkColor("#001a1a");
      // setLogoColor("#008080")
    } else {
      setNavBg("transparent");
      // setLinkColor("#f8f8f8");
      // setLogoColor("#f8f8f8");
    }
  }, [router, shadow]);

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        // console.log("true");
        setShadow(true);
      } else {
        // console.log("false");
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
          ? "sticky top-0 w-full h-20 shadow-xl z-[100] flex justify-center items-center"
          : "sticky top-0 w-full h-20 z-[100] flex justify-center items-center text-[#fffefd]"
      }
    >
      <div className="flex justify-between items-center w-full max-w-[1240px] h-full px-5 text-[#311a02] font-semibold">
        <Link href="/" className={`${alex_brush.className} text-xl font-bold hover:text-[#f68b1e]`}
          // style={{ color: logoColor }} 
          aria-label="Go to home page">
          FemaleSuave
        </Link>
        <div>
          <ul className="hidden md:flex">
              <li className="text-bold uppercase hover:text-[#f68b1e]">
                <div className="flex justify-around items-center gap-1 bg-gray-200 py-2 px-4 rounded-sm">
                  <MdPersonOutline />
                  <p>Account</p>
                  <MdKeyboardArrowDown />
                </div>
              </li>
              <li className="ml-5 text-bold uppercase hover:text-[#f68b1e]">
                <div className="flex justify-around items-center gap-1 py-2 rounded-sm">
                  <MdOutlineShoppingCart />
                  <p>Cart</p>
                </div>
              </li>
          </ul>
          <div onClick={handleNav} className="md:hidden">
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={
          nav ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        <div
          className={
            nav
              ? "md:hidden fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-5 ease-in duration-500"
              : "fixed left-[-120%] top-0 p-5 ease-in duration-500"
          }
        >
          <div>
            <div className="flex justify-between items-center w-full">
              <Link href="/" className={`${alex_brush.className} text-xl font-bold text-[#008080]`} aria-label="Go to home page">
                ChiDev
              </Link>
              <div
                onClick={handleNav}
                className="rounded-full shadow-lg shadow-gray-400 p-2 cursor-pointer"
              >
                <AiOutlineClose size={20} />
              </div>
            </div>
            <div className="border-b border-gray-300 my-4">
              <p className="w-[85%] md:w-[90%] py-4 text-base text-[#001a1a]">
                Let&apos;s build something legendary together.
              </p>
            </div>
          </div>

          <div className="py-4 flex flex-col text-left">
            <ul>
              {/* {navItems.map((navItem) => (
                <li
                  onClick={() => setNav(false)}
                  className="text-sm uppercase py-3"
                  key={navItem.id}
                >
                  <Link href={`/#${navItem.name}`} className="w-full" aria-label={`Go to ${navItem.name} section`}>
                    {navItem.name}
                  </Link>
                </li>
              ))} */}
            </ul>
            <div className="pt-40">
              <p className="uppercase tracking-widest text-[#008080]">
                Let&apos;s connect
              </p>
              <div className="flex justify-between items-center my-4 w-full sm:w-[80%]">
                {/* {socials.map((social) => (
                  <div
                    className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300"
                    key={social.id}
                  >
                    <Link href={social.url} target="_blank" aria-label={`Let's connect on ${social.name}`}>
                      {social.icon}
                    </Link>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;