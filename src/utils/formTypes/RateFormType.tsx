import { FormControl, Rating } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

function RateFormType(props: {
  inputName: string,
  config?: object,
  handleRateChange: (rating: number) => void,
  defaultValue: number
  precision: number
}) {

  const { control } = useForm();
  const { inputName, handleRateChange, defaultValue, precision } = props;

  function setValueAndRefreshToParent(e: React.ChangeEvent<HTMLInputElement>) {
    handleRateChange(Number(e.target.value));
  }

  return <FormControl>
    <Controller
      name={inputName as unknown as 'name'}
      control={control}
      render={() => (
        <Rating
          onChange={(e) => setValueAndRefreshToParent(e)}
          defaultValue={defaultValue}
          precision={precision}
        />
      )}
    />
  </FormControl>;
}

export default RateFormType;
