import { Box, Button, FormControl, Modal, Snackbar, Typography, Alert } from '@mui/material';
import React, { useState } from 'react';
import update from 'immutability-helper';
import { DeleteForeverRounded } from '@mui/icons-material';
import axios from 'axios';
import { ExampleItems, ExampleItemDelete } from '@/models/Example';
import ToastMessage from '@/models/ToastMessage';

function Delete(props: {
  deleteValue: { id: number, name: string, data: ExampleItems | null | undefined };
  handleDataChange: (dataChange: ExampleItems | undefined | null, message: string) => void
}) {

  const [oneExample, setOneExample] = useState<ExampleItemDelete | null | undefined>(); // get parking
  const [delExample, setShowDelete] = useState(false);
  const [toast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>();

  const deleteExample = async (e: React.MouseEvent | null) => {
    e?.preventDefault();
    try {
      const res = await axios.delete('/api/examples/' + oneExample?.id);
      if (res.status === 200) {
        if (props.deleteValue.data) {
          const foundIndex =  props.deleteValue.data.findIndex(x => x.id === oneExample?.id);
          const data = update(props.deleteValue.data, { $splice: [[foundIndex, 1]] });
          props.handleDataChange(data, 'delete');
          setShowDelete(false);
        }
      } else {
        setToastMessage({ message: 'Une erreur est survenue', severity: 'error' });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (<Box>
    <Button
      variant='contained'
      sx={{ mx: 2 }}
      onClick={ () => {
        setShowDelete(true);
        setOneExample({ id: props.deleteValue.id, name: props.deleteValue.name } );
      } }
    >
      <DeleteForeverRounded/>
    </Button>
    <Modal
      id="modal-example-container"
      className="modal-container"
      hideBackdrop
      open={delExample}
      onClose={() => setShowDelete(false)}
      aria-labelledby="delete-example-title"
      aria-describedby="child-modal-description"
    >
      <Box className="modal-crud modal-example" sx={{ bgcolor: 'background.default' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }} id="delete-example-title">Supprimer un example</Typography>
        <FormControl>
          <Box>
            êtes vous sur de vouloir supprimer example : {oneExample?.name}?
          </Box>
          <Box className="action-button">
            <Button sx={{ m: 3 }} type="submit" variant="contained" onClick={deleteExample}>Envoyer</Button>
            <Button variant="outlined" onClick={() => setShowDelete(false)}>Fermer</Button>
          </Box>
        </FormControl>
      </Box>
    </Modal>

    <Snackbar
      open={toast}
      autoHideDuration={3000}
      onClose={() => setShowToast(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={() => setShowToast(false)} severity={toastMessage?.severity} sx={{ width: '100%' }}>
        {toastMessage?.message}
      </Alert>
    </Snackbar>
  </Box>
  );
}

export default Delete;
