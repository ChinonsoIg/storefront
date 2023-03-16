import { ReactNode, FC } from "react";
import Footer from "./Footer";

interface ILayout {
  children?: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {

  return (
    <div>
      <div className="p-5">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;