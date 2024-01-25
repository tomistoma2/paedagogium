// About.js
import React, { useEffect } from 'react';
import { Link, Box, Paper } from '@mui/material';
import Navbar from './Navbar';
import AboutNavbar from './AboutNavbar';
import useFetch3 from '../Requester/useFetch3';
import domain from '../Content/domain.json';
import Footer from './Footer';
import background from '../Media/background2.jpg';
import logo from '../Media/logo.jpg';
import Analytics from './Analytics';

const About = () => {
  const { data3, setData3 } = useFetch3();

  useEffect(() => {
    let m = domain.domain + "parse/about/read/main";
    setData3({ ...data3, slug: m });
  }, []);

  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'repeat' }}>
      <Link to="/" sx={{ width: '100px', '@media(min-width: 1085px)': { display: 'none' } }}>
        <img
          style={{ width: '200px', display: 'block', margin: 'auto', marginBottom: '5px' }}
          src={logo}
          alt="Pedagogoium logo"
          onClick={() => (window.location.href = domain.domain)}
        />
      </Link>
      <Navbar />
      <Box
        sx={{
          left: '80px',
          '@media(max-width: 1400px)': {
            position: 'relative',
            marginLeft: '30%',
            marginBottom: '150px',
            width: '100%',
          },
          '@media(max-width: 900px)': {
            position: 'relative',
            marginLeft: '20%',
            '@media(max-width: 600px)': {
              position: 'relative',
              marginLeft: '12%',
            },
            '@media(max-width: 500px)': {
              position: 'relative',
              marginLeft: '-8%',
            },
          },
        }}
      >
        <AboutNavbar />
      </Box>
      <Paper
        sx={{
          width: '55%',
          display: 'block',
          margin: 'auto',
          marginTop: '50px',
          padding: '35px',
          '@media(max-width: 1400px)': { marginTop: '275px', width: '85%' },
        }}
      >
        <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', overflowX: 'auto' }}>
          <div dangerouslySetInnerHTML={{ __html: data3.results }}></div>
        </div>
      </Paper>
      <Analytics />
      <Footer />
    </div>
  );
};

export default About;
