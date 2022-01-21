import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./app-bar-back-button.module.scss";

interface AppBarBackButtonProps {
  clipped?: boolean;
  disabled?: boolean;
  onClose?: Function;
  replace?: boolean;
  href?: string;
}

const AppBarBackButton: FC<AppBarBackButtonProps> = ({
  children,
  ...props
}) => {
  const router = useRouter();

  function handleButtonClick(): void {
    if (props.clipped) {
      props.onClose?.();
      return;
    }

    router.back();
  }

  if (props.href) {
    return (
      <Link href={props.href} replace={props.replace}>
        <a
          id="BtnAppBarBack"
          aria-label="Back"
          className={styles["AppBar-backButton"]}
          role="button"
        >
          <FontAwesomeIcon icon="arrow-left" />
        </a>
      </Link>
    );
  }

  return (
    <button
      id="BtnAppBarBack"
      aria-label="Back"
      className={styles["AppBar-backButton"]}
      disabled={props.disabled}
      onClick={handleButtonClick}
    >
      <FontAwesomeIcon icon="arrow-left" />
    </button>
  );
};

AppBarBackButton.defaultProps = {
  clipped: false,
  disabled: false,
  href: "",
  onClose: () => {},
  replace: false,
};

export default AppBarBackButton;
