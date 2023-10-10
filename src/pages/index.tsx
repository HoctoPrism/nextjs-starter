// pages/index.tsx
import type { NextPage } from 'next';

import { Typography, Box } from '@mui/material';
import defineTitle from '@/utils/defineTitle';

defineTitle('Home');
const Home: NextPage = () => {
  return (
    <Box>
      <Typography variant="h2" textAlign="center">Hello, World</Typography>
    </Box>
  );
};

export default Home;
