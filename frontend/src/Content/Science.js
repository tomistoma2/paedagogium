import Navbar from './Navbar'
import Post from './Post'
import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {Button, Stack, Grid, Pagination} from '@mui/material';
import Typography from '@mui/material/Typography';
import useFetch3 from "../Requester/useFetch3";
import domain from '../Content/domain.json'
import Footer from '../Content/Footer';
import background from '../Media/background2.jpg';
import Link from '@mui/material/Link';
import logo from '../Media/logo.jpg';
import Analytics from './Analytics';




const Science = () => {
    const {data3, setData3} = useFetch3();
    const [page, setPage] = useState(1);
    const handleChange = (event, valueR) => {
      setPage(valueR);
    };
    useEffect(() => {
        let m = domain.domain+"posts/api/section/Science";
              setData3({ ...data3, slug: m });    
    setTimeout(()=>{
        }, 100)
      
      }, [])


    return(<div style={{ backgroundImage:`url(${background})`, backgroundRepeat:"repeat"}}>
              <Link to="/" sx={{width: '100px', '@media(min-width: 1085px)': { display: 'none'}}}>
    <img style={{ width: '200px', display: 'block', margin: 'auto', marginBottom: '5px',}} src={logo} alt="Pedagogoium logo"
      onClick={() => (window.location.href = domain.domain)}/>
  </Link>
    <Navbar/><br></br><br></br>
<Box sx={{'@media(max-width: 1200px)': { width: '85%'}, width: '70%', margin: '0 auto'}}>
    {!data3.results ? "Loading..." : 
              data3.results
              .slice(0)
              .reverse()
              .filter(post => !post.hidden) // Filter out posts with hidden set to true
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .filter(post => !post.hidden).slice((page-1)*10,(page-1)*10+10).map(({ _id, caption, contentShort, content, section, date,url, imageURL}) =>
          <Post caption={caption} contentShort={contentShort} content={content} imageURL={imageURL} url={url} key={_id} _id={_id}></Post>
            )}</Box><div style={{display: 'block', width: 'fit-content', margin: 'auto'}}>    <Pagination count={Math.ceil((data3.results.length)/10)} page={page} onChange={handleChange} sx={{paddingBottom: '30px', marginTop: '50px'}}/></div>
    <Analytics/>
    <Footer></Footer>
    </div>
    ); 
      
}


export default Science;