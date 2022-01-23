import { FC } from "react";

import { Chip } from "@/components/chip";
import { Dialog } from "@/components/dialog";

interface FilterSizeProps {
  onChange?: (value: boolean) => void;
  onSelect?: (value: string) => void;
  selected?: string;
  sizes?: string[];
  value?: boolean;
}

const FilterSize: FC<FilterSizeProps> = ({ children, ...props }) => {
  function selectSize(size: string): void {
    props.onChange?.(false);
    props.onSelect?.(size);
  }

  return (
    <Dialog value={props.value} dismissible onChange={props.onChange}>
      <p className="mb-bs text-base text-gray-900">Pilih Ukuran</p>

      {props.sizes?.map((size, index) => {
        return (
          <Chip
            key={`size-${index}`}
            active={props.selected === size}
            button
            className="mb-xs mr-xs"
            onClick={() => selectSize(size)}
          >
            {size}
          </Chip>
        );
      })}
    </Dialog>
  );
};

FilterSize.defaultProps = {
  onChange: undefined,
  onSelect: undefined,
  selected: "",
  sizes: [],
  value: false,
};

export default FilterSize;
