import React, {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import logo from '../Media/logo.jpg';
import domain from '../Content/domain.json'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { BottomNavigationAction, BottomNavigation, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import WebIcon from '@mui/icons-material/Web';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { redirect } from 'react-router';



//zde přidat objekt s name a redirect, kde uvedeme co chceme za záložky a kam chceme redirectnout
const pg = [{ name: 'O Paedagogiu', redirect: domain.domain+'about/main' }, { name: 'Akce', redirect: domain.domain+'events' }, { name: 'Základní kurz', redirect: domain.domain+'courses' }, { name: 'Návody a inspirace', redirect: domain.domain+'inspiration' }, { name: 'Věda', redirect: domain.domain+'science' }, { name: 'Efektivní výuka', redirect: domain.domain+'effective-teaching' }];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [value, setValue] = React.useState(0);
  const [on, setOn] = useState("Úvod");
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  //navbar button
  const handleClick = () => {
   
  };

  const handleMenuItemClick = (event, index, redirect) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    let name = window.location.pathname.split('/').filter(Boolean).pop();
    if(name == ""){
      setOn("Doma");
    }
    if(name == "main"){
      setOn("O Paedagogiu");
    }
    if (name == "events"){
      setOn("Akce");
    }
    if (name == "courses"){
      setOn("Základní kurz")
    }
    if (name == "inspiration"){
      setOn("Návody a Inspirace");
    }
    if (name == "science"){
      setOn("Věda")
    }
    if (name == "search"){
      setOn("Hledat")
    }
 
  }, [])


  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: 'Calibri',
        textTransform: 'none',
        fontSize: 18,
        '@media(max-width: 1380px)': { fontSize: 16 },
        '@media(max-width: 1240px)': { fontSize: 14 }
      },
    },
    palette: {
      secondary: {
        main: '#c00602',
      },
    },
  });

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white' }}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl" sx={{ height: '150px', paddingTop: '25px', backgroundColor: 'white', '@media(max-width: 1250px)': { height: '120px' }, }}>
 
          <Toolbar disableGutters>
          
          <Link href="/" sx={{'@media(max-width: 1300px)': { width: '200px'}, width: '200px', '@media(max-width: 1085px)': { display: 'none'}}}>
              <img src={logo} alt="Pedagogoium logo" onClick={() => window.location.href = domain.domain} /></Link>
              <Box sx={{'@media(min-width: 1085px)': { display: 'none', marginLeft: '250px'}, marginLeft: '5%', width: '40%', '@media(max-width: 750px)': { width: '50%'}}}>
              <ButtonGroup variant="outlined" aria-label="split button" color="secondary" >
                <Button onClick={handleClick} sx={{width: '200px', color: '#c00602'}}>{on}</Button>
                <Button
                sx={{color: '#c00602'}}
                  size="small"
                  aria-controls={open ? 'split-button-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-label="select merge strategy"
                  aria-haspopup="menu"
                  onClick={handleToggle}
                >
                  <ArrowDropDownIcon />
                </Button>
              </ButtonGroup>
              <Popper
                sx={{
                  zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu" autoFocusItem>
                          
                          {pg.map((({name, redirect}, index) => (
                            <MenuItem
                            key={index}
                            selected={index === selectedIndex}
                            onClick={() => (window.location.href = redirect)}
                          >
                            {name}
                          </MenuItem>
                          )))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Box>
            <Box sx={{ flexGrow: 1, display: { md: 'flex', marginLeft: '15%', '@media(max-width: 1100px)': { marginLeft: '2%' }, '@media(max-width: 1085px)': { display: 'none'} }, textAlign: 'center' }}>
              {pg.map(({ name, redirect }, index) => (
                <Button
                  key={name}
                  href={redirect}
                  sx={{
                    my: 2,
                    color: 'black',
                    display: index === 6 ? 'none' : 'block',
                    '&:hover': {
                      color: '#c00602',
                    },
                  }}>
                  {name}
                </Button>
              ))}
            </Box>
          

            <Box sx={{ width: '15%','@media(max-width: 1085px)': { width: '5%', marginLeft: '42%'}, '@media(max-width: 395px)': {display: 'none'},  '@media(max-width: 500px)': { width: '2%', marginLeft: '30%'}, '@media(max-width: 800px)': { width: '2%', marginLeft: '39%'} }}>
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              >
                <BottomNavigationAction  label="Hledat" sx={{color: '#c00602', display: 'none'}} icon={<SearchIcon color="secondary"/>} href="/search" />
                <BottomNavigationAction sx={{color: '#c00602'}} label="Hledat" icon={<SearchIcon />} href="/search" />
                <BottomNavigationAction sx={{color: '#c00602','@media(max-width: 1085px)': { display: 'none'} }} label="CCŽV" icon={<WebIcon />} href="https://cczv.cuni.cz/CCZV-1.html" />
                <BottomNavigationAction sx={{color: '#c00602', '@media(max-width: 1085px)': { display: 'none'} }} label="FB" icon={<FacebookIcon />} href="https://www.facebook.com/profile.php?id=100063670832237" />
              </BottomNavigation>
            </Box>

          </Toolbar>
        </Container></ThemeProvider>
    </AppBar>
  );
}
export default ResponsiveAppBar;