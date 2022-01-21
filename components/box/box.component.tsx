import classNames from "classnames";
import { FC } from "react";

import styles from "./box.module.scss";

interface BoxProps {
  className?: string;
}

const Box: FC<BoxProps> = ({ children, ...props }) => {
  const boxClasses = classNames([styles.Box, props.className]);

  return <div className={boxClasses}>{children}</div>;
};

Box.defaultProps = {
  className: "",
};

export default Box;
