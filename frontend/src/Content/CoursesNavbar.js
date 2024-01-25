import React, { useState, useEffect } from 'react';
import {Box, Tab, Tabs} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const CoursesNavbar = (props) => {

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
    const checkWindowWidth = () => {
      const windowWidth = window.innerWidth;
      
      if (windowWidth < 1200 && windowWidth > 900) {
        setOrientation("horizontal");
      } else {
        setOrientation("vertical");
      }
    };

    // Initial check
    checkWindowWidth();

    // Add event listener to check whenever window is resized
    window.addEventListener("resize", checkWindowWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, []);



  /*

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200 && window.innerWidth > 920) {
        setOrientation('horizontal');
      } else if(window.innerWidth < 900) {
        setOrientation('vertical');
      }
    };
    handleResize(); // Set initial orientation based on screen width

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
*/
return(
<div style={{position: 'absolute'}}> <ThemeProvider theme={theme}>
<Box sx={{marginTop: '50px', margin: '0 auto',width: '250px', marginBottom: '25px', '@media(max-width: 1200px)': { width: '1200px' },}}>
      <Tabs
        orientation={orientation}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}>
        <Tab label="O programu"  href="/courses/" />
        <Tab label="Obsah"  href="/courses/content/" />
        <Tab label="Lektoři" href="/courses/lecturers"/>
        <Tab label="Hodnocení"  href="/courses/references" />
        <Tab label="Individuální konzultace"  href="/courses/consultation" />
        <Tab label="Nejbližší běh a registrace"  href="/courses/register" />
      </Tabs>
    </Box></ThemeProvider></div>);

}
export default CoursesNavbar;