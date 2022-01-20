import { FC } from "react";

import styles from "./text-field.module.scss";

interface TextFieldProps {
  autoComplete?: string;
  autoCapitalize?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  type?: string;
  value?: string;
}

const TextField: FC<TextFieldProps> = ({ ...props }) => {
  return (
    <div className={props.className}>
      <input
        id={props.id}
        autoCapitalize={props.autoCapitalize}
        autoComplete={props.autoComplete}
        className={styles["TextField-input"]}
        disabled={props.disabled}
        name={props.name}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        title={props.placeholder}
        type={props.type}
      />
    </div>
  );
};

TextField.defaultProps = {
  autoCapitalize: "",
  autoComplete: "",
  className: "",
  disabled: false,
  id: "",
  name: "",
  placeholder: "",
  readOnly: false,
  type: "text",
  value: "",
};

export default TextField;
