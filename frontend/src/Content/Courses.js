import React, {useState, useEffect} from 'react';
import Navbar from './Navbar'
import CoursesNavbar from './CoursesNavbar'
import useFetch3 from "../Requester/useFetch3";
import domain from '../Content/domain.json'
import {CardContent, Card, Avatar, Typography, Box, Paper} from '@mui/material';
import Footer from '../Content/Footer';
import background from '../Media/background2.jpg';
import Link from '@mui/material/Link';
import logo from '../Media/logo.jpg';
import Analytics from './Analytics';
const Courses = () => {
  const {data3, setData3} = useFetch3();
  console.log(data3.results);

useEffect(() => {
let m = domain.domain+"parse/about/read/about";
setData3({ ...data3, slug: m });    
     
      }, [])
return(<div style={{ backgroundImage:`url(${background})`, backgroundRepeat:"repeat",  overflowX: 'hidden'}}>
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
        <CoursesNavbar></CoursesNavbar></Box>
        <Paper sx={{width: '55%', display: 'block', margin: 'auto', marginTop: '25px', padding: '35px', '@media(max-width: 920px)': {marginTop: '300px', width: '85%'}}}>
<div dangerouslySetInnerHTML={{ __html: data3.results }}></div>
</Paper><Analytics/><Footer></Footer>
</div>
);
}
export default Courses;