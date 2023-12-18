import { FormControl, TextField, Alert } from '@mui/material';
import { Controller, Control, FieldErrors, UseFormRegister } from 'react-hook-form';

function TextFormType(props: {
  inputName: string,
  config : object,
  handleValueChange: (name: string) => void,
  control : Control<{ name: string; }>,
  errors: FieldErrors<{ name: string; }>,
  register: UseFormRegister<{ name: string; }>
  defaultValue?: string
}) {

  const { inputName, config, handleValueChange, control, errors, register, defaultValue } = props;

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
          style={{ width: 400, height: 50 }}
          label={inputName}
          variant="standard"
          defaultValue={defaultValue}
        />
      )}
    />
    {errors.name ? (
      <Alert sx={{ mt:2, p:0, pl:2 }} severity="error">{errors.name?.message}</Alert>
    ) : ''}
  </FormControl>;
}

export default TextFormType;
