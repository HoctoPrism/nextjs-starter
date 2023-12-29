import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Box, Paper, Snackbar, Typography } from '@mui/material';
import Update from '@/components/form/example/update';
import Delete from '@/components/form/example/delete';
import { ExampleItem, ExampleItems } from '@/models/Example';
import defineTitle from '@/utils/defineTitle';
import ToastMessage from '@/models/ToastMessage';
import New from '@/components/form/example/new';
import DashboardGridSkeleton from '@/utils/skeletons/DashboardGridSkeleton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DisplayExample from '@/components/form/example/displayExample';

export default function Example() {
  defineTitle('Liste des examples');

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ExampleItems>([]);
  const [toast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessage>();

  useEffect(() => {
    axios.get('/api/examples').then(async (actualData) => {
      actualData = actualData.data;
      setData(actualData.data);
      setLoading(false);
    }).catch(() => {
      setData([]);
    });
  }, []);

  const handleDataChange = (dataChange: ExampleItems | undefined | null, message:string) => {
    setData(dataChange || []);
    if (message && message === 'edit') {
      setToastMessage({ message: 'Example modifié !', severity: 'success' });
      setShowToast(true);
    } else if (message && message === 'delete') {
      setToastMessage({ message: 'Example supprimé !', severity: 'success' });
      setShowToast(true);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'datetime', headerName: 'Datetime', width: 200 },
    { field: 'slider', headerName: 'Slider', width: 100 },
    { field: 'active', headerName: 'Active', width: 50, renderCell: (params: { row: ExampleItem }) => {
      const { active } = params.row;
      return (<Box>{active ? <CheckIcon/> : <CloseIcon/>}</Box>);
    } },
    { field: 'rating', headerName: 'Rating', width: 100 },
    { field: 'select', headerName: 'Select', width: 100 },
    { field: 'radio', headerName: 'Radio', width: 100 },
    { field: 'checkbox', headerName: 'Checkbox', width: 100, renderCell: (params: { row: ExampleItem }) => {
      const { checkbox } = params.row;
      return (<Box>{checkbox ? <DisplayExample display={checkbox} /> : ''}</Box>);
    } },
    { field: 'autocomplete', headerName: 'Autocomplete', width: 100 },
    { field: 'range', headerName: 'Range', width: 100 },
    { field: 'actions', headerName: 'Actions', width: 200, renderCell: (params: { row: ExampleItem }) => {
      const { id, name, active, rating, datetime, slider, range, radio, checkbox, autocomplete, select } = params.row;
      return (<Box sx={{ display: 'flex', justifyContent: 'right' }}>
        <Update updateValue={{
          id, name, active, rating, datetime, slider, range, radio, checkbox, autocomplete, selectSimple: select, data,
        }} handleDataChange={handleDataChange} />
        <Delete deleteValue={{ id, name, data }} handleDataChange={handleDataChange} />
      </Box>);
    } },
  ];

  return (
    <Box id="example">
      <Paper sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', py: 10,
      }}
      >
        <Typography variant="h3" sx={{ textAlign: 'center' }} gutterBottom>Example</Typography>
        {loading ? (
          <DashboardGridSkeleton />
        ) : (
          <Box sx={{ width: '90%' }}>
            <New newValue={{ data }} handleDataChange={handleDataChange} />
            <DataGrid
              initialState={{
                pagination: { paginationModel: { pageSize: 20 } },
              }}
              rows={data}
              columns={columns}
              pageSizeOptions={[20, 50, 100]}
              checkboxSelection
              loading={loading}
            />
            <Snackbar
              open={toast}
              autoHideDuration={3000}
              onClose={() => setShowToast(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert onClose={() => setShowToast(false)} severity={toastMessage?.severity || 'info'} sx={{ width: '100%' }}>
                {toastMessage?.message || ''}
              </Alert>
            </Snackbar>
          </Box>
        )}
      </Paper>
    </Box>

  );
}
