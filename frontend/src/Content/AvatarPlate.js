import React from 'react';
import {CardContent, Card, Avatar, Typography} from '@mui/material';

function AvatarPlate({header, className, name, description, faculty, fileURL,alt, ...rest }){
    return(<div>
        <Card sx={{borderRadius: '16px', marginTop:'20px'}}>
        <div style={{backgroundColor:'blue', paddingLeft: '10%', height: '50px', marginTop: '-10%', paddingTop:'15%'}}>
        <h4 style={{paddingLeft: '17%', height: '10%', marginTop: '0%', paddingTop:'10px'}}>{faculty}</h4>
        </div>

         <CardContent>
         <Avatar
                />
         <h5 style={{marginLeft: '20%', fontSize: '18pt'}}>{name}</h5>
         <p style={{fontSize: '12pt', textAlign: 'justify', marginBottom:'20%'}}>{description}</p>
         </CardContent>
         <div style={{backgroundColor:'blue', paddingLeft: '30%', height: '40px', marginTop: '-10%'}}></div>
       </Card></div>
       );
   }
export default AvatarPlate;