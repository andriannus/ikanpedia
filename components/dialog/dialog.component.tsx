import { FC, MouseEventHandler, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useClip } from "@/hooks/clip";

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
  const { clipHtml, removeClipHtml } = useClip();

  useEffect(() => {
    props.value ? clipHtml() : removeClipHtml();
  }, [props.value]);

  function closeDialog(): void {
    props.onChange?.(!props.value);
  }

  if (!props.value) return null;

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
