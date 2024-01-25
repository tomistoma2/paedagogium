import {React, useState, useEffect} from 'react';
import Navbar from './Navbar'
import PostTeacher from './PostTeacher'
import ExcellentTeachersStyles from '../Styles/ExxcelentTeachersStyles.css';
import {Paper, Button, Stack } from '@mui/material';
import wide from '../Media/wideC.jpg';
import oblicej from '../Media/hans.jpg';
import useFetch3 from "../Requester/useFetch3";
import domain from '../Content/domain.json'
import Footer from '../Content/Footer';

const ExcellentTeachers = (url) => {
  const [faculty, setFaculty] = useState(['PrF', 'Přírodovědecká fakulta']);
  const {data3, setData3} = useFetch3();
  useEffect(() => {
    let m = domain.domain+`/teachers/api`;
          setData3({ ...data3, slug: m });    
setTimeout(()=>{
    }, 100)
  
  }, [faculty])
return(<div>
  <img style={{opacity: '1', position: 'absolute', zIndex: '-5'}} src={wide}></img>
<Navbar/><br></br>
<Paper sx={{width: '35%', marginLeft: '58%', marginTop: '180px', height:'fit-content', opacity: '0.7'}}>
  <h2 style={{paddingLeft: '25px',paddingTop: '25px', paddingBottom: '-10px'}}>EXCELENTNÍ UČITELÉ</h2>
  <p style={{padding: '25px', textAlign: 'justify'}}>Program excelentních učitelů je iniciativa univerzity, která si klade za cíl odměňovat nejlepší pedagogy na základě kvality jejich výuky a úspěchů studentů. Tento program je založen na pravidelném hodnocení učitelů studenty a dalšími kolegy, kteří posuzují pedagogické dovednosti a schopnosti učitele.

Každý rok je zvolen jeden učitel, který získá titul excelentního učitele roku a také finanční odměnu. Tato ocenění jsou udělována na základě mnoha kritérií, jako je například přístup k studentům, schopnost předávání znalostí, zapojení studentů do výuky, inovativní přístup k výuce a mnoho dalších.

Excelentní učitelé jsou vzorem pro ostatní učitele na univerzitě a pomáhají vytvářet pozitivní a podpůrné prostředí pro studenty. Program excelentních učitelů také podporuje učitele v jejich dalším profesním růstu a rozvoji, a tím přispívá k neustálému zlepšování výuky na univerzitě.</p>
</Paper>
<Button sx={{width: '35%', marginLeft: '58%', height:'fit-content', marginBottom: '180px'}} variant="contained"
 onClick={() => window.scroll({top: 1000, behavior: 'smooth'})}
>Přejít na nejlepší učitele</Button>
{!data3.results ? "Loading..." : data3.results.map(({ _id, caption, name, faculty, date, imageURL}) =>         
<PostTeacher imageURL={imageURL} caption={caption} name={name}/>)}
<Footer></Footer>
</div>);
}
export default ExcellentTeachers;