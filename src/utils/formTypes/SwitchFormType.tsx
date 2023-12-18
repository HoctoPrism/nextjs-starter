import { FormControl, Alert, Switch, FormControlLabel } from '@mui/material';
import { Controller, Control, FieldErrors, UseFormRegister } from 'react-hook-form';

function SwitchFormType(props: {
  inputName: string,
  config?: object,
  handleSwitchChange: (active: boolean) => void,
  control: Control<{ name: string; }>,
  errors: FieldErrors<{ name: string; }>,
  register: UseFormRegister<{ name: string; }>
  defaultValue?: string
}) {

  const { inputName, config, handleSwitchChange, control, errors, register, defaultValue } = props;

  function setValueAndRefreshToParent(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    handleSwitchChange(e.target.value === 'on');
  }

  return <FormControl>
    <Controller
      name={inputName as unknown as 'name'}
      control={control}
      render={() => (
        <FormControlLabel control={
          <Switch
            {...register(inputName as unknown as 'name', config)}
            onChange={(e) => setValueAndRefreshToParent(e)}
            defaultValue={defaultValue}
          />
        } label={inputName}
        />
      )}
    />
    {errors.name ? (
      <Alert sx={{ mt:2, p:0, pl:2 }} severity="error">{errors.name?.message}</Alert>
    ) : ''}
  </FormControl>;
}

export default SwitchFormType;
