import { Skeleton, Grid } from '@mui/material';
const DashboardGridSkeleton = () => {
  return <Grid container spacing={2} maxWidth={400}>
    <Grid item xs={4}><Skeleton variant='rounded' height={37} sx={{ marginRight: 3, bgcolor: 'primary.main' }} /></Grid>
    <Grid item xs={6}></Grid>
    <Grid item xs={8}><Skeleton variant='rounded' height={37} sx={{ marginRight: 3, bgcolor: 'primary.main' }} /></Grid>
    <Grid item xs={2}><Skeleton variant='rounded' height={37} sx={{ marginRight: 3, bgcolor: 'primary.main' }} /></Grid>
    <Grid item xs={2}><Skeleton variant='rounded' height={37} sx={{ marginRight: 3, bgcolor: 'primary.main' }} /></Grid>
    <Grid item xs={8}><Skeleton variant='rounded' height={37} sx={{ marginRight: 3, bgcolor: 'primary.main' }} /></Grid>
    <Grid item xs={2}><Skeleton variant='rounded' height={37} sx={{ marginRight: 3, bgcolor: 'primary.main' }} /></Grid>
    <Grid item xs={2}><Skeleton variant='rounded' height={37} sx={{ marginRight: 3, bgcolor: 'primary.main' }} /></Grid>
    <Grid item xs={8}><Skeleton variant='rounded' height={37} sx={{ marginRight: 3, bgcolor: 'primary.main' }} /></Grid>
    <Grid item xs={2}><Skeleton variant='rounded' height={37} sx={{ marginRight: 3, bgcolor: 'primary.main' }} /></Grid>
    <Grid item xs={2}><Skeleton variant='rounded' height={37} sx={{ marginRight: 3, bgcolor: 'primary.main' }} /></Grid>
    <Grid item xs={8}><Skeleton variant='rounded' height={37} sx={{ marginRight: 3, bgcolor: 'primary.main' }} /></Grid>
    <Grid item xs={2}><Skeleton variant='rounded' height={37} sx={{ marginRight: 3, bgcolor: 'primary.main' }} /></Grid>
    <Grid item xs={2}><Skeleton variant='rounded' height={37} sx={{ marginRight: 3, bgcolor: 'primary.main' }} /></Grid>
  </Grid>;
};

export default DashboardGridSkeleton;
