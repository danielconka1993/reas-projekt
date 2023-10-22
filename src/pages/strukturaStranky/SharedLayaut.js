import { Outlet } from "react-router-dom";
import "./css/SharedLayaut.css";
import Header from "./Header";
import Footer from "./Footer";

const SharedLayaut = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default SharedLayaut;
