import { FormControl, Alert, Switch, FormControlLabel } from '@mui/material';
import { Controller, FieldErrors, UseFormRegister, useForm } from 'react-hook-form';
import { useState } from 'react';

function SwitchFormType(props: {
  inputName: string,
  config?: object,
  handleSwitchChange: (active: boolean) => void,
  errors: FieldErrors<{ name: string; }>,
  register: UseFormRegister<{ name: string; }>
  defaultValue?: boolean,
  color?: 'primary' | 'secondary',
  sx?: object
}) {

  const { control } = useForm();
  const { inputName, config, handleSwitchChange, errors, register, defaultValue, color, sx } = props;
  const [switchValue, setSwitchValue] = useState(Boolean(defaultValue) ?? false);

  function setValueAndRefreshToParent(e: React.ChangeEvent<HTMLInputElement>) {
    setSwitchValue(e.target.checked);
    handleSwitchChange(e.target.checked);
  }

  const defaultValueSwitch = defaultValue ? 'on' : 'off';

  return <FormControl>
    <Controller
      name={inputName as unknown as 'name'}
      control={control}
      render={() => (
        <FormControlLabel control={
          <Switch
            {...register(inputName as unknown as 'name', config)}
            onChange={(e) => setValueAndRefreshToParent(e)}
            defaultValue={defaultValueSwitch}
            checked={switchValue}
            color={color}
            sx={sx}
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
