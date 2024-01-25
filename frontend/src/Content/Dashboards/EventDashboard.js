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
const [url, setUrl] = useState("");
const [message, setMessage] = useState("");
const [section, setSection] = useState("");
const [file, setFile] = useState(null);
const [password, setPassword] = useState('drsq89chem');
const [authenticated, setAuthenticated] = useState(
  localStorage.getItem('authenticated') === 'true'
);


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
            imageURL: file.name,
            url: url,
            section: "events",
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
                    alert("Zkontrolujte, zda máte veškeré pole správně vyplněná");
                  }
      } catch (err) {
        console.log(err);

        if(err == "TypeError: file is null"){
        alert('Nebyl vložen obrázek, příspěvek bez obrázku není možné vytvořit.');}
      }}



      const handleFormSubmite = event => {
        event.preventDefault();
        if (process.env.REACT_APP_API_PASSWORD === password) {
          setAuthenticated(true);
          localStorage.setItem('authenticated', 'true');
        }
      };
    

const logout = () => {
  console.log("logout");
  setAuthenticated(false);
  localStorage.setItem('authenticated', 'false');
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

<div id="MainDashboard"
><br></br>
<DashboardNavbar/>
<Button color="error" sx={{marginLeft: '90%'}} onClick={(e) => logout()} variant="contained">Odhlásit se</Button>


    <h1>Přidat příspěvek</h1><hr></hr>
    <TextField id="standard-basic" 
    label="Titulek" 
    variant="standard"
    onChange={(e) => setCaption(e.target.value)}
    sx={{width: '75%', marginLeft: '12.5%', marginRight: '25%', marginTop:'25px', marginBottom: '30px'}}
    /><br></br>
    <p style={{width: '75%', marginLeft: '12.5%'}}> Krátký popis bude zobrazen v hlavním zobrazení. Doporučuji krátký, stručný a informativní popis 
    akce/příspěvku. Dobře vypadají příspěvky s maximem 100 slov.</p>
    <TextField id="standard-basic" 
    label="Krátký popis" 
    variant="standard" 
    multiline
    onChange={(e) => setContentShort(e.target.value)}
    sx={{width: '75%', marginLeft: '12.5%', marginRight: '12.5%', marginTop:'1px'}}/>
    <p style={{width: '75%', marginLeft: '12.5%'}}> Text se ukáže v detailu příspěvku, na který bude uživatel přesměrován, pokud následující kolonka URL
    nebude vyplněna</p>
    <p style={{width: '75%', marginLeft: '12.5%'}}>Pro speciální formátová textu je nutné využít následující HTML příkazy:</p>
      <ul style={{width: '75%', marginLeft: '12.5%'}}>
        <li>Odřádkování:<code>{` <br></br>`}</code></li>
        <li>Odkaz: <code>{` <a href="ZDE BUDE LINK">ZDE BUDE TEXT, NA KTERÝ SE BUDE KLIKAT</a>`}</code></li>
        <li>Tučně: <b><code>{` <b>TENTO TEXT BUDE TUČNÝ</b>`}</code></b></li>
        <li>Italic: <i><code>{` <i>TENTO TEXT BUDE ITALIC</i>`}</code></i></li>
        <li>Subscript: <sub><code>{` <sub>TENTO TEXT BUDE SUBSCRIPT</sub>`}</code></sub></li>
        <li>Superscript: <sup><code>{` <sup>TENTO TEXT BUDE SUPERSCRIPT</sup>`}</code></sup></li>

      </ul>
    <TextField id="standard-basic" 
    label="Text" 
    multiline variant="standard" 
    onChange={(e) => setContent(e.target.value)}
    sx={{width: '75%', marginLeft: '12.5%', marginRight: '12.5%', marginBottom: '25px'}}/>
       <p style={{width: '75%', marginLeft: '12.5%'}}> Pokud je kolonka URL vyplněna, kliknutí na příspěvek přesměruje na dané URL, pokud zůstane kolonka prázdná tak klik přesměruje na detail
    příspěvku, tj. ukáže text.</p>
    <TextField id="standard-basic" 
    label="odkazové url (volitelné)" 
    variant="standard"
    onChange={(e) => setUrl(e.target.value)}
    sx={{width: '75%', marginLeft: '12.5%', marginRight: '25%'}}/>
    <h4 style={{ marginLeft: '12%', marginTop: '45px' }}>Vložit obrázek (rozlišení 1:1 (aspoň +-))</h4>
    <input type="file" style={{marginLeft: '12%', marginTop: '5px'}} onChange={(e) => setFile(e.target.files[0])}></input><br></br><br></br>
    <Button  onClick={(e) => handleSubmit(e)}
    sx={{marginLeft: '45%', marginRight: '40%', marginTop:'25px', marginBottom:'25px'}} color="error">Publikovat</Button>

    
</div>
</div>);
}
export default Dashboard;