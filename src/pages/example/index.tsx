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
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import defineTitle from '@/utils/defineTitle';
import { ExampleItems } from '@/models/Example';
import New from '@/components/form/type/new';
import Update from '@/components/form/type/update';
import Delete from '@/components/form/type/delete';
import ToastMessage from '@/models/ToastMessage';

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
    const { name, index } = (event.target as HTMLButtonElement).dataset;
    console.log(name, index);
    setRowsPerPage(+{ name });
    setPage(0);
  };

  useEffect(() => {
    axios.get('/api/types').then( async (actualData) => {
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
          <>
            <Typography variant="h5" sx={{ textAlign: 'center' }} gutterBottom>Chargement...</Typography>
            <CircularProgress />
          </>
        ) : (
          <Box sx={{ maxWidth: '100%' }}>
            <New newValue={{ data }} handleDataChange={handleDataChange} />
            <TableContainer sx={{ mt: 4 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell key={1}>ID</TableCell>
                    <TableCell key={2}>Nom</TableCell>
                    <TableCell key={3} align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({ id, name }) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={name + id}>
                      <TableCell>{id}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>{name}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                          <Update updateValue={{ id, name, data }} handleDataChange={handleDataChange} />
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
