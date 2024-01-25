import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import {Card, Color, Tab, Box, Tabs} from '@mui/material';
import Welcome from './Welcome'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from "react-router-dom";
import logo from '../Media/logo_violet.png';

export default function Navbar() {
  
  const theme = createTheme({
    palette: {
      primary: {
        main: "#f2f2f2"
      }
    }
  });
  return (
    <div style={{marginTop: '160px', position: 'absolute', left: '5px', top: '20px'}}>
<Box sx={{marginTop: '50px', marginLeft: '10px'}}>
      <Tabs
        orientation="vertical"
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}>
        <Tab label="Správa příspěvků"  href="/dashboard/" />
        <Tab label="Přidat Příspěvek"  href="/dashboard/event" />
        <Tab label="Věda"  href="/dashboard/science" />
        <Tab label="Návody a inspirace"  href="/dashboard/inspiration" />    
        <Tab label="O pedagogiu"  href="/dashboard/about" />
        <Tab label="Kurzy"  href="/dashboard/courses" />
        <Tab label="Obrázky v carouselu"  href="/dashboard/imagesCarousel" />
        <Tab label="Konference"  href="/dashboard/conference" />
      </Tabs>
    </Box></div>    
  );
}



