import { FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from '@mui/material';
import { useState } from 'react';

function MultiSelectFormType(props: {
  inputName: string,
  handleMultiSelectChange: (name: string[]) => void,
  defaultValues?: string[],
  sx?: object,
  color?: 'primary' | 'secondary'
  variant?: 'standard' | 'filled' | 'outlined'
}) {

  const { inputName, handleMultiSelectChange, defaultValues, sx, color, variant } = props;
  const [selectedOptions, setSelectedOptions] = useState<string[] | undefined>(
    Array.isArray(defaultValues)
      ? defaultValues
      : defaultValues
        ? JSON.parse(defaultValues as unknown as string)
        : [],
  );

  const data = ['a', 'b', 'c'];

  function setValueAndRefreshToParent(e: SelectChangeEvent<typeof selectedOptions>) {
    setSelectedOptions(e.target.value as string[]);
    handleMultiSelectChange(e.target.value as string[]);
  }

  return <FormControl variant={variant} sx={sx}>
    <InputLabel id={{ inputName } + '-multi-select-label'}>{inputName}</InputLabel>
    <Select
      labelId={{ inputName } + '-multi-select-label'}
      id={{ inputName } + '-multi-select'}
      multiple
      value={selectedOptions}
      onChange={(e) => setValueAndRefreshToParent(e)}
      label={inputName}
      color={color}
      renderValue={(selected) => (Array.isArray(selected) ? selected.join(', ') : selected)}
    >
      {data.map((item, index) => {
        return <MenuItem key={index} value={item}>
          {item}
        </MenuItem>;
      })}
    </Select>
  </FormControl>;
}

export default MultiSelectFormType;
