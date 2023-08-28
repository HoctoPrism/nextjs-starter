import { Alert, Snackbar, AlertColor } from '@mui/material';
import { useEffect, useState } from 'react';

function AdminMessage({ adminMessage }: any) {
  const [toast, setShowToast] = useState(false);
  const [severityToast, setSeverityToast] = useState<AlertColor>();
  const [messageToast, setMessageToast] = useState('');

  useEffect(() => {
    if (adminMessage === 'unauthorizedRole') {
      setMessageToast('accès refusé');
      setSeverityToast('error');
      setShowToast(true);
    } else if (adminMessage === 'alreadyLogged') {
      setMessageToast('Vous êtes déjà connecté');
      setSeverityToast('info');
      setShowToast(true);
    }
  }, [adminMessage]);

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
