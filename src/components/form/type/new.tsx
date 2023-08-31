import { Box, Button, FormControl, Modal, Snackbar, TextField, Typography, Alert } from '@mui/material';
import { useState } from 'react';
import update from 'immutability-helper';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { ExampleItems } from '@/models/Example';
import ToastMessage from '@/models/ToastMessage';

function New(props: {
  newValue: { data: ExampleItems | null | undefined };
  handleDataChange: (dataChange: ExampleItems | undefined | null, message: string) => void
}) {

  const [name, setName] = useState('');
  const [newExample, setShowNew] = useState(false);
  // Handle Toast event
  const [toast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>();
  const { register, control, handleSubmit, formState: { errors } } = useForm({ defaultValues: { name: '' } });

  const newExampleForm = async () => {
    try {
      const res = await axios.post('/api/types', { name });
      if (res.status === 200) {
        const tab = {
          id: 0,
          name: '',
        };
        await Object.assign(tab, res.data.data);
        const data = update(props.newValue.data, { $push: [{ id : tab.id, name: tab.name }] });
        props.handleDataChange(data, '');
        setName('');
        setToastMessage({ message: 'Example ajouté ! Vous pouvez en ajouter un autre', severity: 'success' });
        setShowToast(true);
      } else {
        setToastMessage({ message: 'Une erreur est survenue', severity: 'error' });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (<Box>
    <Button variant="contained" onClick={() => setShowNew(true)}>Ajouter</Button>
    <Modal
      id="modal-example-container"
      className="modal-container"
      hideBackdrop
      open={newExample}
      onClose={() => setShowNew(false)}
      aria-labelledby="new-example-title"
      aria-describedby="child-modal-description"
    >
      <Box className="modal-crud modal-example" sx={{ bgcolor: 'background.default' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }} id="new-example-title">Nouvel example </Typography>
        <form onSubmit={handleSubmit(newExampleForm)}>
          <FormControl>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={() => (
                <TextField
                  {...register(
                    'name',
                    {
                      required: 'Ce champ est requis',
                      minLength: { value: 5, message: 'Longueur minimale de 5 caractères' },
                    },
                  )}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: 400, height: 50 }}
                  label="Nom"
                  variant="standard"
                  value={name}
                />
              )}
            />
            {errors.name ? (
              <Alert sx={{ mt:2, p:0, pl:2 }} severity="error">{errors.name?.message}</Alert>
            ) : ''}
            <Box className="action-button">
              <Button type="submit" sx={{ m: 3 }} variant="contained">Envoyer</Button>
              <Button variant="outlined" onClick={() => setShowNew(false)}>Fermer</Button>
            </Box>
          </FormControl>
        </form>

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

export default New;
