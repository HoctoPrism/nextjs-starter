import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import { useState } from 'react';

function CheckboxFormType(props: {
  inputName: string,
  handleCheckboxChange: (checkboxValue: string) => void,
  defaultValue?: undefined | string,
  sx?: object
  color?: 'primary' | 'secondary'
}) {

  const { inputName, handleCheckboxChange, defaultValue, sx, color } = props;
  const [value, setValue] = useState(JSON.parse(defaultValue as string));

  function setValueAndRefreshToParent(e: React.ChangeEvent<HTMLInputElement>) {
    setValue({ ...value, [e.target.value]: e.target.checked });
    handleCheckboxChange({ ...value, [e.target.value]: e.target.checked });
  }

  const fakeData = ['titi', 'toto', 'tata'];

  return <FormControl>
    <FormLabel id={inputName}>{inputName}</FormLabel>
    <FormGroup>
      {fakeData.map((item, index) => {
        return <FormControlLabel
          key={index}
          control={
            <Checkbox
              defaultChecked={JSON.parse(defaultValue as string)[item]}
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
