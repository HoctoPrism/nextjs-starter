import {AppBar, Box, Button} from "@mui/material";
import {useEffect} from "react";
import Link from "next/link";
import ModeToggle from "@/utils/theme/modeToggle";

export default function Header() {

    useEffect(() => {
    }, [])

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar className='header' id="navbar">
                <Box sx={{m: 5, flexGrow: 1}} component="div">NextJS-Starter</Box>
                <Box className="navbar">
                    <Link href='/'><Button color="secondary">Accueil</Button></Link>
                    <ModeToggle/>
                </Box>
            </AppBar>
        </Box>
    )
}
