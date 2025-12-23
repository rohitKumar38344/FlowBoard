import type { ReactNode } from "react";
import style from "./Layout.module.css";

export const Layout = ({ children }: { children: ReactNode }) => {
  return <div className={style.container}>{children}</div>;
};
