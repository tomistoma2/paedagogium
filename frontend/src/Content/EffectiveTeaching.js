import React, {useState, useEffect} from 'react';
import {CardContent, Card, Avatar, Typography, Stack, Box, Link, Paper} from '@mui/material';
import domain from '../Content/domain.json'
import Navbar from './Navbar'
import Footer from '../Content/Footer';
import useFetch3 from "../Requester/useFetch3";
import logo from '../Media/logo.jpg';
import background from '../Media/background2.jpg';
import Analytics from './Analytics';

let EffectiveTeaching = () => {
    const {data3, setData3} = useFetch3();
    
useEffect(() => {
    let m = domain.domain+"parse/about/read/effective-teaching";
    setData3({ ...data3, slug: m });    
         
          }, [])

    return(
<div style={{ backgroundImage:`url(${background})`, backgroundRepeat:"repeat",  overflowX: 'hidden'}}>
          <Link to="/" sx={{width: '100px', '@media(min-width: 1085px)': { display: 'none'}}}>
    <img style={{ width: '200px', display: 'block', margin: '0 auto', marginBottom: '5px',}} src={logo} alt="Pedagogoium logo"
      onClick={() => (window.location.href = domain.domain)}/>
  </Link>
<Navbar/><br></br>
<Box sx={{
  marginTop: '25px', 
  position: 'absolute',
  '@media(min-width: 1400px)': { marginLeft: '2%' },
  '@media(max-width: 1200px)': { position: 'relative',marginLeft: '15%', marginTop: '25px' },
    '@media(max-width: 1000px)': { position: 'relative', marginLeft: '8%'},
     '@media(max-width: 900px)': { position: 'relative', marginLeft: '20%'},
      '@media(max-width: 500px)': { position: 'relative', marginLeft: '2%'},
       '@media(max-width: 365)': { position: 'relative', marginLeft: '1%'} }}>
       </Box>
        <Paper sx={{width: '55%', display: 'block', margin: 'auto', marginTop: '25px', padding: '35px', '@media(max-width: 920px)': {marginTop: '50px', width: '85%'}}}>
<div dangerouslySetInnerHTML={{ __html: data3.results }}></div>
</Paper><Analytics/><Footer></Footer>
</div>);
}

export default EffectiveTeaching;