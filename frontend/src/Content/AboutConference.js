import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import AboutNavbar from './AboutNavbar';
import useFetch3 from "../Requester/useFetch3";
import useFetch4 from "../Requester/useFetch4";
import domain from '../Content/domain.json'
import { Stack, Paper, TextField, Button, Typography, ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
import Footer from '../Content/Footer';
import background from '../Media/background2.jpg';
import Link from '@mui/material/Link';
import logo from '../Media/logo.jpg';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Analytics from './Analytics';

const AboutConference = () => {
  const { data3, setData3 } = useFetch3();
  const { data4, setData4 } = useFetch4();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("");
  const [open, setOpen] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [language, setLanguage] = useState("czech");
  const [institutionError, setInstitutionError] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    let m = domain.domain + "users/api";
    setData3({ ...data3, slug: m });
    let n = domain.domain + "posts/api/section/conference";
    setData4({ ...data4, slug: n });
  }, []);

  



  let handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    // Validate the fields
    if (!/^[A-Za-zěščřžýáíéĚŠČŘŽÝÁÍÉěščřžýáíéĚŠČŘŽÝÁÍÉůúÚŮóÓ]+$/.test(name)) {
      setNameError(true);
      return;
    }
    setNameError(false);

    if (!/^[A-Za-zěščřžýáíéĚŠČŘŽÝÁÍÉěščřžýáíéĚŠČŘŽÝÁÍÉůúÚŮóÓ.-\s]+$/.test(institution)) {
      setInstitutionError(true);
      return;
    }
    setInstitutionError(false);

    if (!/^[A-Za-zěščřžýáíéĚŠČŘŽÝÁÍÉěščřžýáíéĚŠČŘŽÝÁÍÉůúÚŮóÓ]+$/.test(surname)) {
      setSurnameError(true);
      return;
    }
    setSurnameError(false);

    if (!/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/.test(email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);

    try {
      // Save post to the database
      const requestBody = {
        name: name,
        surname: surname,
        email: email,
        institution: institution
      };

      const res = await fetch(domain.domain27017 + "users/api/user", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (res.status === 201) {
        console.log("Request was successful");
        setOpen(true);
      } else {
        console.error("Request has failed");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: "repeat"}}>
      <Link to="/" sx={{ width: '100px', '@media(min-width: 1085px)': { display: 'none' } }}>
        <img style={{ width: '200px', display: 'block', margin: 'auto', marginBottom: '5px', }} src={logo} alt="Pedagogoium logo"
          onClick={() => (window.location.href = domain.domain)} />
      </Link>
      <Navbar></Navbar>
      <Box sx={{ left: '80px', '@media(max-width: 1400px)': { position: 'relative', marginLeft: '30%', marginBottom: '150px' }, '@media(max-width: 900px)': { position: 'relative', marginLeft: '20%', '@media(max-width: 600px)': { position: 'relative', marginLeft: '12%' }, '@media(max-width: 500px)': { position: 'relative', marginLeft: '-8%' } } }} ><AboutNavbar></AboutNavbar></Box>
      <Paper sx={{ width: '55%', display: 'block', margin: 'auto', marginTop: '50px', padding: '35px', '@media(max-width: 1400px)': { marginTop: '275px', width: '90%' }}}>
      {data4.results[0]?.content && (
  <Typography sx={{ textAlign: 'justify', padding: '5px', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: data4.results[0].content }}>

  </Typography>
)}
<ToggleButtonGroup
  color="primary"
  exclusive
  aria-label="Platform"
  value={language}
  onChange={(event, newLanguage) => setLanguage(newLanguage)}
>
  <ToggleButton value="czech">Česky</ToggleButton>
  <ToggleButton value="english">English</ToggleButton>
</ToggleButtonGroup>


{language == "english"
  ? <Box>
  <TextField
    id="standard-basic"
    label="Name"
    inputProps={{
      inputMode: 'text', // Use 'text' for text input
      pattern: '/^[A-Za-zěščřžýáíéĚŠČŘŽÝÁÍÉěščřžýáíéĚŠČŘŽÝÁÍÉůúÚŮóÓ]+$/'


    }}
    variant="standard"
    value={name}
    onChange={(e) => setName(e.target.value)}
    error={nameError}
    helperText={nameError ? "Name cannot consist of numbers, special symbols and cannot be empty." : ""}
    sx={{ width: '75%', marginLeft: '12.5%', marginRight: '25%', marginTop: '25px' }}
  /><br></br>
  <TextField
    id="standard-basic"
    label="Surname"
    inputProps={{
      inputMode: 'text', // Use 'text' for text input
      pattern: '/^[A-Za-zěščřžýáíéĚŠČŘŽÝÁÍÉěščřžýáíéĚŠČŘŽÝÁÍÉůúÚŮóÓ]+$/'
    }}
    variant="standard"
    value={surname}
    onChange={(e) => setSurname(e.target.value)}
    error={surnameError}
    helperText={surnameError ? "Surname cannot consist of numbers, special symbols and cannot be empty." : ""}
    sx={{ width: '75%', marginLeft: '12.5%', marginRight: '25%', marginTop: '25px' }}
  /><br></br>
  <TextField
    id="standard-basic"
    label="Email"
    InputProps={{
      inputMode: 'email', // Use 'email' for email validation
      pattern: '^[a-zA-ZěščřžýáíéĚŠČŘŽÝÁÍÉ0-9._%+-]+@[a-zA-ZěščřžýáíéĚŠČŘŽÝÁÍÉ0-9.-]+\\.[a-zA-ZěščřžýáíéĚŠČŘŽÝÁÍÉ]{2,4}$',

    }}
    variant="standard"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    error={emailError}
    helperText={emailError ? "Email adress is not valid" : ""}
    sx={{ width: '75%', marginLeft: '12.5%', marginRight: '25%', marginTop: '25px' }}
  /><br></br>
  <TextField
    id="standard-basic"
    inputProps={{
      inputMode: 'text', // Use 'text' for text input
      pattern: '/^[A-Za-zěščřžýáíéĚŠČŘŽÝÁÍÉěščřžýáíéĚŠČŘŽÝÁÍÉůúÚŮóÓ.-\s]+$/'
    }}
    error={institutionError}
    label="Institution"
    variant="standard"
    value={institution}
    onChange={(e) => setInstitution(e.target.value)}
    sx={{ width: '75%', marginLeft: '12.5%', marginRight: '25%', marginTop: '25px', marginBottom: '50px' }}
  /><br></br>
  {data3?.results?.length > 80 ? (
<Typography sx={{padding: '35px', borderStyle: 'solid', borderColor: 'red', marginTop: '25px', borderRadius: '20px'}}> <strong> The capacity for the Paedagogium international conference has been reached.</strong><br></br><br></br>

Thank you for your interest in attending the international conference. Unfortunately, the maximum capacity for in-person participants has been reached. You can register as a replacement participant. If capacity becomes available, we will inform you. You can also follow the conference online.
</Typography>
) : null}<br></br>
<strong style={{width: '90%', fontSize: '15px', marginLeft: '40px'}}>By registering, I acknowledge the following: </strong><br></br><br></br>
<Typography sx={{width: '90%', fontSize: '12px', textAlign: 'justify', margin: '0 auto'}}>During the conference, photographs, audio, and visual recordings may be taken. Photographs, as well as audio and visual recordings, will be taken and used reasonably in accordance with the news license under § 89 of the Civil Code (for scientific or artistic purposes, for press, radio, television, or similar news reporting). Reasonable distribution will also occur through the internet (Charles University, its faculties and other components websites, Paedagogium websites) and social media (Facebook, Instagram, Twitter, LinkedIn).</Typography>
<br></br><Typography sx={{width: '90%', fontSize: '12px', textAlign: 'justify', margin: '0 auto'}}>Charles University will process the personal data, including i) first name, ii) last name, iii) email address, iv) institution, v) appearance, and vi) voice. The processing of the personal data by the administrator (Charles University) will occur in the case of first name, last name, and email address for the purpose of registration and participation in the event, and the legal basis for processing will be a contract (registration for the event). Information about the institution will be processed by the administrator (Charles University) for statistical purposes, and the legal basis for processing will be the legitimate interest of the administrator. The processing of personal data about your appearance or voice for the purpose of informing about the conference will occur based on the legitimate interest of the administrator. The administrator will process your personal data until the end of the fifth calendar year following the year of the conference. Further information about the processing of personal data at Charles University, including your rights in the processing of personal data, can be found <a href="https://cuni.cz/UK-9056.html">here.</a></Typography>
  <Button sx={{ marginLeft: '45%', marginTop: '60px', paddingBottom: '40px' }} onClick={(e) => handleSubmit(e)}>Register</Button></Box>
  :
<Box>
        <TextField
          id="standard-basic"
          label="Jméno"
          inputProps={{
            inputMode: 'text', // Use 'text' for text input
            pattern: '/^[A-Za-zěščřžýáíéĚŠČŘŽÝÁÍÉěščřžýáíéĚŠČŘŽÝÁÍÉůúÚŮóÓ]+$/'



          }}
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameError}
          helperText={nameError ? "Jméno nemůže obsahovat čísla, speciální znaky a nemůže být prázdné" : ""}
          sx={{ width: '75%', marginLeft: '12.5%', marginRight: '25%', marginTop: '25px' }}
        /><br></br>
        <TextField
          id="standard-basic"
          label="Příjmení"
          inputProps={{
            inputMode: 'text', // Use 'text' for text input
            pattern:  '/^[A-Za-zěščřžýáíéĚŠČŘŽÝÁÍÉěščřžýáíéĚŠČŘŽÝÁÍÉůúÚŮóÓ]+$/'

          }}
          variant="standard"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          error={surnameError}
          helperText={surnameError ? "Příjmení nemůže obsahovat čísla, speciální znaky a nemůže být prázdné" : ""}
          sx={{ width: '75%', marginLeft: '12.5%', marginRight: '25%', marginTop: '25px' }}
        /><br></br>
        <TextField
          id="standard-basic"
          label="Email"
          InputProps={{
            inputMode: 'email', // Use 'email' for email validation
            pattern: '^[a-zA-ZěščřžýáíéĚŠČŘŽÝÁÍÉ0-9._%+-]+@[a-zA-ZěščřžýáíéĚŠČŘŽÝÁÍÉ0-9.-]+\\.[a-zA-ZěščřžýáíéĚŠČŘŽÝÁÍÉ]{2,4}$',

          }}
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          helperText={emailError ? "Neplatná emailová adresa." : ""}
          sx={{ width: '75%', marginLeft: '12.5%', marginRight: '25%', marginTop: '25px' }}
        /><br></br>
        <TextField
          id="standard-basic"
          inputProps={{
            inputMode: 'text', // Use 'text' for text input
            pattern: '/^[A-Za-zěščřžýóáíéĚŠČŘŽÝÁÍÉěščřžýáíéĚŠČŘŽÝÁÍÉůúÚŮóÓ1234567890\s]+$/'
          }}
          error={institutionError}
          label="Instituce"
          variant="standard"
          value={institution}
          helperText={institutionError ? "Instituce nemůže obsahovat speciální znaky a nemůže být prázdné" : ""}
          onChange={(e) => setInstitution(e.target.value)}
          sx={{ width: '75%', marginLeft: '12.5%', marginRight: '25%', marginTop: '25px', marginBottom: '50px' }}
        /><br></br>

<div>
  {data3?.results?.length > 80 ? (
    <Typography
      sx={{
        padding: '35px',
        borderStyle: 'solid',
        borderColor: 'red',
        marginTop: '25px',
        borderRadius: '20px',
      }}
    >
      <strong>
        {language === "czech"
          ? "Kapacita mezinárodní konference platformy Paedagogium byla naplněna."
          : "The capacity for the Paedagogium international conference has been reached."}
      </strong>
      <br />
      <br />
      {language == "english"
        ? "Děkujeme Vám za zájem o účast na mezinárodní konferenci. Bohužel maximální kapacita účastníků konference pro prezenční účast byla naplněna. Můžete se zaregistrovat jako náhradník. V případě, že se uvolní kapacita, budeme Vás informovat. Konference je možné také sledovat v živém přenosu."
        : "Děkujeme Vám za zájem o účast na mezinárodní konferenci. Bohužel maximální kapacita účastníků konference pro prezenční účast byla naplněna. Můžete se zaregistrovat jako náhradník. V případě, že se uvolní kapacita, budeme Vás informovat. Konference je možné také sledovat v živém přenosu."}
    </Typography>
  ) : null}
</div>


  
  <br></br>
  <strong style={{width: '90%', fontSize: '15px', marginLeft: '40px'}}>Provedením registrace beru na vědomí následující informace: </strong><br></br><br></br>
  <Typography sx={{width: '90%', fontSize: '12px', textAlign: 'justify', margin: '0 auto'}}>V rámci průběhu konference platformy Paedagogium mohou být pořizovány fotografie, zvukové a obrazové záznamy. Fotografie, jakož i zvukové a obrazové záznamy budu přiměřeným způsobem pořízeny a použity ve smyslu tzv. zpravodajské licence podle § 89 občanského zákoníku (k vědeckým nebo uměleckým účelům, pro tiskové, rozhlasové, televizní nebo obdobné zpravodajství). K přiměřenému šíření bude docházet také prostřednictvím internetu (internetové stránky Univerzity Karlovy, jejích fakult a ostatních součástí, internetové stránky platformy Paedagogium) a sociálních sítí (Facebook, Instagram, Twitter, LinkedIn).  </Typography>
  <br></br><Typography sx={{width: '90%', fontSize: '12px', textAlign: 'justify', margin: '0 auto'}}>Univerzita Karlova bude zpracovávat Vaše osobní údaje, a to i) jméno, ii) příjmení, iii) e-mailovou adresu, iv) instituci, v) podobu a případně vi) hlas. Ke zpracování Vašich osobních údajů bude ze strany správce (Univerzita Karlova) docházet v případě jména, příjmení a e-mailové adresy za účelem registrace a účasti na akci, titulem zpracování bude smlouva (registrování se na akci). Informaci k instituci bude správce (Univerzita Karlova) zpracovávat pro statistické účely, titulem zpracování bude oprávněný zájem správce. Ke zpracování osobních údajů o Vaší podobě, případně hlasu za účelem informování o konferenci, bude docházet ze strany správce z titulu oprávněného zájmu. Vaše osobní údaje bude správce zpracovávat do konce pátého kalendářního roku následujícího po roce konání konference. Další informace ke zpracování osobních údajů na Univerzitě Karlově včetně Vašich práv při zpracování osobních údajů lze nalézt <a href="https://cuni.cz/UK-9056.html">zde.</a></Typography>
        <Button sx={{ marginLeft: '45%', marginTop: '60px', paddingBottom: '40px' }} onClick={(e) => handleSubmit(e)}>Přihlásit se</Button></Box>}
      </Paper>
      <Footer></Footer>
      <Dialog
  open={open}
  onClose={handleClose}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">
    {/* You can set the dialog title here */}
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      {language === 'english' ? (
        "Hello, thank you for your registration for the Paedagogium international conference. We will soon send you an email with all the important conference-related information."
      ) : (
        "Dobrý den, děkujeme za Vaši registraci k prezenční účasti na mezinárodní konferenci platformy Paedagogium. Brzy Vám zašleme e-mail s veškerými důležitými informacemi týkajícími se konference."
      )}
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button color="success" onClick={handleClose} autoFocus>
      {language === 'english' ? 'Okay' : 'V pořádku'}
    </Button>
  </DialogActions>

</Dialog>

With this code, the dialog title and button label will also change based on the selected language, ensuring that the entire dialog is rendered in the appropriate language.

   <Analytics/> </div>
  );
}

export default AboutConference;
