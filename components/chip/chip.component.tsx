import classNames from "classnames";
import { FC } from "react";

import styles from "./chip.module.scss";

interface ChipProps {
  active?: boolean;
  button?: boolean;
  small?: boolean;
}

const Chip: FC<ChipProps> = ({ children, ...props }) => {
  const chipClasses = classNames([
    {
      [styles["Chip--button"]]: props.button,
      [styles["Chip--small"]]: props.small,
      [styles["is-active"]]: props.active,
    },
    styles["Chip"],
  ]);

  return (
    <span
      className={chipClasses}
      {...(props.active && { "aria-pressed": `${props.active}` })}
      {...(props.button && { role: "button" })}
    >
      {children}
    </span>
  );
};

Chip.defaultProps = {
  active: false,
  button: false,
  small: false,
};

export default Chip;
