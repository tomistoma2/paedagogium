import React, { useState, useEffect } from 'react';
import style from './style.css'
import Navbar from './Navbar';
import logo from '../Media/logo.jpg';
import { styled } from '@mui/material/styles';
import akce from '../Media/akce.jpg';
import Post from './Post'
import inspirace from '../Media/inspirace.jpg';
import effectiveTeaching from '../Media/effectiveTeaching.jpg';
import sciences from '../Media/jjj.jpg';
import veda from '../Media/vedas.jpg';
import background from '../Media/background2.jpg';
import program from '../Media/program.jpg';
import Analytics from './Analytics';
import aboutPed from '../Media/aboutPed.jpg'
import useFetch3 from "../Requester/useFetch3";
import useFetch4 from "../Requester/useFetch4";
import { Typography, Box, Link } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import Footer from '../Content/Footer';
import domain from '../Content/domain.json'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';


const PhotoCarousel = () => {
  
  const [currentIndex, setCurrentIndex] = useState(0);
const redirect = (x) => {
  if(x == "url"){
  }else{
    window.location.href = x;
  }
}
  const {data3, setData3} = useFetch3();





useEffect(() => {
    let m = domain.domain+"posts/api/section/carousel";
          setData3({ ...data3, slug: m });  
    
  }, [])





  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? data3.results.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === data3.results.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
<div>   {data3.results[currentIndex] ? (
      <div className="photo-carousel" style={{ overflow: 'hidden', maxHeight: '400px', position: 'relative', cursor: data3.results[currentIndex].url === "url" ? "default" : "pointer" }}>

      {data3.results.length > 0 ? (
        <React.Fragment>
          <img
            style={{ margin: '0 auto', width: '100%' }}
            onClick={() => redirect(data3.results[currentIndex].url)}
            src={domain.domain + `static/media/${data3.results[currentIndex].caption}`}
            alt="My Image"
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              backgroundColor: 'white',
              borderRadius: '35%',
              padding: '5px'

            }}
            onClick={goToPrevious}
          >
            {<KeyboardDoubleArrowLeftIcon/>}
          </div>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              backgroundColor: 'white',
              borderRadius: '35%',
              padding: '5px'
            }}
            onClick={goToNext}
          >
 {<KeyboardDoubleArrowRightIcon/>}
          </div>
        </React.Fragment>
      ) : (
        <img
          style={{ margin: '0 auto' }}
          src={domain.domain + `static/media/${"carouselPhoto.jpg"}`}
          alt="My Image"
        />
      )}
      </div>
      ) : (
        <div>...</div>
      )}</div>
 
  );
};



const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  '@media(max-width: 2500px)': { height: 150, },
  '@media(max-width: 1600px)': { height: 150, },
  '@media(max-width: 1350px)': { height: 135, },
  '@media(max-width: 1200px)': { height: 120, },
  '@media(max-width: 750px)': { height: 100, },
  '@media(max-width: 550px)': { height: 80, },
  '@media(max-width: 450px)': { height: 60, },
  '@media(max-width: 400px)': { height: 45, },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  textAlign: 'center',
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 2,
  width: 36,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 15px)',
  transition: theme.transitions.create('opacity'),
}));


const Welcome = () => {
  const [page, setPage] = useState(1);


  const {data4, setData4} = useFetch4();

useEffect(() => {
    let n = domain.domain+"posts/api/onMain";
          setData4({ ...data4, slug: n });    
  
  }, [])


  const imgSrc = [
  {
    url: {aboutPed},
    title: 'O Paedagogiu',
    redirect: '/about/main',
  },
  {
    url: {program},
    title: 'Základní kurz',
    redirect: '/courses',
  },
  {
    url: {akce},
    title: 'Akce',
    redirect: '/events',
  },
];

const imgSrc2 = [
  {
    url: {inspirace},
    title: 'Návody a inspirace',
    redirect: '/inspiration',
  },
  {
    url: {veda},
    title: 'Věda',
    redirect: '/science',

  },
];
const imgSrc3 = [
  {
    url: {effectiveTeaching},
    title: 'Efektivní výuka',
    redirect: '/effective-teaching',
  },

];
const themeText = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Calibri',
      textTransform: 'none',
      fontSize: 18,
      '@media(max-width: 1100px)': { fontSize: 16 },
      '@media(max-width: 620px)': { fontSize: 14 },
    },
  },
});

const theme1 = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Calibri',
      textTransform: 'none',
      fontSize: 18,
      '@media(max-width: 1100px)': { fontSize: 14 },
      '@media(max-width: 620px)': { fontSize: 10 },
      '@media(max-width: 450px)': { fontSize: 7 },
      '@media(max-width: 400px)': { fontSize: 5 },
    },
  },
});
// 
//<img src={background} style={{position: 'absolute', zIndex: -10, width: '100%', marginBottom: '500px'}}></img>
  return (
    <div style={{ backgroundImage:`url(${background})`, backgroundRepeat:"repeat", width: '100%', overflow: 'hidden'}}>
      
      <Link
        to="/"
        sx={{
          width: '100px',
          '@media(min-width: 1085px)': {
            display: 'none'
          }
        }}
      >
        <img
          style={{ width: '200px', display: 'block', margin: 'auto', marginBottom: '5px',}}
          src={logo}
          alt="Pedagogoium logo"
          onClick={() => (window.location.href = domain.domain)}
        />
      </Link>
          <Navbar />
          <Analytics/>
      <div style={{ overflow: 'hidden'}}>
        <PhotoCarousel/>
      </div><ThemeProvider theme={themeText}>
      <Box sx={{ width: '70%', margin: '0 auto', overflow: 'hidden', marginTop: '35px', textAlign: 'justify',  '@media(max-width: 800px)' : {width: '90%'}, '@media(max-width: 1200px)' : {width: '80%'}}}>
      <Typography variant="body1" paragraph>
        <strong>Vítejte na stránkách platformy Paedagogium</strong>
      </Typography>
      <Typography variant="body1" paragraph sx={{'@media(max-width: 800px)' : {fontSize: 14}, '@media(max-width: 1200px)' : {fontSize: 16}}}>
        Paedagogium je inovativní platforma a poradní orgán vedení na Univerzitě Karlově, sloužící k rozvoji pedagogických kompetencí a podpoře profesního růstu akademických pracovníků. Jejím posláním je vytvořit prostředí, v němž může akademický pracovník Univerzity Karlovy získat nejen teoretické znalosti, ale i praktické dovednosti a zkušenosti v oblasti vysokoškolské pedagogiky a didaktiky. Paedagogium je místem spoluvytváření, sdílení a inspirace, které vede ke zlepšení výuky a profesnímu růstu akademických pracovníků Univerzity Karlovy.
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Co na této stránce naleznete?</strong>
      </Typography>
      <Typography variant="body1" paragraph sx={{'@media(max-width: 800px)' : {fontSize: 14}, '@media(max-width: 1200px)' : {fontSize: 16}}}>
        Na této stránce naleznete informace o možnostech vzdělávání se v oblasti vysokoškolské pedagogiky a didaktiky, náměty, inspirace a příklady dobré praxe, jakožto i nabídku vzdělávacích programů, seminářů, workshopů či konferencí.
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Proč se vzdělávat v oblasti pedagogických kompetencí?</strong>
      </Typography>
      <Typography variant="body1" paragraph sx={{'@media(max-width: 800px)' : {fontSize: 12}, '@media(max-width: 1200px)' : {fontSize: 16}}}>
        Poznatky z oblasti kognitivních věd a studie různých metod a forem výuky mění naše představy o tom, jak se studenti opravdu učí. Máme nyní k dispozici mnoho studií o tom, jaké metody jsou efektivní k dosažení stanovených vzdělávacích cílů. Tzv. výuka založená na důkazech (Evidence-based teaching) je silně podpořena výzkumem a aplikována na řadě prestižních univerzit.
      </Typography>
      <Typography variant="body1" paragraph sx={{'@media(max-width: 800px)' : {fontSize: 12}, '@media(max-width: 1200px)' : {fontSize: 16}}}>
        Ukazuje se, že kompetence akademického pracovníka provádět špičkový výzkum není možné považovat za záruku toho, že bude stejně dobře vyučovat. Některé metaanalýzy nacházejí nulový vztah mezi výzkumnou a pedagogickou produktivitou. Rozvíjení pedagogických kompetencí v současně rychle se měnícím světě může akademickým pracovníkům pomoci lépe plánovat a organizovat svůj čas a energii, motivovat studenty a za využití rozmanitých metod a forem výuky efektivněji osvojovat znalosti a dovednosti, jakožto i rozvíjet klíčové kompetence pro 21. století.
      </Typography>
      <Typography variant="body1" paragraph sx={{'@media(max-width: 800px)' : {fontSize: 14}, '@media(max-width: 1200px)' : {fontSize: 16}}}>
        <strong>Jaké by mohly být důsledky nedostatku rozvinutých pedagogických kompetencí u vysokoškolských vyučujících?</strong>
      </Typography>
      <Typography variant="body1" paragraph sx={{'@media(max-width: 800px)' : {fontSize: 14}, '@media(max-width: 1200px)' : {fontSize: 16}}}>
        Nedostatek pedagogických kompetencí u vysokoškolských vyučujících by mohl mít negativní důsledky na kvalitu výuky a vzdělávací výsledky studujících. Výuka vedená kvalifikovaným odborníkem, nicméně bez pedagogických dovedností, může v důsledku neschopnosti srozumitelně vysvětlit složité koncepty vést ke ztrátě zájmu o studovaný obor, případně ke ztrátě motivace studujících o studium jako takové.
      </Typography>
    </Box></ThemeProvider>
    <Box sx={{width: '70%', margin: '0 auto', marginTop: '10px', marginBottom: '10px'}}>
        {data4.results.length == 0
  ? <div></div>
  :
<Box sx={{maxWidth: '100%'}}><h2>Nadcházející akce</h2></Box>}
        </Box>
    <Box sx={{width: '70%', margin: '0 auto', marginTop: '1px', marginBottom: '10px'}}>
        {!data4.results
  ? "Loading..."
  :
    data4.results
      .filter(post => !post.hidden) // Filter out posts with hidden set to true
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort posts by date in descending order
      .slice((page - 1) * 10, (page - 1) * 10 + 10)
      .map(({ _id, caption, contentShort, content, section, url, date, imageURL }) => (
        <Post
          caption={caption}
          contentShort={contentShort}
          content={content}
          imageURL={imageURL}
          url={url}
          key={date}
          _id={_id}
        ></Post>
      ))}
        </Box>
        <Box sx={{width: '70%', margin: '0 auto', marginLeft: '70%', marginBottom: '10px','@media(max-width: 650px)': {marginLeft: '50%'}}}>
        {data4.results.length == 0
  ? <div></div>
  :
<Box><a href="events">Přejít na všechny akce...</a></Box>}
        </Box>
    <ThemeProvider theme={theme1}>
        <Box sx={{ width: '60%', marginLeft: '20%', '@media(max-width: 1000px)': { width: '80%', marginLeft: '10%'}, marginRight: '20%', overflow: 'hidden', marginTop: '35px',display: 'flex', '@media(max-width: 800px)' : {display: 'none'}}}>
    <Box sx={{ marginRight: '10px', textAlign: 'center'}}>
        <ImageButton
          focusRipple
          key={imgSrc[0].title}
          href={imgSrc[0].redirect}
          sx={{width: '87%', marginLeft: '45px', '@media(max-width: 1300px)': {marginLeft: '30px'}}}
          >
          <img src={aboutPed}></img>
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 10,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {imgSrc[0].title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
    </Box>
    <Box style={{marginRight: '10px', textAlign: 'center'}}>
        <ImageButton
          focusRipple
          key={imgSrc[1].title}
          href={imgSrc[1].redirect}>
          <img src={program}></img>
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {imgSrc[1].title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
    </Box>
    <Box sx={{marginRight: '10px', textAlign: 'center'}}>
        <ImageButton
     
          focusRipple
          key={imgSrc[2].title}
          href={imgSrc[2].redirect}>
          <img src={akce}></img>
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {imgSrc[2].title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
    </Box>
        </Box>
        <Box sx={{ width: '40%', '@media(max-width: 1000px)': { width: '60%', marginLeft: '20%'}, marginLeft: 'auto', marginRight: 'auto', overflow: 'hidden', marginTop: '15px', display: 'flex', justifyContent: 'center', '@media(max-width: 800px)' : {display: 'none'}}}>
        <Box sx={{ flex: '1', marginRight: '10px' }}>
        <ImageButton
          focusRipple
          key={imgSrc3[0].title}
          href={imgSrc3[0].redirect}>
          <img src={inspirace}></img>
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {imgSrc2[0].title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
    </Box>
    <Box sx={{ flex: '1', marginRight: '10px' }}>
        <ImageButton
          focusRipple
          key={imgSrc2[1].title}
          href={imgSrc2[1].redirect}>
          <img src={sciences}></img>
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {imgSrc2[1].title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
    </Box></Box> 
    <Box sx={{ width: '20%', '@media(max-width: 1000px)': { width: '60%', marginLeft: '20%'}, marginLeft: 'auto', marginRight: 'auto', overflow: 'hidden', marginTop: '15px', display: 'flex', justifyContent: 'center', '@media(max-width: 800px)' : {display: 'none'}}}>
        <Box sx={{ flex: '1', marginRight: '10px' }}>
        <ImageButton
          focusRipple
          key={imgSrc3[0].title}
          href={imgSrc3[0].redirect}>
          <img src={effectiveTeaching}></img>
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {imgSrc3[0].title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
    </Box>
</Box> 
        
        <Footer></Footer></ThemeProvider>
    </div>
  );
};

export default Welcome;
