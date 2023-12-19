import { FormControl, Slider, Typography } from '@mui/material';

function SliderFormType(props: {
  inputName: string,
  handleSliderChange: (rating: number) => void,
  defaultValue?: number
  size: 'small' | 'medium'
  min?: number,
  max?: number,
  step?: number,
  color?: 'primary' | 'secondary'
  sx?: object
}) {

  const { inputName, handleSliderChange, defaultValue, size, min, max, step, color, sx } = props;

  function setValueAndRefreshToParent(e: Event) {
    const target = e.target as HTMLInputElement;
    handleSliderChange(Number(target?.value));
  }

  return <FormControl>
    <Typography>{inputName}</Typography>
    <Slider
      defaultValue={defaultValue}
      aria-label={inputName}
      valueLabelDisplay="auto"
      size={size}
      onChange={(e) => setValueAndRefreshToParent(e)}
      min={min}
      max={max}
      step={step}
      color={color}
      sx={sx}
    />
  </FormControl>;
}

export default SliderFormType;
