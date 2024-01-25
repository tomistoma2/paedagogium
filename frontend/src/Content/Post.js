import React, {useState, useEffect} from 'react';
import {CardContent, Card, Avatar, Typography, Stack, Box, Link} from '@mui/material';
import domain from '../Content/domain.json'

let Post = ({caption, contentShort, content, imageURL, _id, section, url, className,...rest }) => {
   const imageUrl = domain.domain+`static/media/${imageURL}`;
    const detail = (x, id) => {
        if(x!=""){
            let link = x;
            window.open(link, '_blank');

        }else{
            let link =  domain.domain+'detail/id/'+id;
            window.location.href = link;

        }
    }

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
    
       <Card sx={{marginTop: '10px',
        cursor: 'pointer',
        '&:hover': {
          cursor: 'pointer',
        },
      }} onClick={() => detail(url, _id)}>
       
        <CardContent>
            <Stack direction="row" spacing={2} sx={{width: '100%', fontFamily: 'Calibri'}}>
              <Box sx={{minWidth: '180px', maxWidth: '185px','@media(max-width: 800px)': { minWidth: '20%', maxWidth: '22%', fontSize: '8pt' }, '@media(max-width: 500px)': { display: 'none' }, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              {imageData && <img src={imageData} alt="" 
            style={{borderRadius: '5px'}}
            />}</Box>
  
                <div>
        <Stack direction="column" spacing={2} sx={{width: '100%'}}>
        <Typography variant="h3" sx={{fontWeight: 600, fontSize: '14pt', marginBottom: '-15px', marginTop: '-1px', '@media(max-width: 600px)': { fontSize: '10pt' },}}>{caption}</Typography>
        <Typography variant="p" sx={{fontSize: '12pt','@media(max-width: 600px)': { fontSize: '8pt' }, textAlign:'justify'}} dangerouslySetInnerHTML={{ __html: contentShort }}></Typography>
        </Stack></div>
            </Stack>
        </CardContent>
      </Card></div>
      );
}

export default Post;