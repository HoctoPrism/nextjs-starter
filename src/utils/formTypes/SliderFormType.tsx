import { FormControl, Slider } from '@mui/material';

function SliderFormType(props: {
  inputName: string,
  handleSliderChange: (rating: number) => void,
  defaultValue?: number
  size: 'small' | 'medium'
  min?: number,
  max?: number,
  step?: number,
}) {

  const { inputName, handleSliderChange, defaultValue, size, min, max, step } = props;

  function setValueAndRefreshToParent(e: Event) {
    handleSliderChange(e?.target?.value);
  }

  return <FormControl>
    <Slider
      defaultValue={defaultValue}
      aria-label={inputName}
      valueLabelDisplay="auto"
      size={size}
      onChange={(e) => setValueAndRefreshToParent(e)}
      min={min}
      max={max}
      step={step}
      style={{ width: 400 }}
    />
  </FormControl>;
}

export default SliderFormType;
