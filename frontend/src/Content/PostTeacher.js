import React, {useState, useEffect} from 'react';
import {CardContent, Card, Paper, Typography, Stack} from '@mui/material';

import domain from '../Content/domain.json'

let Post = ({caption, name, imageURL, _id, className,...rest }) => {
    //console.log('Excellent-teachers/'+imageURL);
    //if (error) return <Typography>{"error"}</Typography>
    const detail = (x, y) => {
        if(x.includes("http")){
            let link = x;
            window.open(link, "_blank")
        }else{
            let link = domain.domain+'/detail/id/'+y;
            window.open(link, "_blank")
        }
    }
    const imageUrl = domain.domain+`/static/media/${imageURL}`;
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
      fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          setImageData(url);
        })
        .catch(error => {
          console.error('Error fetching image:', error);
        });
    }, [imageUrl]);
   return(<div>
<Paper sx={{height:'fit-content', padding: '15px', marginTop: '20px'}}>
  <Stack direction="row">
    <div style={{width: '30%'}}>
    <div style={{width: '650px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              {imageData && <img src={imageData} alt="" 
            style={{borderRadius: '25px', maxWidth: '200px'}}
            />}
              </div>
    </div>
    <div style={{width: '70%'}}>
    <h1  style={{marginTop: '-10px'}}>{name}</h1>
    <p style={{width: '85%', textAlign: 'justify'}} >{caption}</p>
    </div>
  </Stack>
</Paper></div>
      );
}

export default Post;