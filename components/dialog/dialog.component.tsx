import { FC, MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./dialog.module.scss";

interface DialogProps {
  actions?: JSX.Element;
  dismissible?: boolean;
  id?: string;
  onChange?: (value: boolean) => void;
  persistent?: boolean;
  value?: boolean;
}

const Dialog: FC<DialogProps> = ({ children, ...props }) => {
  if (!props.value) return null;

  function closeDialog(): void {
    props.onChange?.(!props.value);
  }

  return (
    <div className={styles["Dialog"]}>
      <div className={styles["Dialog-container"]}>
        <button
          aria-label="Close Bottom Sheet"
          className={styles["Dialog-close"]}
          onClick={closeDialog}
        >
          <FontAwesomeIcon icon="times" />
        </button>

        <div className={styles["Dialog-content"]}>{children}</div>

        {props.actions}
      </div>
    </div>
  );
};

Dialog.defaultProps = {
  actions: undefined,
  dismissible: false,
  id: "",
  onChange: undefined,
  persistent: false,
  value: false,
};

export default Dialog;
