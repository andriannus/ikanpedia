import { FC } from "react";

import styles from "./app-bar.module.scss";

const AppBar: FC<{}> = ({ children }) => {
  return <div className={styles.AppBar}>{children}</div>;
};

export default AppBar;
