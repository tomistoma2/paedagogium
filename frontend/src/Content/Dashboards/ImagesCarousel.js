import Navbar from '../Navbar';
import DashboardNavbar from '../DashboardNavbar'
import React, {useState, useEffect} from 'react';
import {Button, Stack, Grid, TextField} from '@mui/material';
import { width } from '@mui/system';
import e from 'cors';
import domain from '../../Content/domain.json'
import logo from '../../Media/logo_violet.png';
import useFetch3 from "../../Requester/useFetch3";



const ImagesCarousel = () => {
const {data3, setData3} = useFetch3();
const [imageURL, setImageURL] = useState("");
const [message, setMessage] = useState("");
const [file, setFile] = useState(null);
const [url, setUrl] = useState("url");

useEffect(() => {
    let m = domain.domain+"posts/api/section/carousel";
          setData3({ ...data3, slug: m });    

  
  }, [])


  


let handleSubmit = async (e) => {
        try{  
                //uloží post do databáze
                let res = await fetch(domain.domain+"posts/api/post", {
                  method: "POST",
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    caption: file.name,
                    contentShort: "content short", 
                    content: "content",
                    imageURL: file.name,
                    url: url,
                    section: "carousel",
                  }),
                });
                let resJson = await res.json();
                if (res.status === 201) {
                  console.log("saving image");
                  const formData = new FormData();
                  formData.append('image', file);
                  fetch(domain.domain+'carousel/api/image', {
                      method: 'POST',
                      body: formData
                    })
                    .then(response => response.json())
                    .then(data => {
                    })
                    .catch(error => {
                      console.error(error);
                    });
                    alert("Obrázek byl úspěšně přidán do carouselu")
                    setTimeout(()=>{
                      window.location.reload();
                    }, 250)
                        } else {
                            setMessage("Request has failed");
                          }
              } catch (err) {
                console.log(err);
              }}

              let handleDelete = async (e, d) => {
                try{  
                        //smaže fotku z databaze
                        let res = await fetch(domain.domain+"posts/api/id/"+d, {
                          method: "DELETE",
                        });
                        let resJson = await res.json();
                        if (res.status === 200) {
                          const formData = new FormData();
                          formData.append('image', file);
                          alert("Obrázek byl úspěšně smazán z carouselu");
                          setTimeout(()=>{
                            window.location.reload();
                          }, 250)
                                } else {
                                  alert("chyba")
                                  }
                      } catch (err) {
                        console.log(err);
                      }}
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
    <h4 style={{marginLeft: '12%', marginTop: '45px'}}>Vložit obrázek</h4>
    <h5 style={{marginLeft: '12%', marginTop: '45px'}}>1920:400 px</h5>
    <input type="file" style={{marginLeft: '12%', marginTop: '5px'}} onChange={(e) => setFile(e.target.files[0])}></input><br></br><br></br>
    <TextField id="standard-basic" 
            label="Odkaz carouselu" 
            variant="standard"
            onChange={(e) => setUrl(e.target.value)}
            sx={{width: '45%', display: 'flex', marginLeft: '12%', marginTop: '15px'}}/><br></br>
    <Button  onClick={(e) => handleSubmit(e)}
    sx={{marginLeft: '45%', marginRight: '40%', marginTop:'25px', marginBottom:'25px'}} color="error">Publikovat</Button>  <br></br>
{!data3.results ? "Loading..." : 
              data3.results.slice(0).reverse().map(({ _id, caption, contentShort, content, section, url, date, imageURL}) =>
          <div><img style={{maxWidth: '200px'}} src={domain.domain+`static/media/${caption}`}>
            </img>
            <Button sx={{marginBottom: '175px'}} onClick={(e) => handleDelete(e, _id)} >Vymazat</Button>
            </div>
            )}
</div>
</div>);
}
export default ImagesCarousel;