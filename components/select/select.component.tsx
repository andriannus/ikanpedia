import { ChangeEventHandler, FC } from "react";

import styles from "./select.module.scss";

interface SelectProps {
  className?: string;
  id?: string;
  items?: string[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  placeholder?: string;
  value?: string | number;
}

const Select: FC<SelectProps> = ({ ...props }) => {
  return (
    <div className={`${styles["Select"]} ${props.className}`}>
      <select defaultValue="" value={props.value} onChange={props.onChange}>
        <option value="" disabled>
          {props.placeholder}
        </option>

        {props.items?.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

Select.defaultProps = {
  className: "",
  id: "",
  items: [],
  onChange: undefined,
  placeholder: "",
  value: "",
};

export default Select;
