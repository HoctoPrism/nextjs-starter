import * as React from "react";
import { IconButton } from "@mui/joy";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";

import { useColorScheme as useMaterialColorScheme } from "@mui/material/styles";
import { useColorScheme as useJoyColorScheme } from "@mui/joy/styles";
const ModeToggle = () => {
  const [mounted, setMounted] = React.useState(false);
    const { mode, setMode } = useMaterialColorScheme();
    const { setMode: setJoyMode } = useJoyColorScheme();
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <IconButton
      onClick={() => {
        setMode(mode === "dark" ? "light" : "dark");
        setJoyMode(mode === "dark" ? "light" : "dark");
      }}
    >
      {mode === "dark" ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
};

export default ModeToggle;
