import Navbar from './Navbar'
import EventsStyles from '../Styles/EventsStyles.css'
import React, {useEffect, useState} from 'react';
import Footer from '../Content/Footer';
import background from '../Media/background2.jpg';
import {Button, Stack, Grid, Pagination, Box} from '@mui/material';
import useFetch3 from "../Requester/useFetch3";
import Post from './Post'
import domain from '../Content/domain.json'
import Link from '@mui/material/Link';
import logo from '../Media/logo.jpg';
import Analytics from './Analytics';


const Events = () => {
  //localStorage.setItem('authenticated', 'false');
  console.log( localStorage.getItem('authenticated'))
    const {data3, setData3} = useFetch3();
    const [page, setPage] = useState(1);
    useEffect(() => {
        let m = domain.domain27017+"posts/api/section/Events";
              setData3({ ...data3, slug: m });    
    setTimeout(()=>{
        }, 100)
      
      }, [])

      const handleChange = (event, valueR) => {
        setPage(valueR);
      };
return(<div style={{ backgroundImage:`url(${background})`, backgroundRepeat:"repeat"}}>
          <Link to="/" sx={{width: '100px', '@media(min-width: 1085px)': { display: 'none'}}}>
    <img style={{ width: '200px', display: 'block', margin: 'auto', marginBottom: '5px',}} src={logo} alt="Pedagogoium logo"
      onClick={() => (window.location.href = domain.domain)}/>
  </Link>
<Navbar/>
<Box sx={{width: '60%', margin: '0 auto', '@media(max-width: 1200px)': { width: '80%' }}}>
<div id="Header">
 <br></br><br></br><br></br>
</div>
{!data3.results
  ? "Loading..."
  : data3.results
      .filter(post => !post.hidden) // Filter out posts with hidden set to true
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort posts by date in descending order
      .slice((page - 1) * 10, (page - 1) * 10 + 10)
      .map(({ _id, caption, contentShort, content, section, url, date, imageURL }) => (
        <Post
          caption={caption}
          contentShort={contentShort}
          content={content}
          imageURL={imageURL}
          url={url}
          key={date}
          _id={_id}
        ></Post>
      ))}

<div style={{display: 'block', width: 'fit-content', margin: 'auto'}}> <br></br>   <Pagination count={Math.ceil((data3.results.length)/10)} page={page} onChange={handleChange} sx={{paddingBottom: '30px'}}/></div>
</Box><Analytics></Analytics><Footer></Footer>
</div>);

      
      
}


export default Events;