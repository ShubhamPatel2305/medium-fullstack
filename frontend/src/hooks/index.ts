/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useCallback, useEffect, useState } from "react"


const useBlogs=()=>{
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

interface Blog {
    title: string;
    content: string;
    publishedDate: string;
    author: {
      uname: string;
    };
  }
  

  const useBlog = (id: string) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog | undefined>(undefined); // Type the blog state
  
    useEffect(() => {
      axios
        .get(`https://backend.shubhamapcollege.workers.dev/api/v1/blog/${id}`, {
          headers: {
            authorization: localStorage.getItem("token") || "", // Ensure token is passed
          },
        })
        .then((res) => {
          setBlog(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }, [id]);
  
    return { loading, blog };
  };
  
  const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
  
    const checkAuthStatus = useCallback(async () => {
      const token = localStorage.getItem('token');
      const storedUsername = localStorage.getItem('username');
  
      if (token && storedUsername) {
        try {
          const response = await axios.get('/api/verifytoken', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.status === 200) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
          } else {
            setIsLoggedIn(false);
            setUsername('');
            localStorage.removeItem('token');
            localStorage.removeItem('username');
          }
        } catch (error) {
          console.error('Error verifying token:', error);
          setIsLoggedIn(false);
          setUsername('');
          localStorage.removeItem('token');
          localStorage.removeItem('username');
        }
      } else {
        setIsLoggedIn(false);
        setUsername('');
      }
    }, []);
  
    useEffect(() => {
      checkAuthStatus();
    }, [checkAuthStatus]);
  
    return { isLoggedIn, username, checkAuthStatus };
  };


export {useBlog,useBlogs,useAuth}