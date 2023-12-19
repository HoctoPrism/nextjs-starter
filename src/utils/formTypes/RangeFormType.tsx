import { FormControl, Slider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

function RangeFormType(props: {
  inputName: string,
  handleRangeChange: (rating: number[]) => void,
  defaultValue: number[] | string
  size: 'small' | 'medium'
  color?: 'primary' | 'secondary'
  sx?: object
}) {

  const { inputName, handleRangeChange, defaultValue, size, color, sx } = props;
  const [value, setValue] = useState<number[] | string >(defaultValue);

  function setValueAndRefreshToParent(e: Event) {
    setValue(e?.target?.value);
    handleRangeChange(e?.target?.value);
  }

  useEffect(() => {
    if (typeof defaultValue === 'string') {
      setValue(JSON.parse(defaultValue));
    }
  }, [defaultValue]);

  return <FormControl>
    <Typography gutterBottom>{inputName}</Typography>
    <Slider
      value={value}
      getAriaLabel={() => inputName}
      valueLabelDisplay="auto"
      size={size}
      onChange={(e) => setValueAndRefreshToParent(e)}
      style={{ width: 400 }}
      color={color}
      sx={sx}
    />
  </FormControl>;
}

export default RangeFormType;
