import  React, { useState, useEffect } from 'react';
import {Stack, AppBar, Container, Paper, Typography, Link, Box} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import WebIcon from '@mui/icons-material/Web';
import {BottomNavigationAction, BottomNavigation} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import logo from '../Media/logoUK.png';

const Footer = () => {    
  localStorage.setItem('authenticated', 'false');
    const theme = createTheme({
        typography: {
          allVariants: {
            fontFamily: 'Calibri',
            textTransform: 'none',
            fontSize: 18,
            '@media(max-width: 600px)': { fontSize: '5pt' }
          },
        },
      });  
      const [showElement, setShowElement] = useState(false);

      useEffect(() => {
        const timeoutId = setTimeout(() => {
          setShowElement(true);
        }, 1000); // Delay in milliseconds (3 seconds in this example)
    
        return () => clearTimeout(timeoutId); // Clear the timeout if the component unmounts before the delay ends
      }, []);

return(


  

    <div> <ThemeProvider theme={theme}>  {showElement &&   <Paper sx={{paddingTop: '25px', backgroundColor: 'white', marginTop: '50px', paddingBottom: '25px'}}>
    <Stack direction={"row"} sx={{fontFamily: 'Calibri'}}>    
    <Box sx={{width: '30%'}} >
    <BottomNavigationAction label="CCŽV" icon={<WebIcon />} href="https://cczv.cuni.cz/CCZV-1.html"/>
    <Link sx={{width: '800px', fontSize:'small', fontSize: '10pt', '@media(max-width: 1020px)': { display: 'none' },'@media(max-width: 1300px)': { fontSize: '7pt' }}} href="https://cczv.cuni.cz/CCZV-1.html">CENTRUM CELOŽIVOTNÍHO VZDĚLÁVÁNÍ UK</Link><br></br>
        <BottomNavigationAction label="Fcb" icon={<FacebookIcon />} href="https://www.facebook.com/profile.php?id=100063670832237" />
    <Link href="https://www.facebook.com/profile.php?id=100063670832237" sx={{fontSize: '10pt', '@media(max-width: 1020px)': { display: 'none' }, '@media(max-width: 1300px)': { fontSize: '7pt' }}}> FACEBOOK CENTRA CELOŽIVOTNÍHO VZDĚLÁVÁNÍ UK</Link>
        </Box>

  <Box href="/" sx={{ width: '30%',marginLeft: '3px', marginBottom: '25px', }}>
    <img src={logo} alt="UK logo" style={{ width: '100%', maxWidth: '400px'}} />
</Box>

<Typography variant="p" sx={{width: '20%',marginLeft: '35px', marginRight: '10px', fontSize: '12pt', '@media(max-width: 1000px)': { fontSize: '8pt', marginLeft: '25px' }, '@media(max-width: 500px)': { marginLeft: '25px', fontSize: '5pt' }, '@media(max-width: 400px)': {marginLeft: '10px' }}}><strong>Mgr. et Mgr. David Hurný</strong><br></br>
    Předseda Paedagogia<br></br>
    Člen kolegia rektorky pro rozvoj pedagogických kompetencí akademických pracovníků<br></br>
    e-mail: <Link href="mailto:david.hurny@ruk.cuni.cz">david.hurny@ruk.cuni.cz</Link>
</Typography>

<Typography variant="p" sx={{width: '20%',  marginRight: '20px',fontSize: '12pt', '@media(max-width: 1000px)': { fontSize: '8pt', marginRight: '75px' }, '@media(max-width: 500px)': {fontSize: '5pt', marginRight: '20px' }}}>
    <strong>Mgr. Bartłomiej Wróblewski</strong><br></br>
    Centrum celoživotního vzdělávání<br></br>
    Koordinátor rozvoje pedagogických kompetencí<br></br>
    e-mail: <Link href="mailto:bartlomiej.wroblewski@ruk.cuni.cz">bartlomiej.wroblewski@ruk.cuni.cz</Link><br></br>
    mobil: +420 771 277 692
</Typography>
</Stack>
    </Paper>}
 
    </ThemeProvider>

    </div>

);
}

export default Footer;