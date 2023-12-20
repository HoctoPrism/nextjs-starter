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
  const [value, setValue] = useState<string[]>(defaultValue ? JSON.parse(defaultValue as unknown as string) : []);

  const fakeData = ['titi', 'toto', 'tata'];

  function setValueAndRefreshToParent(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked && !value.includes(e.target.value)) {
      // If checkbox is checked, add its value to array
      setValue([...value, e.target.value]);
      handleCheckboxChange([...value, e.target.value]);
    } else {
      // If checkbox is unchecked, remove its value from array
      setValue(value?.filter((item) => item !== e.target.value));
      handleCheckboxChange(value?.filter((item) => item !== e.target.value));
    }
  }

  return <FormControl>
    <FormLabel id={inputName}>{inputName}</FormLabel>
    <FormGroup>
      {fakeData.map((item, index) => {
        return <FormControlLabel
          key={index}
          control={
            <Checkbox
              defaultChecked={defaultValue ? defaultValue.includes(item) : false}
              onChange={(e) => setValueAndRefreshToParent(e)}
              value={item} sx={sx} color={color}
            />
          }
          label={item} />;
      })}
    </FormGroup>
  </FormControl>;
}

export default CheckboxFormType;
