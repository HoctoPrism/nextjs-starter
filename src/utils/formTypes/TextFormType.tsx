import { FormControl, TextField, Alert } from '@mui/material';
import { Controller, Control, FieldErrors, UseFormRegister } from 'react-hook-form';

function TextFormType(props: {
  inputName: 'name',
  config : object,
  handleNameChange: (name: string) => void,
  control : Control<{ name: string; }>,
  errors: FieldErrors<{ name: string; }>,
  register: UseFormRegister<{ name: string; }>
  defaultValue?: string
}) {

  const { inputName, config, handleNameChange, control, errors, register, defaultValue } = props;

  function setValueAndRefreshToParent(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    handleNameChange(e.target.value);
  }

  return <FormControl>
    <Controller
      name={inputName}
      control={control}
      render={() => (
        <TextField
          {...register(inputName, config)}
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
