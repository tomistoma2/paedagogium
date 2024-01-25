import React from 'react';
import {CardContent, Card, Avatar, Typography} from '@mui/material';


function AvatarPlate({header, name, description, fileName, alt, className, imageURL, ...rest }){

    return(<div>
        <Card sx={{borderRadius: '16px', marginTop:'12px', width:'220px'}}>
        <div style={{backgroundColor:'blue', paddingLeft: '30%', height: '20px'}}></div>
        <h4 style={{paddingLeft: '30%', height: '10%', marginTop: '0%', paddingTop:'10px'}}>{header}</h4>
         <CardContent>
         <h5 style={{fontSize: '14pt'}}>{name}</h5>
         <p style={{fontSize: '8pt', textAlign: 'justify', marginBottom:'20%', minHeight:'130px'}}>{description}</p>
         </CardContent>
         <div style={{backgroundColor:'blue', paddingLeft: '30%', height: '40px', marginTop: '-10%'}}></div>
       </Card></div>
       );
   }
export default AvatarPlate;