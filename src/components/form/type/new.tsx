import { Box, Button, Modal, Snackbar, Typography, Alert } from '@mui/material';
import { useState } from 'react';
import update from 'immutability-helper';
import axios from 'axios';
import { ExampleItems } from '@/models/Example';
import ToastMessage from '@/models/ToastMessage';
import TextFormType from '@/utils/formTypes/TextFormType';
import { useForm } from 'react-hook-form';
import SwitchFormType from '@/utils/formTypes/SwitchFormType';
import RateFormType from '@/utils/formTypes/RateFormType';
import DateTimePickerFormType from '@/utils/formTypes/DateTimePickerFormType';

function New(props: {
  newValue: { data: ExampleItems | null | undefined };
  handleDataChange: (dataChange: ExampleItems | undefined | null, message: string) => void
}) {

  const [name, setName] = useState('');
  const [active, setActive] = useState(false);
  const [rating, setRating] = useState<null | string | number>(null);
  const [date, setDate] = useState<Date | null>(null);

  const [newExample, setShowNew] = useState(false);
  // Handle Toast event
  const [toast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>();
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { name: '' } });

  function handleValueChange(nameValue: string) { setName(nameValue); }
  function handleSwitchChange(switchValue: boolean) { setActive(switchValue); }
  function handleRateChange(ratingValue: number) { setRating(ratingValue); }
  function handleDateChange(dateValue: Date) { setDate(dateValue); }

  const newExampleForm = async () => {
    try {
      const res = await axios.post('/api/examples', { name, active, rating, datetime: date });
      if (res.status === 200) {
        const tab = { id: 0, name: '', active: 0, rating: null, datetime: null };
        await Object.assign(tab, res.data.data);
        const data = update(props.newValue.data, { $push: [{
          id : tab.id,
          name: tab.name,
          active: tab.active,
          rating: tab.rating,
          datetime: tab.datetime,
        }] });
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
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }} id="new-example-title">Nouvel example</Typography>

        <form onSubmit={handleSubmit(newExampleForm)}>

          <TextFormType
            inputName='Name'
            config={{ required: 'Ce champ est requis',  minLength: { value: 5, message: 'Longueur minimale de 5 caractères' } }}
            errors={errors} register={register} handleValueChange={handleValueChange}
          />

          <SwitchFormType inputName='Active' handleSwitchChange={handleSwitchChange} errors={errors} register={register} />
          <RateFormType inputName='Rating' handleRateChange={handleRateChange} defaultValue={0} precision={0.5} />
          <DateTimePickerFormType inputName='DateTime' handleDateChange={handleDateChange} />

          <Box className="action-button">
            <Button type="submit" sx={{ m: 3 }} variant="contained">Envoyer</Button>
            <Button variant="outlined" onClick={() => setShowNew(false)}>Fermer</Button>
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

export default New;
