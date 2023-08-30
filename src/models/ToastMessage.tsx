import { AlertColor } from '@mui/material';

class ToastMessage {
  message: string;

  severity: AlertColor;

  constructor(message: string, severity: AlertColor) {
    this.message = message;
    this.severity = severity;
  }
}

export default ToastMessage;
