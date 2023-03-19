import { ReactNode, FC, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface ILayout {
  children?: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
const [searchTerm, setSearchTerm] = useState("");

// console.log("serch: ", searchTerm);

  return (
    <div className="grid place-items-center">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="w-full max-w-[1240px] px-5 pt-0">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;