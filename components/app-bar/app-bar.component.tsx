import { FC } from "react";

import styles from "./app-bar.module.scss";

const AppBar: FC<{}> = () => {
  return (
    <div className={styles.AppBar}>
      <span className={styles["AppBar-brand"]}>Ikanpedia</span>
    </div>
  );
};

export default AppBar;
