import { FormControl, TextField, Alert } from '@mui/material';
import { Controller, FieldErrors, UseFormRegister, useForm } from 'react-hook-form';

function TextFormType(props: {
  inputName: string,
  config : object,
  handleValueChange: (name: string) => void,
  errors: FieldErrors<{ name: string; }>,
  register: UseFormRegister<{ name: string; }>
  defaultValue?: string,
  sx?: object,
  color?: 'primary' | 'secondary'
}) {

  const { control } = useForm();
  const { inputName, config, handleValueChange, errors, register, defaultValue, sx, color } = props;

  function setValueAndRefreshToParent(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    handleValueChange(e.target.value);
  }

  return <FormControl>
    <Controller
      name={inputName as unknown as 'name'}
      control={control}
      render={() => (
        <TextField
          {...register(inputName as unknown as 'name', config)}
          onChange={(e) => setValueAndRefreshToParent(e)}
          label={inputName}
          variant="standard"
          defaultValue={defaultValue}
          sx={sx}
          color={color}
        />
      )}
    />
    {errors.name ? (
      <Alert sx={{ mt:2, p:0, pl:2 }} severity="error">{errors.name?.message}</Alert>
    ) : ''}
  </FormControl>;
}

export default TextFormType;
