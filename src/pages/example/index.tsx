import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Alert,
} from '@mui/material';
import axios from 'axios';
import defineTitle from '@/utils/defineTitle';
import { ExampleItems } from '@/models/Example';
import New from '@/components/form/type/new';
import Update from '@/components/form/type/update';
import Delete from '@/components/form/type/delete';
import ToastMessage from '@/models/ToastMessage';
import DashboardGridSkeleton from '@/utils/skeletons/DashboardGridSkeleton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function Example() {
  defineTitle('Liste des examples');

  const [data, setData] = useState<ExampleItems | null>();
  const [loading, setLoading] = useState(true);
  const [toast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessage>();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: React.MouseEvent | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent) => {
    const { name } = (event.target as HTMLButtonElement).dataset;
    setRowsPerPage(+{ name });
    setPage(0);
  };

  useEffect(() => {
    axios.get('/api/examples').then( async (actualData) => {
      actualData = actualData.data;
      setData(actualData.data);
      setLoading(true);
    }).catch(() => {
      setData(null);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const handleDataChange = (dataChange: ExampleItems | undefined | null, message:string) => {
    setData(dataChange);
    if (message && message === 'edit') {
      setToastMessage({ message: 'Example modifié !', severity: 'success' });
      setShowToast(true);
    } else if (message && message === 'delete') {
      setToastMessage({ message: 'Example supprimé !', severity: 'success' });
      setShowToast(true);
    }
  };

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
          <Box sx={{ maxWidth: '100%' }}>
            <New newValue={{ data }} handleDataChange={handleDataChange} />
            <TableContainer sx={{ mt: 4 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell key={1}>ID</TableCell>
                    <TableCell key={2}>Nom</TableCell>
                    <TableCell key={3}>Datetime</TableCell>
                    <TableCell key={4}>Slider</TableCell>
                    <TableCell key={5}>Switch</TableCell>
                    <TableCell key={6}>Rate</TableCell>
                    <TableCell key={7}>Select</TableCell>
                    <TableCell key={8}>Radio</TableCell>
                    <TableCell key={9}>Checkbox</TableCell>
                    <TableCell key={10}>Autocomplete</TableCell>
                    <TableCell key={11} align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((
                    { id, name, datetime, slider, active, rating, select, radio, checkbox, autocomplete },
                  ) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={name + id}>
                      <TableCell>{id}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>{name}</TableCell>
                      <TableCell>{datetime}</TableCell>
                      <TableCell>{slider}</TableCell>
                      <TableCell>{active ? <CheckIcon/> : <CloseIcon/>}</TableCell>
                      <TableCell>{rating}</TableCell>
                      <TableCell>{select}</TableCell>
                      <TableCell>{radio}</TableCell>
                      <TableCell>{checkbox}</TableCell>
                      <TableCell>{autocomplete}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                          <Update updateValue={{ id, name, active, rating, data }} handleDataChange={handleDataChange} />
                          <Delete deleteValue={{ id, name, data }} handleDataChange={handleDataChange} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data ? data.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        )}
      </Paper>

      <Snackbar
        open={toast}
        autoHideDuration={3000}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowToast(false)} severity={toastMessage && toastMessage.severity} sx={{ width: '100%' }}>
          {toastMessage && toastMessage.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Example;
