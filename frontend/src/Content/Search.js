import React, {useState, useEffect} from 'react';
import {CardContent, TextField, Button, Pagination, Box} from '@mui/material';
import domain from '../Content/domain.json'
import Navbar from './Navbar'
import useFetch3 from "../Requester/useFetch3";
import Post from './Post'
import Footer from '../Content/Footer';
import Link from '@mui/material/Link';
import logo from '../Media/logo.jpg';

let Search = () => {
    const {data3, setData3} = useFetch3();
    const [string, setString] = useState('');
    const [page, setPage] = useState(1);
    const [searched, setSearched] = useState(false);

console.log(data3.results)

let handleChange = () => {
    if(string != ""){
    let m = domain.domain27017+"search/api/string/"+string;
    setData3({ ...data3, slug: m });
    setSearched(true); 
}}

   return(<div>
            <Link to="/" sx={{width: '100px', '@media(min-width: 1085px)': { display: 'none'}}}>
    <img style={{ width: '200px', display: 'block', margin: 'auto', marginBottom: '5px',}} src={logo} alt="Pedagogoium logo"
      onClick={() => (window.location.href = domain.domain)}/>
  </Link>
    <Navbar></Navbar>
    <TextField id="standard-basic" 
    label="Hledat" 
    variant="standard"
    onChange={(e) => setString(e.target.value)}
    sx={{width: '30%', margin: '0 auto', marginLeft: '35%', marginTop: '50px'}}/><br></br><Button  onClick={handleChange} sx={{marginTop: '50px', marginLeft: '48%'}}>Hledat</Button><br></br><br>
    </br>
    <Box sx={{margin: '0 auto', width: '70%',marginTop: '50px', '@media(max-width: 1000px)': { width: '85%'}}}>
    {searched === true ?
  (data3.results.length === 0 ? 
    <Box sx={{margin: '0 auto', textAlign: 'center'}}>Bez výsledků</Box> :
    data3.results.slice(0).filter(item => !item.hidden).reverse().slice((page-1)*10,(page-1)*10+10).map(({ _id, caption, contentShort, content, section, url, date, imageURL, hidden}) =>
      <Post caption={caption} contentShort={contentShort} content={content} imageURL={imageURL} url={url} key={_id} _id={_id}></Post>
    )
  ) : null
}
            <div style={{display: 'block', width: 'fit-content', margin: 'auto'}}><br></br>    <Pagination count={Math.ceil((data3.results.length)/10)} page={page} onChange={handleChange} sx={{paddingBottom: '30px'}}/></div>
    </Box><Footer></Footer>
       </div>
      );
}

export default Search;