import classNames from "classnames";
import Link from "next/link";
import { FC, MouseEventHandler } from "react";

import styles from "./button.module.scss";

interface ButtonProps {
  color?: "" | "primary" | "success";
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  id?: string;
  loading?: boolean;
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
      [styles["Button--loading"]]: props.loading,
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
      {!props.loading ? (
        children
      ) : (
        <div className={styles["Loading"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </button>
  );
};

Button.defaultProps = {
  color: "",
  disabled: false,
  fullWidth: false,
  href: "",
  id: "",
  loading: false,
  onClick: () => {},
  outlined: false,
  rounded: false,
  small: false,
  type: "button",
};

export default Button;
