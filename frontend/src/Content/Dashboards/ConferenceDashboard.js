import Navbar from '../Navbar';
import DashboardNavbar from '../DashboardNavbar'
import React, {useState, useEffect} from 'react';
import {Button, Stack, Grid, TextField, Paper, Typography} from '@mui/material';
import e from 'cors';
import domain from '../../Content/domain.json'
import logo from '../../Media/logo_violet.png';
import useFetch3 from "../../Requester/useFetch3";
import useFetch4 from "../../Requester/useFetch4";
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



const ConferenceDashboard = () => {
const {data3, setData3} = useFetch3();
const {data4, setData4} = useFetch4();
const [open, setOpen] = React.useState(false);
const [content, setContent] = useState("");
const [hidden, setHidden] = useState(false);
const [hiddenInfo, setHiddenInfo] = useState(false);


useEffect(() => {
    let n = domain.domain+"posts/api/section/conference";
    setData4({ ...data4, slug: n });    

    if (data4?.results?.[0]?.content) {
      // Get the TextField element by id "koko"
      const textField = document.getElementById('koko');
      if (textField) {
        // Set the value of the TextField to data3.results[0].content
        textField.value = data4.results[0].content;
        setContent(data4.results[0].content)
      }
        setHidden(data4.results[0].hidden)
        setHiddenInfo(data4.results[1].hidden)

    }
}, [data4.results])

useEffect(() => {
            let m = domain.domain+"users/api";
            setData3({ ...data3, slug: m });    
          }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  let handleDelete = async (e) => {
    try {
      //načte data a uloží je do inputů
      let res = await fetch(domain.domain27017 + "users/api/deleteAllUsers", {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
      });
      let resJson = await res.json();
      if (res.status === 200) {
        alert('Účastníci úspěšně smazáni')
        setTimeout(()=>{
          window.location.reload();
        }, 250)
      } else {
        console.log("Request has failed");
      }
    } catch (err) {
      console.log(err);
    }
  }

  let handleExport = async (e) => {
    try {
      //načte data a uloží je do inputů
      let res = await fetch(domain.domain27017 + "users/api/export-to-excel", {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
      });
      let resJson = await res.json();
      if (res.status === 200) {
        alert('Účastníci úspěšně exportováni')
      } else {
        console.log("Request has failed");
      }
    } catch (err) {
      console.log(err);
    }
  }

const [password, setPassword] = useState('drsq89chem');
const [authenticated, setAuthenticated] = useState(
  localStorage.getItem('authenticated') === 'true'
);
const formatISODateToReadable = (isoDate) =>
  new Date(isoDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

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
let handleSubmit = async (e) => { 
  try {
    // Save post to the database
    const requestBody = {
      content: content,
      hidden: hidden,
    };

    const res = await fetch(domain.domain27017 + "posts/api/id/" + data4.results[0]._id, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (res.status === 200) {
       
      } else{
        console.log("Chyba")
      }
  } catch (err) {
    console.error(err);
  }
  try {
    // Save post to the database
    const requestBody = {
      hidden: hiddenInfo,
    };

    const res = await fetch(domain.domain27017 + "posts/api/id/" + data4.results[1]._id, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (res.status === 200) {
        alert("Údaje ke konferenci byly aktualizovány");
      } else{
        console.log("Chyba")
      }
  } catch (err) {
    console.error(err);
  }
}


const tableHeaderStyle = {
    padding: '8px',
    textAlign: 'left',
    borderBottom: '1px solid #ccc',
    backgroundColor: '#f2f2f2',

  };
  
  const loadingCellStyle = {
    colSpan: '4',
    padding: '8px',
    textAlign: 'left',
  };
  
  const tableCellStyle = {
    padding: '8px',
    textAlign: 'left',
    borderBottom: '1px solid #ccc',
  };
  
//uloží to soubor s názvem v params do docx na server
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
<FormControlLabel
        control={<IOSSwitch id="hehe" sx={{ m: 1 }}  checked={hidden} onChange={(e) => setHidden(e.target.checked)}/>}
        label="Zobrazit záložku Konference"
        sx={{marginLeft: '0%', marginTop: '50px', marginBottom: '25px'}}
      />
<FormControlLabel
        control={<IOSSwitch id="hehe" sx={{ m: 1 }}  checked={hiddenInfo} onChange={(e) => setHiddenInfo(e.target.checked)}/>}
        label="Zobrazit záložku Konference - informace"
        sx={{marginLeft: '0%', marginTop: '50px', marginBottom: '25px'}}
      />
<Typography>Text ke konferenci:</Typography>
<TextField id="koko"
          variant="standard"
          multiline
          onChange={(e) => setContent(e.target.value)}
          sx={{ width: '100%', display: 'flex', marginLeft: '%', marginTop: '10px' }} />
          <Button sx={{marginTop: '25px' }} onClick={(e) => handleSubmit()}>Uložit</Button>
          <br></br>
          <Typography sx={{ marginTop: '50px'}}>Počet přihlášených: {data3.results.length}/80</Typography>
<Paper sx={{ marginTop: '50px', marginBottom: '50px'}}>

<table style={{ width: '100%', borderCollapse: 'collapse' }} className="user-table">
  <thead>
    <tr>
      <th style={tableHeaderStyle}>Jméno</th>
      <th style={tableHeaderStyle}>Příjmení</th>
      <th style={tableHeaderStyle}>Email</th>
      <th style={tableHeaderStyle}>Instituce</th>
      <th style={tableHeaderStyle}>Přihlášení</th>
    </tr>
  </thead>
  <tbody>
    {!data3.results ? (
      <tr>
        <td colSpan="4" style={loadingCellStyle}>Loading...</td>
      </tr>
    ) : (
      data3.results.map(({ _id, name, surname, email, institution, timeOfRegistration }) => (
        <tr key={timeOfRegistration}>
          <td style={tableCellStyle}>{name}</td>
          <td style={tableCellStyle}>{surname}</td>
          <td style={tableCellStyle}>{email}</td>
          <td style={tableCellStyle}>{institution}</td>
          <td style={tableCellStyle}>{formatISODateToReadable(timeOfRegistration)}</td>
        </tr>
      ))
    )}
  </tbody>
</table>
</Paper>

<Button sx={{marginLeft: '25%', marginBottom: '50px'}} onClick={(e) => handleClickOpen(e)} color='error'>Smazat všechny záznamy</Button>
<Button  sx={{marginBottom: '50px'}} color='success' href="https://www.paedagogium.cuni.cz/users/api/export-to-excel">Exportovat do excelu</Button>

<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Právě se chystáte smazat všechny účastníky konference"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Jste si opravdu jisti, že chcete všechno smazat?
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
export default ConferenceDashboard;