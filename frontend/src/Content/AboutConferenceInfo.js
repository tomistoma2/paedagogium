import  React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import AboutNavbar from './AboutNavbar';
import useFetch3 from "../Requester/useFetch3";
import domain from '../Content/domain.json'
import {Stack, Paper, Box} from '@mui/material';
import Footer from '../Content/Footer';
import background from '../Media/background2.jpg';
import Link from '@mui/material/Link';
import logo from '../Media/logo.jpg';
import Analytics from './Analytics';

const AboutConferenceInfo = () => {
const {data3, setData3} = useFetch3();

useEffect(() => {
let m = domain.domain+"parse/about/read/conference";
setData3({ ...data3, slug: m });    
     
      }, [])

      
return(
    <div style={{ backgroundImage:`url(${background})`, backgroundRepeat:"repeat"}}>
                <Link to="/" sx={{width: '100px', '@media(min-width: 1085px)': { display: 'none'}}}>
    <img style={{ width: '200px', display: 'block', margin: 'auto', marginBottom: '5px',}} src={logo} alt="Pedagogoium logo"
      onClick={() => (window.location.href = domain.domain)}/>
  </Link>
        <Navbar></Navbar>
        <Box sx={{ left: '80px', '@media(max-width: 1400px)': { position: 'relative', marginLeft: '30%', marginBottom: '150px' }, '@media(max-width: 900px)': { position: 'relative', marginLeft: '20%', '@media(max-width: 600px)': { position: 'relative', marginLeft: '12%' }, '@media(max-width: 500px)': { position: 'relative', marginLeft: '-8%' } } }} >  <AboutNavbar></AboutNavbar></Box>
        <Paper sx={{width: '55%', display: 'block', margin: 'auto', marginTop: '50px', padding: '35px', '@media(max-width: 1200px)': { marginTop: '135px', width: '85%'  }}}>
        <div dangerouslySetInnerHTML={{ __html: data3.results }}></div>
        </Paper><Analytics/><Footer></Footer>
    </div>
);
}

export default AboutConferenceInfo;