import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

function DatePickerFormType(props: {
  inputName: string,
  handleDateChange: (dateValue: Date) => void,
  defaultValue?: Date | undefined
  sx?: object
}) {

  const { inputName, handleDateChange, defaultValue, sx } = props;

  function setValueAndRefreshToParent(e: Dayjs | null) {
    handleDateChange(dayjs(e).toDate());
  }

  return <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      label={inputName}
      defaultValue={dayjs(defaultValue)}
      onChange={(e) => setValueAndRefreshToParent(e)}
      sx={sx}
    />
  </LocalizationProvider>;
}

export default DatePickerFormType;
