import classNames from "classnames";
import Link from "next/link";
import { FC, MouseEventHandler } from "react";

import styles from "./button.module.scss";

interface ButtonProps {
  color?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  id?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  outlined?: boolean;
  rounded?: boolean;
  small?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  const buttonClasses = classNames([
    {
      [styles[`Button--${props.color}`]]: !!props.color,
      [styles["Button--fullWidth"]]: props.fullWidth,
      [styles["Button--outlined"]]: props.outlined,
      [styles["Button--rounded"]]: props.rounded,
      [styles["Button--small"]]: props.small,
    },
    styles["Button"],
  ]);

  if (props.href) {
    return (
      <Link href={props.href}>
        <a className={buttonClasses}>{children}</a>
      </Link>
    );
  }

  return (
    <button
      id={props.id}
      className={buttonClasses}
      disabled={props.disabled}
      type={props.type}
      onClick={props.onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  color: "",
  disabled: false,
  fullWidth: false,
  href: "",
  id: "",
  onClick: () => {},
  outlined: false,
  rounded: false,
  small: false,
  type: "button",
};

export default Button;
