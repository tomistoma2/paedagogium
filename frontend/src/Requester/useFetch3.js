import {useState, useEffect} from "react";
import searchbar3 from "./searchbar3";

const useFetch3 = () => {
    const[data3, setData3] = useState({
        slug: "",
        results: [],
    });

    useEffect(() => {
if(data3.slug !== ""){
    const timeoutId = setTimeout(() => {
        const fetch3 = async () => {
            try{
                const res = await searchbar3.get(`${data3.slug}`);
                setData3({ ...data3, results: res.data/*.message*/});   
            }catch(err){
                console.error(err);
            }
        };
        fetch3();
    }, 500);
    return () => clearTimeout(timeoutId);
}
    }, [data3.slug]);
    return {data3, setData3};
}

export default useFetch3;