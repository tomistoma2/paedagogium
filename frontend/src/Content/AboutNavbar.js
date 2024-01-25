import React, { useState, useEffect } from 'react';
import {Box, Tab, Tabs} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useFetch3 from "../Requester/useFetch3";
import domain from '../Content/domain.json'

const AboutNavbar = (props) => {
const { data3, setData3 } = useFetch3();
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Calibri',
      textTransform: 'none',
      fontSize: 18,
    },
  },
});

const [orientation, setOrientation] = useState('vertical');

  useEffect(() => {
    let m = domain.domain + "posts/api/section/conference";
    setData3({ ...data3, slug: m });

    const handleResize = () => {
      const windowWidth = window.innerWidth;
      
      if (windowWidth < 1200) {
        setOrientation("vertical");
      } else {
        setOrientation("vertical");
      }
    };
    handleResize(); // Set initial orientation based on screen width

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


/*'@media(max-width: 600px)': { fontSize: '8pt' }*/
return(
<Box style={{marginTop: '15px', position: 'absolute', width: '280px'}}>
<ThemeProvider theme={theme}>
<Box sx={{marginTop: '50px', marginLeft: '10px'}}>
<Tabs
  orientation={orientation}
  aria-label="Vertical tabs example"
  sx={{ borderRight: 1, borderColor: 'divider' }}
>
  <Tab label="Hlavní informace" href="/about/main" />
  {data3?.results?.[1]?.hidden ? (
    <Tab label="Konference - Informace" href="/about/conferenceInfo" />
  ) : null}
  {data3?.results?.[0]?.hidden ? (
    <Tab label="Konference" href="/about/conference" />
  ) : null}
  <Tab label="Členové" href="/about/members" />
  <Tab label="Kontakt" href="/about/contact" />
</Tabs>
    </Box></ThemeProvider></Box>);

}
export default AboutNavbar;