/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react"


export const useBlogs=()=>{
    const [loading,setloading]=useState(true);
    const [blogs,setBlogs]=useState([]);
    //https://backend.shubhamapcollege.workers.dev/api/v1/blog

    useEffect(()=>{
        axios.get("https://backend.shubhamapcollege.workers.dev/api/v1/blog",{
            headers:{
                "authorization":localStorage.getItem('token')
            }
        }).then((res)=>{
            setBlogs(res.data);
            setloading(false);
        }).catch((err)=>{
            console.log(err);
            setloading(false);
        })
    },[])
    return {loading,blogs};
}