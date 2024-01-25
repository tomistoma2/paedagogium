import Navbar from './Navbar'
import React, { useEffect, useState} from 'react';
import {useParams} from "react-router";
import useFetch3 from "../Requester/useFetch3";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {Button, Stack, Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import domain from '../Content/domain.json'
import Footer from '../Content/Footer';
import background from '../Media/background2.jpg';
import Link from '@mui/material/Link';
import logo from '../Media/logo.jpg';
import Analytics from './Analytics';


const DetailEvent = () => {
const [imageURL, setImageURL] = useState("");
const [className, setClassName] = useState("");
const [postId, setPostId] = useState(useParams().id);
const {data3, setData3} = useFetch3();  

useEffect(() => {
    let m = domain.domain27017+"posts/api/id/"+postId;
          setData3({ ...data3, slug: m });    

 
  }, [])
  setTimeout(()=>{
    setImageURL(data3.results.imageURL)
      }, 500)
return(
  
  
<div  style={{ position: 'absolute', top: 0, backgroundImage:`url(${background})`, backgroundRepeat:"repeat"}}>
<Link to="/" sx={{width: '100px', '@media(min-width: 1085px)': { display: 'none'}}}>
    <img style={{ width: '200px', display: 'block', margin: 'auto', marginBottom: '5px',}} src={logo} alt="Pedagogoium logo"
      onClick={() => (window.location.href = domain.domain)}/>
  </Link>
<Navbar/>
 
  <Card sx={{ width: '80%', margin: '0 auto', marginTop: '8%', textAlign: 'justify', display: 'flex', '@media(max-width: 500px)': { width: '98%'} }}>
    <CardContent>

    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <div style={{ flex: 2 }}>
        <p style={{ fontSize: "16px", marginTop: "10px" }}>
          {/* Text content will flow around the image */}
          <Box sx={{ '@media(max-width: 700px)': { display: 'none'}}}><img
            src={domain.domain27017 + `static/media/${imageURL}`}
            alt="Post"
            style={{
              float: "left",
              width: "35%", // Adjust the image width as needed
              marginLeft: "10px", 
              padding: '15px',// Add some spacing between the image and textma
            }}
          /></Box><h2 style={{ fontSize: "18px", fontWeight: "bold", marginTop: '20px', textAlign: 'left'}}>
          {data3.results.caption}
        </h2>
          {/* Use dangerouslySetInnerHTML if necessary */}
          <Typography dangerouslySetInnerHTML={{ __html: data3.results.content }}></Typography>
        </p>
      </div>
    </div>
    </CardContent>
  </Card><Analytics/><Footer></Footer>
</div>)

}
export default DetailEvent;