import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function TimePickerFormType(props: {
  inputName: string,
  handleDateChange: (dateValue: Date) => void,
  defaultValue?: Date | undefined
}) {

  const { inputName, handleDateChange, defaultValue } = props;

  function setValueAndRefreshToParent(e: Dayjs | null) {
    handleDateChange(dayjs(e).toDate());
  }

  return <LocalizationProvider dateAdapter={AdapterDayjs}>
    <TimePicker
      label={inputName}
      defaultValue={dayjs(defaultValue)}
      onChange={(e) => setValueAndRefreshToParent(e)}
    />
  </LocalizationProvider>;
}

export default TimePickerFormType;
