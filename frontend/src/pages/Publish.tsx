
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Publish = () => {
    const [title, settitle] = useState("");
    const [content, setcontent] = useState("");
    const navigate=useNavigate();

    return (
        <div className='mt-36 mx-1/5'>
            <form>
                <div className="relative z-0 w-full mb-5 group">
                    <textarea
                        name="floating_title"
                        id="floating_title"
                        className="block py-2.5 px-0 w-full text-4xl font-semibold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer resize-none overflow-hidden scrollbar-hide" // Add scrollbar-hide class
                        placeholder=" "
                        required
                        rows={1} // Initial row count
                        onChange={(e) => {
                            settitle(e.target.value);
                            e.target.style.height = 'auto'; // Reset height
                            e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height dynamically
                        }}
                    ></textarea>
                    <label htmlFor="floating_title" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Title
                    </label>
                </div>
                <div className="relative z-0 w-full mt-12 group">
                    <textarea
                        name="floating_content"
                        id="floating_content"
                        className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer resize-none overflow-hidden scrollbar-hide" // Add scrollbar-hide class
                        placeholder=" "
                        required
                        rows={1} // Initial row count
                        onChange={(e) => {
                            setcontent(e.target.value);
                            e.target.style.height = 'auto'; // Reset height
                            e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height dynamically
                        }}
                    ></textarea>
                    <label htmlFor="floating_content" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Content
                    </label>
                </div>
                <button type="button" className="text-white bg-gradient-to-br from-gray-800 to-gray-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2 text-center mt-12"
                onClick={async()=>{
                    const res=await axios.post("https://backend.shubhamapcollege.workers.dev/api/v1/blog",{title,content},{
                        headers:{
                            "authorization":localStorage.getItem('token')
                        }
                    });
                    //if res status code 201 show an alert succesful etc and then navigate to /blogs
                    if(res.status===201){
                        alert("Blog published successfully");
                        navigate("/blogs")
                    }else{
                        alert("Failed to publish blog");
                    }
                }}
                >
                    Publish
                </button>
            </form>
        </div>
    );
}

export default Publish;
