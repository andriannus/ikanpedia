import { FC } from "react";

import { Chip } from "@/components/chip";
import { Dialog } from "@/components/dialog";

interface FilterProvinceProps {
  onChange?: (value: boolean) => void;
  onSelect?: (value: string) => void;
  provinces?: string[];
  selected?: string;
  value?: boolean;
}

const FilterProvince: FC<FilterProvinceProps> = ({ children, ...props }) => {
  function selectProvince(province: string): void {
    props.onChange?.(false);
    props.onSelect?.(province);
  }

  return (
    <Dialog value={props.value} dismissible onChange={props.onChange}>
      <p className="mb-bs text-base text-gray-900">Pilih Provinsi</p>
      {props.provinces?.map((province, index) => {
        return (
          <Chip
            key={`province-${index}`}
            active={props.selected === province}
            button
            className="capitalize mb-xs mr-xs"
            onClick={() => selectProvince(province)}
          >
            {province.toLowerCase()}
          </Chip>
        );
      })}
    </Dialog>
  );
};

FilterProvince.defaultProps = {
  onChange: undefined,
  onSelect: undefined,
  provinces: [],
  selected: "",
  value: false,
};

export default FilterProvince;
