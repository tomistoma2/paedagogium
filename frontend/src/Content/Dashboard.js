import Navbar from './Navbar';
import DashboardNavbar from './DashboardNavbar'
import React, { useState, useEffect } from 'react';
import DashboardStyles from '../Styles/DashboardStyles.css';
import { Button, Stack, Grid, TextField, ButtonGroup } from '@mui/material';
import domain from '../Content/domain.json'
import logo from '../Media/logo_violet.png';
import useFetch3 from "../Requester/useFetch3";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';



const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

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
  const [id, setId] = useState("");
  const [hidden, setHidden] = useState(false);
  const [onMain, setOnMain] = useState(false);
  const { data3, setData3 } = useFetch3();
  const [imageName, setImageName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = useState("");
  const [shouldRunHandleSubmit, setShouldRunHandleSubmit] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [password, setPassword] = useState('');
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


  let handleSubmit = async (e) => { 
    try {
      // Save post to the database
      const requestBody = {
        caption: caption,
        contentShort: contentShort,
        content: content,
        date: date,
        onMain: onMain,
        hidden: hidden,
        imageURL: file ? file.name : imageName,
        url: url,
        section: section,
      };
  
      const res = await fetch(domain.domain27017 + "posts/api/id/" + id, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
  
      if (res.status === 200) {
        if (file) {
          const formData = new FormData();
          formData.append('image', file);
          
          const imageRes = await fetch(domain.domain27017 + 'posts/api/image', {
            method: 'POST',
            body: formData
          });
  
          if (imageRes.status === 200) {
            alert("Příspěvek úspěšně zaevidován");
          } else {
            console.error("Image upload failed");
          }
        } else {
          alert("Příspěvek úspěšně zaevidován");
        }
      } else {
        console.error("Request has failed");
      }
    } catch (err) {
      console.error(err);
    }
  }
  

  let handleFetch = async (e) => {
    /*let m = domain.domain27017 + "/posts/api/id/" + id;
    setData3({ ...data3, slug: m });*/


    try {
      //načte data a uloží je do inputů
      let res = await fetch(domain.domain27017 + "posts/api/id/"+id, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setCaption(resJson.caption)
        setContent(resJson.content)
        setSection(resJson.section)
        setContentShort(resJson.contentShort)
        setHidden(resJson.hidden)
        setOnMain(resJson.onMain)
        setDate(resJson.date)
        setUrl(resJson.url)
        setImageName(resJson.imageURL)
      } else {
        setMessage("Request has failed");
      }
    } catch (err) {
      console.log(err);
    }
  }
    let handleDelete = async (e) => {
      try {
        //načte data a uloží je do inputů
        let res = await fetch(domain.domain27017 + "posts/api/id/"+id, {
          method: "DELETE",
          headers: { 'Content-Type': 'application/json' },
        });
        let resJson = await res.json();
        if (res.status === 200) {
          alert('Příspěvek úspěšně smazán')
          setTimeout(()=>{
            window.location.reload();
          }, 250)
        } else {
          setMessage("Request has failed");
        }
      } catch (err) {
        console.log(err);
      }
    }

  const getCurrentTimeISO = () => {
    const now = new Date();
    const isoDate = now.toISOString();
    setDate(isoDate); // Update the state with the new date
    setShouldRunHandleSubmit(true);
  };


  const logout = () => {
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
  return (<div style={{ position: 'absolute', top: 0, width: '100%' }}>
    <Navbar />

    <div id="MainDashboard"
    ><br></br>
      <DashboardNavbar />
      <Button color="error" sx={{marginLeft: '90%'}} onClick={(e) => logout()} variant="contained">Odhlásit se</Button>
      <h1>Upravit příspěvek</h1><hr></hr>
      <p style={{width: '75%', marginLeft: '12.5%'}}>ID je číslo příspěvku, které lze najít v odkazu detailu příspěvku, např. : https://paedagogium.cuni.cz/detail/id/<strong>64a340967a70d4310a797386</strong></p>
      <TextField id="standard-basic"
        label="ID příspěvku"
        variant="standard"
        onChange={(e) => setId(e.target.value)}
        sx={{ width: '75%', marginLeft: '12.5%', marginRight: '25%', marginTop: '25px' }}
      /><Button sx={{ marginLeft: '45%', marginTop: '25px' }} onClick={(e) => handleFetch()}>Hledat příspěvek</Button><br></br>
      
      <FormControlLabel
        control={<IOSSwitch sx={{ m: 1 }} checked={hidden}  onChange={(e) => setHidden(e.target.checked)}/>}
        label="Schovaný"
        sx={{marginLeft: '48%', marginTop: '50px'}}
      />
      <FormControlLabel
        control={<IOSSwitch sx={{ m: 1 }} checked={onMain}  onChange={(e) => setOnMain(e.target.checked)}/>}
        label="Pin na hl. stránku"
        sx={{marginLeft: '48%', marginTop: '50px'}}
      />
      <TextField id="standard-basic"
        label="Titulek"
        variant="standard"
        value={caption}
        focused
        onChange={(e) => setCaption(e.target.value)}
        sx={{ width: '75%', marginLeft: '12.5%', marginRight: '25%', marginTop: '25px' }}
      /><br></br>
      <TextField id="standard-basic"
        label="Krátký popis"
        variant="standard"
        value={contentShort}
        focused
        multiline
        onChange={(e) => setContentShort(e.target.value)}
        sx={{ width: '75%', marginLeft: '12.5%', marginRight: '12.5%', marginTop: '25px' }} /><br></br>
      <TextField id="standard-basic"
        label="Text"
        value={content}
        focused
        multiline variant="standard"
        onChange={(e) => setContent(e.target.value)}
        sx={{ width: '75%', marginLeft: '12.5%', marginRight: '12.5%', marginTop: '25px' }} />
      <p style={{ marginLeft: '10%'}}> Pro speciální formátová textu je nutné využít následující HTML příkazy:</p>
      <ul  style={{ marginLeft: '10%'}}>
        <li>Odřádkování:<code>{` <br></br>`}</code></li>
        <li>Odkaz: <code>{` <a href="ZDE BUDE LINK">ZDE BUDE TEXT, NA KTERÝ SE BUDE KLIKAT</a>`}</code></li>
        <li>Tučně: <b><code>{` <b>TENTO TEXT BUDE TUČNÝ</b>`}</code></b></li>
        <li>Italic: <i><code>{` <i>TENTO TEXT BUDE ITALIC</i>`}</code></i></li>
        <li>Subscript: <sub><code>{` <sub>TENTO TEXT BUDE SUBSCRIPT</sub>`}</code></sub></li>
        <li>Superscript: <sup><code>{` <sup>TENTO TEXT BUDE SUPERSCRIPT</sup>`}</code></sup></li>

      </ul>
      <TextField id="standard-basic"
        label="odkazové url (volitelné)"
        variant="standard"
        value={url}
        focused
        onChange={(e) => setUrl(e.target.value)}
        sx={{ width: '75%', marginLeft: '12.5%', marginRight: '25%', marginTop: '25px' }} /><br></br>


      
        <TextField id="standard-basic"
        label="sekce (pro inspiraci)"
        variant="standard"
        value={section}
        focused
        onChange={(e) => setSection(e.target.value)}
        sx={{ width: '75%', marginLeft: '12.5%', marginRight: '25%', marginTop: '25px' }} /><br></br>
               <ul style={{ marginLeft: '10%'}}>
       <li><strong>Toto měnit POUZE u inspirace!!!</strong></li>
        <li><strong>Kliknutím na sekci se sekce automaticky vpíše do pole</strong></li>
       <li  onClick={(e) => setSection("planning")} >Plánování a příprava výuky: 'planning'</li>     
       <li onClick={(e) => setSection("leadership")}> Vedení výuky: "leadership"</li>
      <li onClick={(e) => setSection("technology")}> Technologie ve výuce: "technology"</li>
       <li onClick={(e) => setSection("feedback")}> Zpětná vazba a hodnocení: "feedback"</li>
        <li onClick={(e) => setSection("support")}> Kolegiální podpora: "support"</li>
        <li onClick={(e) => setSection("reflection")}> Reflexe výuky a profesní rozvoj: "reflection"</li>
</ul><br></br>
      <h4 style={{ marginLeft: '12%', marginTop: '45px' }}>Vložit obrázek (rozlišení 1:1 (aspoň +-))</h4>
      <input type="file" style={{ marginLeft: '12%', marginTop: '5px' }} onChange={(e) => setFile(e.target.files[0])}></input><br></br><br></br>
      <ButtonGroup  sx={{ marginLeft: '40%', marginRight: '40%', marginTop: '25px', marginBottom: '25px' }} variant="contained" aria-label="outlined primary button group">
      <Button onClick={(e) => getCurrentTimeISO()}> Posunout nahoru</Button>
      <Button sx={{marginLeft: '50px'}} onClick={(e) => handleSubmit(e)}
        color="success">Uložit</Button>
      <Button  color="error" sx={{marginLeft: '50px'}} onClick={handleClickOpen}>Smazat</Button>
      </ButtonGroup>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Právě se chystáte smazat příspěvek"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Jste si opravdu jisti, že chcete tento příspěvek smazat?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button color='success' onClick={(e) => handleDelete(e)}>Opravdu smazat</Button>
          <Button color="error" onClick={handleClose} autoFocus>
         
            Nemazat!!!
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  </div>);


}
export default Dashboard;