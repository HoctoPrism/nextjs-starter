import { FormControl, Rating } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

function RateFormType(props: {
  inputName: string,
  config?: object,
  handleRateChange: (rating: number) => void,
  defaultValue: number,
  precision: number,
  sx?: object,
  color?: 'primary' | 'secondary'
}) {

  const { control } = useForm();
  const { inputName, handleRateChange, defaultValue, precision, sx, color } = props;

  function setValueAndRefreshToParent(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    handleRateChange(Number(target?.value));
  }

  return <FormControl>
    <Controller
      name={inputName as unknown as 'name'}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Rating
          {...field}
          value={+field.value}
          onChange={(e) => {
            field.onChange(e);
            setValueAndRefreshToParent(e);
          }}
          precision={precision}
          sx={sx}
          color={color}
        />
      )}
    />
  </FormControl>;
}

export default RateFormType;
