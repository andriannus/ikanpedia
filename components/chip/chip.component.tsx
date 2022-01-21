import classNames from "classnames";
import { FC, MouseEventHandler } from "react";

import styles from "./chip.module.scss";

interface ChipProps {
  active?: boolean;
  button?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
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
    props.className,
  ]);

  return (
    <span
      className={chipClasses}
      {...(props.active && { "aria-pressed": `${props.active}` })}
      {...(props.button && { role: "button" })}
      onClick={props.onClick}
    >
      {children}
    </span>
  );
};

Chip.defaultProps = {
  active: false,
  button: false,
  className: "",
  onClick: () => {},
  small: false,
};

export default Chip;
