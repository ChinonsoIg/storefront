import { ReactNode, FC, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface ILayout {
  children?: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
const [searchTerm, setSearchTerm] = useState("");

console.log("serch: ", searchTerm);

  return (
    <div className="grid place-items-center">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="max-w-[1240px] p-5">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;