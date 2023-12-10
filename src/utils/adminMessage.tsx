import { Alert, Snackbar, AlertColor } from '@mui/material';
import { useEffect, useState } from 'react';

function AdminMessage(props: { adminMessage: string }) {
  const [toast, setShowToast] = useState(false);
  const [severityToast, setSeverityToast] = useState<AlertColor>();
  const [messageToast, setMessageToast] = useState('');

  const showMessage = (message: string, severity: AlertColor) => {
    setMessageToast(message);
    setSeverityToast(severity);
    setShowToast(true);
  };

  useEffect(() => {
    if (props.adminMessage === 'unauthorizedRole') {
      showMessage('accès refusé', 'error');
    } else if (props.adminMessage === 'alreadyLogged') {
      showMessage('Vous êtes déjà connecté', 'info');
    }
  }, [props.adminMessage]);

  return (
    <Snackbar
      open={toast}
      autoHideDuration={3000}
      onClose={() => setShowToast(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={() => setShowToast(false)} severity={severityToast} sx={{ width: '100%' }}>
        {messageToast}
      </Alert>
    </Snackbar>
  );
}

export default AdminMessage;
