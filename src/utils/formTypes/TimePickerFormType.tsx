import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function TimePickerFormType(props: {
  inputName: string,
  handleDateChange: (dateValue: Date | undefined) => void,
  defaultValue?: Date | undefined,
  sx?: object
}) {

  const { inputName, handleDateChange, defaultValue, sx } = props;

  function setValueAndRefreshToParent(e: Dayjs | null) {
    handleDateChange(dayjs(e).toDate());
  }

  return <LocalizationProvider dateAdapter={AdapterDayjs}>
    <TimePicker
      label={inputName}
      defaultValue={dayjs(defaultValue)}
      onChange={(e) => setValueAndRefreshToParent(e)}
      sx={sx}
    />
  </LocalizationProvider>;
}

export default TimePickerFormType;
