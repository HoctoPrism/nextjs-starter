import { Box, Button, Modal, Snackbar, Typography, Alert } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useState } from 'react';
import update from 'immutability-helper';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ExampleItem, ExampleItems } from '@/models/Example';
import ToastMessage from '@/models/ToastMessage';
import TextFormType from '@/utils/formTypes/TextFormType';

function Update(props: {
  updateValue: { id: number, name: string, data: ExampleItems };
  handleDataChange: (dataChange: ExampleItems | undefined | null, message: string) => void
}) {
  const [id] = useState<number>();
  const [name, setName] = useState<string>();
  const [oneExample, setOneExample] =
    useState<ExampleItem>({ id: props.updateValue.id, name: props.updateValue.name });
  const [editExample, setShowEdit] = useState(false);
  const [toast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>();

  const { register, control, handleSubmit, formState: { errors } } = useForm({ defaultValues: { name: props.updateValue.name } });

  const editExampleForm = async () => {
    try {
      const updatedPark: ExampleItem = {
        id: id ? id : oneExample.id,
        name: name ? name : oneExample.name,
      };
      const res = await axios.patch('/api/types/' + oneExample?.id, { name });
      if (res.status === 200) {
        const foundIndex = props.updateValue.data.findIndex(x => x.id === oneExample?.id);
        const data = update(props.updateValue.data, { [foundIndex]: { $set: updatedPark } });
        props.handleDataChange(data, 'edit');
        setShowEdit(false);
      } else {
        setToastMessage({ message: 'Une erreur est survenue', severity: 'error' });
        setShowToast(true);
      }

    } catch (err) {
      console.log(err);
    }
  };

  function handleNameChange(nameValue: string) { setName(nameValue); }

  return (<Box >
    <Button color='secondary' variant='contained' sx={{ mx: 2 }}
      onClick={() => {
        setShowEdit(true);
        setOneExample({ id: props.updateValue.id, name: props.updateValue.name });
      }}>
      <Edit/>
    </Button>
    <Modal
      id="modal-example-container"
      className="modal-container"
      hideBackdrop
      open={editExample}
      onClose={() => setShowEdit(false)}
      aria-labelledby="edit-example-title"
      aria-describedby="child-modal-description"
    >
      <Box className="modal-crud modal-example" sx={{ bgcolor: 'background.default' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }} id="edit-example-title">Editer un example</Typography>
        <form onSubmit={handleSubmit(editExampleForm)}>

          <TextFormType
            inputName={'name'}
            config={{ required: 'Ce champ est requis',  minLength: { value: 5, message: 'Longueur minimale de 5 caractères' } }}
            control={control} errors={errors} register={register} handleNameChange={handleNameChange} defaultValue={props.updateValue.name}
          />

          <Box className="action-button">
            <Button type="submit" sx={{ m: 3 }} variant="contained">Envoyer</Button>
            <Button variant="outlined" onClick={() => setShowEdit(false)}>Fermer</Button>
          </Box>

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
export default Update;
