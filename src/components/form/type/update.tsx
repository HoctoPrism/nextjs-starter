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
import DatePickerFormType from '@/utils/formTypes/DatePickerFormType';
import SliderFormType from '@/utils/formTypes/SliderFormType';
import RangeFormType from '@/utils/formTypes/RangeFormType';
import RadioPickerFormType from '@/utils/formTypes/RadioPickerFormType';
import CheckboxFormType from '@/utils/formTypes/CheckboxFormType';
import AutocompleteFormType from '@/utils/formTypes/AutocompleteFormType';
import SelectSimpleFormType from '@/utils/formTypes/SelectSimpleFormType';

function Update(props: {
  updateValue: {
    id: number,
    name: string,
    active: boolean,
    rating: number,
    datetime: Date | undefined,
    slider: number | undefined,
    range: number[] | string | undefined,
    radio?: string,
    checkbox?: string[],
    autocomplete?: string,
    selectSimple?: string,
    data: ExampleItems
  };
  handleDataChange: (dataChange: ExampleItems | undefined | null, message: string) => void
}) {
  const [id] = useState<number>();
  const [name, setName] = useState<string>(props.updateValue.name);
  const [active, setActive] = useState<boolean>(props.updateValue.active);
  const [rating, setRating] = useState<number>(props.updateValue.rating);
  const [date, setDate] = useState<Date | undefined>(props.updateValue.datetime);
  const [slider, setSlider] = useState<number | undefined>(props.updateValue.slider);
  const [range, setRange] = useState<number[] | string | undefined>(props.updateValue.range);
  const [radio, setRadio] = useState<string | undefined>(props.updateValue.radio);
  const [checkbox, setCheckbox] = useState<undefined | string[]>(props.updateValue.checkbox);
  const [autocomplete, setAutocomplete] = useState<string | undefined>(props.updateValue.autocomplete);
  const [selectSimple, setSelectSimple] = useState<string | undefined>(props.updateValue.selectSimple);

  const [oneExample, setOneExample] =
    useState<ExampleItem>({
      id: props.updateValue.id,
      name: props.updateValue.name,
      active: props.updateValue.active,
      rating: props.updateValue.rating,
      datetime: props.updateValue.datetime,
      slider: props.updateValue.slider,
      range: props.updateValue.range,
      radio: props.updateValue.radio,
      checkbox: props.updateValue.checkbox,
      autocomplete: props.updateValue.autocomplete,
      select: props.updateValue.selectSimple,
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
        datetime: date ? date : oneExample.datetime,
        slider: slider ? slider : oneExample.slider,
        range: range ? range : oneExample.range,
        radio: radio ? radio : oneExample.radio,
        checkbox: checkbox ? checkbox : oneExample.checkbox,
        autocomplete: autocomplete ? autocomplete : oneExample.autocomplete,
        select: selectSimple ? selectSimple : oneExample.select,
      };
      const res = await axios.patch('/api/examples/' + oneExample?.id, {
        name, active, rating, datetime: date, slider, range, radio, checkbox, autocomplete, select: selectSimple,
      });
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
  function handleDateChange(dateValue: Date | undefined) { setDate(dateValue); }
  function handleSliderChange(sliderValue: number) { setSlider(sliderValue); }
  function handleRangeChange(rangeValue: number[]) { setRange(rangeValue); }
  function handleRadioChange(radioValue: string) { setRadio(radioValue); }
  function handleCheckboxChange(checkboxValue: undefined | string[]) { setCheckbox(checkboxValue); }
  function handleAutoCompleteChange(autocompleteValue: string | undefined) { setAutocomplete(autocompleteValue); }
  function handleSelectSimpleChange(selectSimpleValue: string | undefined) { setSelectSimple(selectSimpleValue); }

  return (<Box >
    <Button color='secondary' variant='contained' sx={{ mx: 2 }}
      onClick={() => {
        setShowEdit(true);
        setOneExample({
          id: props.updateValue.id,
          name: props.updateValue.name,
          active: props.updateValue.active,
          rating: props.updateValue.rating,
          datetime: props.updateValue.datetime,
          slider: props.updateValue.slider,
          range: props.updateValue.range,
          radio: props.updateValue.radio,
          checkbox: props.updateValue.checkbox,
          autocomplete: props.updateValue.autocomplete,
          select: props.updateValue.selectSimple,
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
        <form onSubmit={handleSubmit(editExampleForm)} className='f-c-c-fs'>

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

          <DatePickerFormType inputName='Date' handleDateChange={handleDateChange} defaultValue={props.updateValue.datetime}/>
          <SliderFormType inputName='Slider' handleSliderChange={handleSliderChange} size='medium' defaultValue={props.updateValue.slider}/>
          <RangeFormType inputName='Range' handleRangeChange={handleRangeChange} size='medium' defaultValue={props.updateValue.range ?? [10, 30]} />
          <RadioPickerFormType inputName='Radio' handleRadioChange={handleRadioChange} defaultValue={props.updateValue.radio} />
          <CheckboxFormType inputName='Checkbox' handleCheckboxChange={handleCheckboxChange} defaultValue={props.updateValue.checkbox} />
          <AutocompleteFormType inputName='Autocomplete' handleAutoCompleteChange={handleAutoCompleteChange} sx={{ width: 400 }}
            defaultValue={props.updateValue.autocomplete}
          />
          <SelectSimpleFormType inputName='SelectSimple' handleSelectSimpleChange={handleSelectSimpleChange}
            defaultValue={props.updateValue.selectSimple}
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
