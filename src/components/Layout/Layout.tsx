import { Board } from "../Board/Board";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import style from "./Layout.module.css";

export const Layout = () => {
  return (
    <div className={style.container}>
      <Header />
      <Sidebar />
      <Board />
      {/* <div>task area</div> */}
    </div>
  );
};
