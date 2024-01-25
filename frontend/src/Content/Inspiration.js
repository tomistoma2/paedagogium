import Navbar from './Navbar'
import React, { useState, useEffect } from 'react';
import {Box, Tab, Tabs, Stack, Pagination, Typography, Paper} from '@mui/material';
import useFetch3 from "../Requester/useFetch3";
import useFetch4 from "../Requester/useFetch4";
import Post from './Post'
import domain from '../Content/domain.json'
import Footer from '../Content/Footer';
import background from '../Media/background2.jpg';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import logo from '../Media/logo.jpg';
import Analytics from './Analytics';


const Inspiration = (props) => {
  const {data3, setData3} = useFetch3();
  const {data4, setData4} = useFetch4();
  const [value, setValue] = useState('planning');
  const [page, setPage] = useState(1);
  const [orientation, setOrientation] = useState("vertical");


  useEffect(() => {
    const checkWindowWidth = () => {
      const windowWidth = window.innerWidth;
      
      if (windowWidth < 1340 && windowWidth > 750) {
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

  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: 'Calibri',
        textTransform: 'none',
        fontSize: 18,
      },
    },
  });

  const handleChange = (event, valueR) => {
    setPage(valueR);
  };

  useEffect(() => {
      let m = domain.domain+"posts/api";
            setData3({ ...data3, slug: m });   
      let n = domain.domain+"parse/courses/read/literature";
            setData4({ ...data4, slug: n });     
  setTimeout(()=>{
      }, 100)
    
    }, [])

if(value != "literature"){
return(
<div style={{ backgroundImage:`url(${background})`, backgroundRepeat:"repeat"}}>
          <Link to="/" sx={{width: '100px', '@media(min-width: 1085px)': { display: 'none'}}}>
    <img style={{ width: '200px', display: 'block', margin: 'auto', marginBottom: '5px',}} src={logo} alt="Pedagogoium logo"
      onClick={() => (window.location.href = domain.domain)}/>
  </Link>
  <Navbar/><br></br> <ThemeProvider theme={theme}>


  <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '5px', // Adjust this value for the top spacing
      '@media(min-width: 1341px)': { paddingLeft: '50px', marginTop: '25px', position: 'absolute' },
    }}>
      <Tabs
        orientation={orientation}
        variant="scrollable"
        scrollButtons={true}
      >
        {/* Adjusted font size for smaller screens */}
        <Tab label="Plánování a příprava výuky" sx={{ '@media(max-width: 1800px)': { fontSize: '15px', margin: '-8px' } }} onClick={(e) => (setValue('planning'), setPage(1))} />
        <Tab label="Vedení výuky" sx={{ '@media(max-width: 1800px)': { fontSize: '15px', margin: '-8px' } }} onClick={(e) => (setValue('leadership'), setPage(1))} />
        <Tab label="Technologie ve výuce" sx={{ '@media(max-width: 1800px)': { fontSize: '15px', margin: '-8px' } }} onClick={(e) => (setValue('technology'), setPage(1))} />
        <Tab label="Zpětná vazba a hodnocení" sx={{ '@media(max-width: 1800px)': { fontSize: '15px', margin: '-8px' } }} onClick={(e) => (setValue('feedback'), setPage(1))} />
        <Tab label="Kolegiální podpora" sx={{ '@media(max-width: 1800px)': { fontSize: '15px', margin: '-8px' } }} onClick={(e) => (setValue('support'), setPage(1))} />
        <Tab label="Reflexe výuky a profesní rozvoj" sx={{ '@media(max-width: 1800px)': { fontSize: '15px', margin: '-8px' } }} onClick={(e) => (setValue('reflection'), setPage(1))} />
        <Tab label="Literatura" sx={{ '@media(max-width: 1800px)': { fontSize: '15px', margin: '-8px' } }} onClick={(e) => (setValue('literature'))} />
      </Tabs>
    </Box>
    <Box
      sx={{
        width: '60%',
        margin: '0 auto',
        '@media(min-width: 1200px)': {
          marginTop: '25px'
        },
        '@media(max-width: 1200px)': {
          width: '85%'
        },
      }}
    >
  {!data3.results ? "Loading..." : 
              data3.results.reverse().filter(post => !post.hidden).filter(function(d){
                return d.section.includes(value)}).sort((a, b) => new Date(b.date) - new Date(a.date)).slice((page-1)*10,(page-1)*10+10).map(({ _id, caption, contentShort, content, url, section, date, imageURL}) =>
          <Post caption={caption} contentShort={contentShort} content={content} imageURL={imageURL}  url={url} key={_id} _id={_id}></Post>
            )}</Box>
  <div style={{width: '10%'}}></div>

<div style={{display: 'block', width: 'fit-content', margin: 'auto'}}><br></br>    <Pagination  count={Math.ceil((data3.results.filter(function(d){
  return d.section.includes(value)}).length)/10)} page={page} onChange={handleChange} sx={{paddingBottom: '120px'}}/></div>
<Footer></Footer></ThemeProvider></div>)}
else{
  return(
    <div style={{ backgroundImage:`url(${background})`, backgroundRepeat:"repeat"}}>
  <Navbar/><br></br> <ThemeProvider theme={theme}>
  <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '5px', // Adjust this value for the top spacing
      '@media(min-width: 1341px)': { paddingLeft: '50px', marginTop: '25px', position: 'absolute' },
    }}>
  <Tabs
        orientation={orientation}
        variant="scrollable"
        scrollButtons={true}
      >
        {/* Adjusted font size for smaller screens */}
        <Tab label="Plánování a příprava výuky" sx={{ '@media(max-width: 1800px)': { fontSize: '15px', margin: '-8px' } }} onClick={(e) => (setValue('planning'), setPage(1))} />
        <Tab label="Vedení výuky" sx={{ '@media(max-width: 1800px)': { fontSize: '15px', margin: '-8px' } }} onClick={(e) => (setValue('leadership'), setPage(1))} />
        <Tab label="Technologie ve výuce" sx={{ '@media(max-width: 1800px)': { fontSize: '15px', margin: '-8px' } }} onClick={(e) => (setValue('technology'), setPage(1))} />
        <Tab label="Zpětná vazba a hodnocení" sx={{ '@media(max-width: 1800px)': { fontSize: '15px', margin: '-8px' } }} onClick={(e) => (setValue('feedback'), setPage(1))} />
        <Tab label="Kolegiální podpora" sx={{ '@media(max-width: 1800px)': { fontSize: '15px', margin: '-8px' } }} onClick={(e) => (setValue('support'), setPage(1))} />
        <Tab label="Reflexe výuky a profesní rozvoj" sx={{ '@media(max-width: 1800px)': { fontSize: '15px', margin: '-8px' } }} onClick={(e) => (setValue('reflection'), setPage(1))} />
        <Tab label="Literatura" sx={{ '@media(max-width: 1800px)': { fontSize: '15px', margin: '-8px' } }} onClick={(e) => (setValue('literature'))} />
      </Tabs>
    </Box>
    <Paper sx={{width: '55%', display: 'block', margin: 'auto', marginTop: '25px', padding: '35px', '@media(max-width: 920px)': {marginTop: '25px', width: '85%'}}}>
<div dangerouslySetInnerHTML={{ __html: data4.results }}></div>
</Paper>
<div style={{display: 'block', width: 'fit-content', margin: 'auto'}}><br></br><Pagination  count={Math.ceil((data3.results.filter(function(d){
  return d.section.includes(value)}).length)/10)} page={page} onChange={handleChange} sx={{paddingBottom: '120px'}}/></div>
<Footer></Footer></ThemeProvider><Analytics></Analytics></div>)}
}
export default Inspiration;