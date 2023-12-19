import { Box, Button, Modal, Snackbar, Typography, Alert } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useState } from 'react';
import update from 'immutability-helper';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ExampleItem, ExampleItems } from '@/models/Example';
import ToastMessage from '@/models/ToastMessage';
import TextFormType from '@/utils/formTypes/TextFormType';
import SwitchFormType from '@/utils/formTypes/SwitchFormType';
import RateFormType from '@/utils/formTypes/RateFormType';

function Update(props: {
  updateValue: { id: number, name: string, active: boolean, rating: number, data: ExampleItems };
  handleDataChange: (dataChange: ExampleItems | undefined | null, message: string) => void
}) {
  const [id] = useState<number>();
  const [name, setName] = useState<string>(props.updateValue.name);
  const [active, setActive] = useState<boolean>(props.updateValue.active);
  const [rating, setRating] = useState<number>(props.updateValue.rating);
  const [oneExample, setOneExample] =
    useState<ExampleItem>({
      id: props.updateValue.id,
      name: props.updateValue.name,
      active: props.updateValue.active,
      rating: props.updateValue.rating,
    });
  const [editExample, setShowEdit] = useState(false);
  const [toast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>();

  const { register, handleSubmit, formState: { errors } } = useForm( { defaultValues : { name: props.updateValue.name } });

  const editExampleForm = async () => {
    try {
      const updatedPark: ExampleItem = {
        id: id ? id : oneExample.id,
        name: name ? name : oneExample.name,
        active: active,
        rating: rating ? rating : oneExample.rating,
      };
      const res = await axios.patch('/api/examples/' + oneExample?.id, { name, active, rating });
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

  function handleValueChange(nameValue: string) { setName(nameValue); }
  function handleSwitchChange(switchValue: boolean) { setActive(switchValue); }
  function handleRateChange(ratingValue: number) { setRating(ratingValue); }

  return (<Box >
    <Button color='secondary' variant='contained' sx={{ mx: 2 }}
      onClick={() => {
        setShowEdit(true);
        setOneExample({
          id: props.updateValue.id,
          name: props.updateValue.name,
          active: props.updateValue.active,
          rating: props.updateValue.rating,
        });
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
            errors={errors} register={register} handleValueChange={handleValueChange} defaultValue={props.updateValue.name}
          />

          <SwitchFormType inputName='Active' handleSwitchChange={handleSwitchChange}
            errors={errors} register={register} defaultValue={props.updateValue.active}
          />

          <RateFormType inputName='Rating' handleRateChange={handleRateChange}
            defaultValue={parseFloat(String(props.updateValue.rating))} precision={0.5}
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
