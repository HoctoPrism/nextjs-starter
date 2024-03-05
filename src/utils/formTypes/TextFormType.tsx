import { FormControl, TextField, Alert } from '@mui/material';
import { Controller, FieldErrors, UseFormRegister, useForm } from 'react-hook-form';

function TextFormType(props: {
  inputName: string,
  config : object,
  handleValueChange: (name: string) => void,
  errors: FieldErrors,
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

  const errorMessage = errors[inputName] ? errors[inputName]?.message : null;

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
    {errorMessage ? (
      <Alert sx={{ mt:2, p:0, pl:2 }} severity="error">{errorMessage as string}</Alert>
    ) : ''}
  </FormControl>;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default TextFormType;
