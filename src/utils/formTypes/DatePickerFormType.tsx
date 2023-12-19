import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

function DatePickerFormType(props: {
  inputName: string,
  handleDateChange: (dateValue: Date) => void,
  defaultValue?: Date | undefined
}) {

  const { inputName, handleDateChange, defaultValue } = props;

  function setValueAndRefreshToParent(e: Dayjs | null) {
    handleDateChange(dayjs(e).toDate());
  }

  return <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      label={inputName}
      defaultValue={dayjs(defaultValue)}
      onChange={(e) => setValueAndRefreshToParent(e)}
    />
  </LocalizationProvider>;
}

export default DatePickerFormType;
