import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

function RadioPickerFormType(props: {
  inputName: string,
  handleRadioChange: (radioValue: string) => void,
  defaultValue?: string | undefined,
  sx?: object
  color?: 'primary' | 'secondary'
}) {

  const { inputName, handleRadioChange, defaultValue, sx, color } = props;

  function setValueAndRefreshToParent(e: React.ChangeEvent<HTMLInputElement>) {
    handleRadioChange(e.target.value);
  }

  const fakeData = ['titi', 'toto', 'tata'];

  return <FormControl>
    <FormLabel id={inputName}>{inputName}</FormLabel>
    <RadioGroup
      aria-labelledby={inputName}
      defaultValue={defaultValue}
      name={`radio-buttons-group-${inputName}`}
      onChange={(e) => setValueAndRefreshToParent(e)}
      sx={sx}
      color={color}
    >
      {fakeData.map((data, index) => {
        return <FormControlLabel key={index} value={data} control={<Radio />} label={data} />;
      })}
    </RadioGroup>
  </FormControl>;
}

export default RadioPickerFormType;
