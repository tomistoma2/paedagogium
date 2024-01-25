import {useState, useEffect} from "react";
import searchbar3 from "./searchbar3";

const useFetch4 = () => {
    const[data4, setData4] = useState({
        slug: "",
        results: [],
    });

    useEffect(() => {
if(data4.slug !== ""){
    const timeoutId = setTimeout(() => {
        const fetch4 = async () => {
            try{
                const res = await searchbar3.get(`${data4.slug}`);
                setData4({ ...data4, results: res.data/*.message*/});   
            }catch(err){
                console.error(err);
            }
        };
        fetch4();
    }, 500);
    return () => clearTimeout(timeoutId);
}
    }, [data4.slug]);
    return {data4, setData4};
}

export default useFetch4;