import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import { useState } from 'react';

function CheckboxFormType(props: {
  inputName: string,
  handleCheckboxChange: (checkbox: string[]) => void,
  defaultValue?: string[],
  sx?: object
  color?: 'primary' | 'secondary'
}) {
  const { inputName, handleCheckboxChange, defaultValue, sx, color } = props;
  const [value, setValue] = useState<string[] | undefined>(
    Array.isArray(defaultValue)
      ? defaultValue
      : defaultValue
        ? JSON.parse(defaultValue as unknown as string)
        : [],
  );
  const checkboxOptions = ['titi', 'toto', 'tata'];

  const setCheckboxValue = (newValue: string[]) => {
    setValue(newValue);
    handleCheckboxChange(newValue);
  };

  function setValueAndRefreshToParent(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked && value && !value.includes(e.target.value)) {
      setCheckboxValue([...value, e.target.value]);
    } else {
      setCheckboxValue(value?.filter((item) => item !== e.target.value) || []);
    }
  }

  return <FormControl>
    <FormLabel id={inputName}>{inputName}</FormLabel>
    <FormGroup>
      {checkboxOptions.map((item, index) => {
        return <FormControlLabel
          key={index}
          control={
            <Checkbox
              defaultChecked={defaultValue ? defaultValue.includes(item) : false}
              onChange={setValueAndRefreshToParent}
              value={item} sx={sx} color={color}
            />
          }
          label={item}/>;
      })}
    </FormGroup>
  </FormControl>;
}

export default CheckboxFormType;
