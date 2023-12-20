import { Autocomplete, FormControl, TextField } from '@mui/material';
import { useState, useEffect } from 'react';

function AutocompleteFormType(props: {
  inputName: string,
  handleAutoCompleteChange: (autocomplete: string | undefined) => void,
  defaultValue?: string
  color?: 'primary' | 'secondary'
  sx?: object
  freeSolo?: boolean
}) {

  const options = ['Option 1', 'Option 2'];
  const { inputName, handleAutoCompleteChange, defaultValue, color, sx, freeSolo } = props;
  const [value, setValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setValue(defaultValue ?? null);
  }, [defaultValue]);

  function setValueAndRefreshToParent(newValue: string | null) {
    setValue(newValue);
    handleAutoCompleteChange(newValue as string);
  }

  return <FormControl>
    <Autocomplete
      value={value}
      onChange={(e, newValue: string | null) => {setValueAndRefreshToParent(newValue);}}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => { setInputValue(newInputValue); }}
      id={'controllable-states-' + inputName}
      options={options.map((option) => option)}
      sx={sx}
      color={color}
      freeSolo={freeSolo}
      defaultValue={defaultValue}
      renderInput={(params) => <TextField {...params} label={inputName} />}
    />
  </FormControl>;
}

export default AutocompleteFormType;
