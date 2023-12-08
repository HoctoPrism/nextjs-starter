import * as React from 'react';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import { IconButton, PaletteMode } from '@mui/material';
import { ColorContext } from '@/utils/theme/colorContext';
const ModeToggle = () => {

  const [mounted, setMounted] = React.useState(false);
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const colorMode = React.useContext(ColorContext);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <IconButton
      onClick={() => {
        setMode(mode === 'dark' ? 'light' : 'dark');
        colorMode.toggleColorMode();
      }}
    >
      {mode === 'dark' ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
};

export default ModeToggle;
