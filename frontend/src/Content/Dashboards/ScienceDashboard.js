import Navbar from '../Navbar';
import DashboardNavbar from '../DashboardNavbar'
import React, {useState, useEffect} from 'react';
import {Button, Stack, Grid, TextField} from '@mui/material';
import { width } from '@mui/system';
import e from 'cors';
import domain from '../../Content/domain.json'
import logo from '../../Media/logo_violet.png';



const Dashboard = () => {
  document.body.style = 'background: #E0E0E0;';
const [caption, setCaption] = useState("");
const [contentShort, setContentShort] = useState("");
const [content, setContent] = useState("");
const [imageURL, setImageURL] = useState("");
const [message, setMessage] = useState("");
const [url, setUrl] = useState("");
const [section, setSection] = useState("");
const [file, setFile] = useState(null);


console.log(localStorage.getItem('authenticated'));

let handleSubmit = async (e) => {
try{  
        //uloží post do databáze
        let res = await fetch(domain.domain+"posts/api/post", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            caption: caption,
            contentShort: contentShort, 
            content: content,
            url: url,
            imageURL: file.name,
            section: "science",
          }),
        });
        let resJson = await res.json();
        if (res.status === 201) {
          setCaption("");
          setContentShort("");
          setContent("");
          setImageURL("");
          setUrl("");
          setSection("")
          setMessage("Příspěvek byl úspěšně zaevidován");
          const formData = new FormData();
          formData.append('image', file);
          fetch(domain.domain+'posts/api/image', {
              method: 'POST',
              body: formData
            })
            .then(response => response.json())
            .then(data => {
            })
            .catch(error => {
              console.error(error);
            });
            setTimeout(()=>{
              window.location.reload();
            }, 250)
            alert("Příspěvek úspěšně zaevidován")
                } else {
                    setMessage("Request has failed");
                  }
        } catch (err) {
                  console.log(err);
                }}

const [password, setPassword] = useState('drsq89chem');
const [authenticated, setAuthenticated] = useState(
  localStorage.getItem('authenticated') === 'true'
);



const handleFormSubmite = event => {
  event.preventDefault();
  if (process.env.REACT_APP_API_PASSWORD === password) {
    setAuthenticated(true);
    localStorage.setItem('authenticated', 'true');
  }
};


const logout = () => {
  setAuthenticated(false);
  localStorage.setItem('authenticated', 'false');
};
      const handleFormSubmit = event => {
        event.preventDefault();
        const savedPassword = domain.hihi;
        if (password === savedPassword) {
          setAuthenticated(true);
          sessionStorage.setItem('auth', true);
        }
      };

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
<div id="MainDashboard"><br></br>
<DashboardNavbar/>
<Button color="error" sx={{marginLeft: '90%'}} onClick={(e) => logout()} variant="contained">Odhlásit se</Button>
    <h1>Přidat vědecký článek</h1><hr></hr>
    <TextField id="standard-basic" 
    label="Název článku" 
    variant="standard"
    onChange={(e) => setCaption(e.target.value)}
    sx={{width: '75%', marginLeft: '12.5%', marginRight: '25%'}}
    /><br></br>
    <TextField id="standard-basic" 
    label="Abstrakt nebo popis článku" 
    variant="standard" 
    multiline
    onChange={(e) => setContentShort(e.target.value)}
    sx={{width: '75%', marginLeft: '12.5%', marginRight: '12.5%', marginTop:'25px'}}/><br></br>
   <TextField id="standard-basic" 
    label="Text" 
    variant="standard"
    onChange={(e) => setContent(e.target.value)}
    sx={{width: '75%', marginLeft: '12.5%', marginRight: '25%'}}
    /><br></br>
    <TextField id="standard-basic" 
    label="Odkzaové url" 
    variant="standard"
    onChange={(e) => setUrl(e.target.value)}
    sx={{width: '75%', marginLeft: '12.5%', marginRight: '25%', marginTop: '25px'}}
    /><br></br>
    <p style={{width: '75%', marginLeft: '12.5%'}}> Zde vložte odkaz na článek a uživatel bude po kliknutí přímo odkázán na danou URL adresu.
    </p>
    <h4 style={{marginLeft: '12%', marginTop: '45px'}}>Vložit obrázek (rozlišení 1:1 (aspoň +-))</h4>
    <input type="file" style={{marginLeft: '12%', marginTop: '15px'}} onChange={(e) => setFile(e.target.files[0])}></input>
    <br></br><br></br>
    <Button onClick={(e) => handleSubmit(e,'science')} color="error" sx={{marginLeft: '40%', marginRight: '40%', marginTop:'25px', marginBottom:'25px'}}>Vytvořit</Button>
</div>
</div>);





}
export default Dashboard;