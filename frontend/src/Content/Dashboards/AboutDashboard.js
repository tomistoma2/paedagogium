import Navbar from '../Navbar';
import DashboardNavbar from '../DashboardNavbar'
import React, {useState, useEffect} from 'react';
import {Button, Stack, Grid, TextField} from '@mui/material';
import { width } from '@mui/system';
import e from 'cors';
import domain from '../../Content/domain.json'
import logo from '../../Media/logo_violet.png';



const AboutDashboard = () => {<br></br>

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
          })
          .catch(error => {
            console.error(error);
          });
          alert('Dokument úspěšně nahrán')
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
<p>Základní informace</p>
<input type="file" style={{marginTop: '5px'}} onChange={(e) => (setFile(e.target.files[0]), setSection('main'))}></input><br></br><br></br>
    <Button  onClick={(e) => handleSubmit(e)}
    sx={{marginLeft: '1%'}} color="error">Publikovat</Button>
<p>Kontakt</p>
<input type="file" style={{marginTop: '5px'}} onChange={(e) => (setFile(e.target.files[0]), setSection('contact'))}></input><br></br><br></br>
    <Button  onClick={(e) => handleSubmit(e)}
    sx={{marginLeft: '1%'}} color="error">Publikovat</Button>
<p>Členové</p>
<input type="file" style={{marginTop: '5px'}} onChange={(e) => (setFile(e.target.files[0]), setSection('members'))}></input><br></br><br></br>
    <Button  onClick={(e) => handleSubmit(e)}
    sx={{marginLeft: '1%'}} color="error">Publikovat</Button>
    <p>Konference</p>
<input type="file" style={{marginTop: '5px'}} onChange={(e) => (setFile(e.target.files[0]), setSection('conference'))}></input><br></br><br></br>
    <Button  onClick={(e) => handleSubmit(e)}
    sx={{marginLeft: '1%'}} color="error">Publikovat</Button>
  <p>Efektivní učení</p>
<input type="file" style={{marginTop: '5px'}} onChange={(e) => (setFile(e.target.files[0]), setSection('effective-teaching'))}></input><br></br><br></br>
    <Button  onClick={(e) => handleSubmit(e)}
    sx={{marginLeft: '1%'}} color="error">Publikovat</Button>

    
</div>
</div>);
}
export default AboutDashboard;