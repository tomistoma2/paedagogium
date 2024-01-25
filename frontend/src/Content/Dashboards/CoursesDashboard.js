import Navbar from '../Navbar';
import DashboardNavbar from '../DashboardNavbar'
import React, {useState, useEffect} from 'react';
import {Button, Stack, Grid, TextField} from '@mui/material';
import { width } from '@mui/system';
import e from 'cors';
import domain from '../../Content/domain.json'
import logo from '../../Media/logo_violet.png';



const CoursesDashboard = () => {
const [file, setFile] = useState(null);
const [section, setSection] = useState(null);

const [password, setPassword] = useState('drsq89chem');
const [authenticated, setAuthenticated] = useState(
  localStorage.getItem('authenticated') === 'true'
);

const logout = () => {
  setAuthenticated(false);
  localStorage.setItem('authenticated', 'false');
};


const handleFormSubmite = event => {
  event.preventDefault();
  if (process.env.REACT_APP_API_PASSWORD === password) {
    setAuthenticated(true);
    localStorage.setItem('authenticated', 'true');
  }
};


//uloží to soubor s názvem v params do docx na server
let handleSubmit = async (e) => {  
        const formData = new FormData();
        formData.append('document', file);
        fetch(domain.domain+'parse/about/write/'+section, {
            method: 'POST',
            body: formData
          })
          .then(response => response.json())
          .then(data => {
            alert("Dokument úspěšně zaevidován")
          })
          .catch(error => {
            console.error(error);
          });

        }
          if (!authenticated) {
            return (
              <form onSubmit={handleFormSubmite}>
                       <img src={logo}
                  style={{ width: '15%', display: 'flex', marginLeft: '42.5%', marginTop: '50px' }}
                ></img>
                <h3
                  style={{ display: 'flex', marginLeft: '42%', marginTop: '50px' }}
                >Administrátorský dashboard</h3>
                <TextField id="standard-basic"
                  label="Administrátorské heslo"
                  variant="standard"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ width: '30%', display: 'flex', marginLeft: '35%', marginTop: '15px' }} /><br></br>
                <Button type="submit" sx={{ width: '5%', display: 'flex', marginLeft: '48%', marginRight: '45%', marginTop: '15px' }}>Vstoupit</Button>
              </form>
            );
          }
return(<div style={{position: 'absolute', top: 0, width: '100%'}}>
<Navbar/>

<div id="MainDashboard"
><br></br>
<DashboardNavbar/>
<Button color="error" sx={{marginLeft: '90%'}} onClick={(e) => logout()} variant="contained">Odhlásit se</Button>
<strong>Vložený soubor MUSÍ být jen a pouze formátu .docx</strong>
<p>O programu</p>
<input type="file" style={{marginTop: '5px'}} onChange={(e) => (setFile(e.target.files[0]), setSection('about'))}></input><br></br><br></br>
    <Button  onClick={(e) => handleSubmit(e)}
    sx={{marginLeft: '1%'}} color="error">Publikovat</Button>
<p>Obsah</p>
<input type="file" style={{marginTop: '5px'}} onChange={(e) => (setFile(e.target.files[0]), setSection('content'))}></input><br></br><br></br>
    <Button  onClick={(e) => handleSubmit(e)}
    sx={{marginLeft: '1%'}} color="error">Publikovat</Button>
<p>Lektoři</p>
<input type="file" style={{marginTop: '5px'}} onChange={(e) => (setFile(e.target.files[0]), setSection('lecturers'))}></input><br></br><br></br>
    <Button  onClick={(e) => handleSubmit(e)}
    sx={{marginLeft: '1%'}} color="error">Publikovat</Button>
<p>Hodnocení</p>
<input type="file" style={{marginTop: '5px'}} onChange={(e) => (setFile(e.target.files[0]), setSection('rating'))}></input><br></br><br></br>
    <Button  onClick={(e) => handleSubmit(e)}
    sx={{marginLeft: '1%'}} color="error">Publikovat</Button>
<p>Individuální konzultace</p>
<input type="file" style={{marginTop: '5px'}} onChange={(e) => (setFile(e.target.files[0]), setSection('consultation'))}></input><br></br><br></br>
    <Button  onClick={(e) => handleSubmit(e)}
    sx={{marginLeft: '1%'}} color="error">Publikovat</Button>
<p>Nejbližší běh a registrace</p>
<input type="file" style={{marginTop: '5px'}} onChange={(e) => (setFile(e.target.files[0]), setSection('registration'))}></input><br></br><br></br>
    <Button  onClick={(e) => handleSubmit(e)}
    sx={{marginLeft: '1%'}} color="error">Publikovat</Button>
<p>Inspirace - literatura</p>
<input type="file" style={{marginTop: '5px'}} onChange={(e) => (setFile(e.target.files[0]), setSection('literature'))}></input><br></br><br></br>
    <Button  onClick={(e) => handleSubmit(e)}
    sx={{marginLeft: '1%'}} color="error">Publikovat</Button>





    
</div>
</div>);
}
export default CoursesDashboard;