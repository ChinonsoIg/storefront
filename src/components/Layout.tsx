import { ReactNode, FC } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface ILayout {
  children?: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {

  return (
    <div className="grid place-items-center">
      <Navbar />
      <div className="max-w-[1240px] p-5">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;