// pages/index.tsx
import type { NextPage } from "next";

import { Typography, Box } from "@mui/material";

const Home: NextPage = () => {
    return (
        <Box>
            <Typography variant="h2" textAlign="center">
                Hello, World
            </Typography>
        </Box>
        );
};

export default Home;
