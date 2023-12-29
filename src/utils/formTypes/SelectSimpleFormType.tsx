import { FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from '@mui/material';
import { useState } from 'react';

function SelectSimpleFormType(props: {
  inputName: string,
  handleSelectSimpleChange: (name: string) => void,
  defaultValue?: string,
  sx?: object,
  color?: 'primary' | 'secondary'
  variant?: 'standard' | 'filled' | 'outlined'
}) {

  const { inputName, handleSelectSimpleChange, defaultValue, sx, color, variant } = props;
  const [example, setExample] = useState<string | undefined>(defaultValue ?? '');

  const data = ['a', 'b', 'c'];

  function setValueAndRefreshToParent(e: SelectChangeEvent) {
    setExample(e.target.value);
    handleSelectSimpleChange(e.target.value);
  }

  return <FormControl variant={variant} sx={sx}>
    <InputLabel id={{ inputName } + '-simple-select-label'}>{inputName}</InputLabel>
    <Select
      labelId={{ inputName } + '-simple-select-label'}
      id={{ inputName } + '-simple-select'}
      value={example}
      onChange={(e) => setValueAndRefreshToParent(e)}
      label={inputName}
      color={color}
    >
      {data.map((item, index) => {
        return <MenuItem value={item} key={index}>{item}</MenuItem>;
      })}
    </Select>
  </FormControl>;
}

export default SelectSimpleFormType;
