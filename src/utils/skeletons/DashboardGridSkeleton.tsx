import { Skeleton, Grid } from '@mui/material';
import React from 'react';

const DashboardGridSkeleton = () => {
  const skeletonProps = { height: 37, sx: { marginRight: 3, marginBottom: 3 } };
  const numSkeletons = 5;

  const primarySkeleton = <Skeleton variant={'rounded'} {...skeletonProps} sx={{ ...skeletonProps.sx, bgcolor: 'primary.main' }}/>;
  const secondarySkeleton = <Skeleton variant={'rounded'} {...skeletonProps} sx={{ ...skeletonProps.sx, bgcolor: 'secondary.main' }}/>;
  const defaultSkeleton = <Skeleton variant={'rounded'} {...skeletonProps} />;

  const createSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < numSkeletons; i++) {
      skeletons.push(
        <Grid key={i} container spacing={2} maxWidth={400}>
          <Grid item xs={8}>{defaultSkeleton}</Grid>
          <Grid item xs={2}>{secondarySkeleton}</Grid>
          <Grid item xs={2}>{primarySkeleton}</Grid>
        </Grid>,
      );
    }
    return skeletons;
  };

  return (
    <>
      {createSkeletons()}
    </>
  );
};

export default DashboardGridSkeleton;
