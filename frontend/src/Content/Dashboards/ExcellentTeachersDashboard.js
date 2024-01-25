import Navbar from '../Navbar';
import DashboardNavbar from '../DashboardNavbar'
import React, {useState, useEffect} from 'react';
import {Button, Stack, Grid, TextField, Input, MenuItem, Select, InputLabel, FormControl, ButtonGroup} from '@mui/material';
import useFetch3 from "../../Requester/useFetch3";
import AvatarPlate from '../AvatarPlate';
import domain from '../../Content/domain.json'
import logo from '../../Media/logo_violet.png';



const Dashboard = () => {
document.body.style = 'background: #E0E0E0;';
const [name, setName] = useState("Jméno a Příjmení");
const [imageName, setImageName] = useState("5");
const [description, setDescription] = useState("Hrubý popis učitele, co dělal, jaký je a za co se zasloužil, proč je to zrovna nejlepší učitel, kterého kyd univerzita viděla a co dbude dělat potom.");
const [message, setMessage] = useState("");
const [faculty, setFaculty] = useState(['PrF', 'Přírodovědecká fakulta']);
const {data3, setData3} = useFetch3();
const [file, setFile] = useState(null);
const [imageURL, setImageURL] = useState(null);
const [password, setPassword] = useState('');
localStorage.setItem('password', 'drsq89chem');
const [authenticated, setAuthenticated] = useState(false);



useEffect(() => {
    let m = domain.domain+`/teachers/api/faculty/${faculty[0]}`;
          setData3({ ...data3, slug: m });    
setTimeout(()=>{
    }, 100)
  
  }, [faculty])

let imageHandling = (e) => {
  setFile(e.target.files[0])
  setImageURL(URL.createObjectURL(e.target.files[0]));
  }

let handleSubmit = async (e,x) => {

  e.preventDefault();
  const formData = new FormData();
  formData.append('image', file);
  console.log(formData);
  console.log(file.name)

  fetch(domain.domain+'/teachers/api/image', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    fetch(domain.domain+'/teachers/api/teacher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            caption: description,
            imageURL: file.name, //image name
            faculty: faculty[0]
    })})
  })
  .catch(error => {
    console.error(error);
  });
  setTimeout(()=>{
    //window.location.reload();
  }, 250)

    }



//auth

useEffect(() => {
  sessionStorage.setItem('auth', false) //tadyto pak smazat, ať funguje auth
  const timer = setTimeout(() => {
    sessionStorage.setItem('auth', false)
    console.log('logged out')
  }, 15*60*1000);

  if(sessionStorage.getItem('auth')=="true"){
    setAuthenticated(true);
  }
});

      const handleFormSubmit = event => {
        event.preventDefault();
        const savedPassword = domain.hihi;
        if (password === savedPassword) {
          setAuthenticated(true);
          sessionStorage.setItem('auth', true);
        }
      };
    

        if(authenticated == false && sessionStorage.getItem('auth') == 'false' ){
        return (
          <form onSubmit={handleFormSubmit}>
        drsq89chem
            <img src={logo}
             style={{width: '15%', display: 'flex', marginLeft: '42.5%', marginTop: '50px'}}
            ></img>
          <h3
           style={{display: 'flex', marginLeft: '42%', marginTop: '50px'}}
          >Administrátorský dashboard</h3>
          <TextField id="standard-basic" 
            label="Administrátorské heslo" 
            variant="standard"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            sx={{width: '30%', display: 'flex', marginLeft: '35%', marginTop: '15px'}}/><br></br>
            <Button type="submit" sx={{width: '5%', display: 'flex', marginLeft: '48%', marginRight: '45%', marginTop: '15px'}}>Vstoupit</Button>
          </form>
        );
      }    
return(
<div style={{position: 'absolute', top: 0, width: '100%'}}>
<Navbar/>
<div id="MainDashboard"><br></br>
<DashboardNavbar/>
    <h1>Excellentní učitelé</h1><hr></hr>
    <div>
<TextField id="standard-basic" 
    label="Jméno učitele" 
    variant="standard"
    onChange={(e) => setName(e.target.value)}
    sx={{marginLeft: '12.5%', marginTop:'2%', marginRight: '25%', width: '75%', marginBottom:'20px'}}/><br></br>
<TextField id="standard-basic" 
    label="Popis učitele" 
    variant="standard"
    multiline
    onChange={(e) => setDescription(e.target.value)}
    sx={{marginLeft: '12.5%', marginRight: '25%', width: '75%', marginBottom:'20px', overflow:'hidden'}}/><br></br>

<select
  onChange={(e) => setFaculty(e.target.value)}
  style={{width: '73%', marginLeft: '13%', height: '50px', marginTop: '15px'}}>
    <option value={['none','Fakulta']}>Fakulta</option>
    <option value={['PrF','Přírodovědecká fakulta']}>Přírodovědecká fakulta</option>
    <option value={['LF1', '1. Lékařská fakulta']}>1. Lékařská fakulta</option>
    <option value={['LF2', '2. Lékařská fakulta']}>2. Lékařská fakulta</option>
    <option value={['LF3', '3. Lékařská fakulta']}>3. Lékařská fakulta</option>
    <option value={['LFPLZ', 'Lékařská fakulta v Plzni']}>Lékařská fakulta v Plzni</option>
    <option value={['LFHRDC', 'Lékařská fakulta v Hradci Králové']}>Lékařská fakulta v Hradci Králové</option>
    <option value={['FaF', 'Farmaceutická fakulta']}>Farmaceutická fakulta</option>
    <option value={['FSV', 'Fakulta Sociálních věd']}>Fakulta sociálních věd</option>
    <option value={['FHS', 'Fakulta humanitních studií']}>Fakulta humanitních studií</option>
    <option value={['FF', 'Filozofická fakulta']}>Filozofická fakulta</option>
    <option value={['MFF', 'Matematicko-fyzikální fakulta']}>Matematicko-fyzikální fakulta</option>
    <option value={['KTF', 'Katolická teologická fakulta']}>Katolická teologická fakulta</option>
    <option value={['ETF', 'Evangelická teologická fakulta']}>Evangelická teologická fakulta</option>
    <option value={['HTF', 'Husitská teologická fakulta']}>Husitská teologická fakulta</option>
    <option value={['PF', 'Právnická fakulta']}>Právnická fakulta</option>
    <option value={['PEF','Pedagogická fakulta']}>Pedagogická fakulta</option>
    <option value={['FTVS', 'Fakulta tělesné výchovy a sportu']}>Fakulta tělesné výchovy a sportu</option>
  </select>
    <form onSubmit={handleSubmit} style={{marginLeft:'15%', marginBottom:'5%', marginTop:'2%'}}>
      <input type="file" onChange={imageHandling} />
      <Button type="submit" >Přidat učitele</Button>
    </form>
    <ButtonGroup  sx={{marginLeft: '38.5%'}}>


    </ButtonGroup>
    </div>
<br></br>
<Stack direction="row" sx={{maxWidth:'150px', marginTop: '50px'}} spacing={2}>


</Stack>

    
</div>
</div>);
}
export default Dashboard;