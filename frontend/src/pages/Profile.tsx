
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserBlog } from '../hooks';
import BlogCard from '../components/BlogCard';

const Profile = () => {
    const navigate=useNavigate();
    const [username, setusername]=useState("U N");
    useEffect(()=>{
        setusername(localStorage.getItem('username') || "U N")
    },[])
    const { loading, blogs }: { loading: boolean; blogs: Array<{ id: string; author?: { uname?: string; id?:string; }; title: string; content: string; publishedDate?: string }> } = useUserBlog();
    console.log(blogs);
  if (loading) {
    return <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-lg font-semibold">Please wait...</p>
    </div>
  </div>;
  }

  return (
    <div className='mt-16 px-1/5 grid grid-cols-10 h-screen '>
        <div className='col-span-8 border-gray-200 border-e-2 pt-28 pr-16 '>
            <div className='text-4xl text-black font-bold border-b-2 pb-10'>
            {username}
            </div>
            <div className='pt-8'>
                {/* Sho all users published blogs using blog page */}
                <div className="pt-6">
                    <h1 className="text-2xl font-bold">Your published blogs</h1>
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                        <BlogCard
                            key={blog.id} // Assuming each blog has a unique id
                            authorName={blog.author?.uname || "Unknown Author"} // Safeguard if uname is missing
                            title={blog.title}
                            content={blog.content}
                            published={blog.publishedDate || "N/A"} // Show "N/A" if no published date
                            id={blog.id}
                            authorId={blog.author?.id || "Unknown Author ID"}
                        />
                        ))
                    ) : (
                        <p>No blogs available.</p>
                    )}
                </div>
            </div>
        </div>
        <div className='col-span-2'>
            <div className='pt-16 pl-10'>
                <div className="relative inline-flex items-center justify-center w-24 h-24 overflow-hidden rounded-full bg-indigo-300">
                    <span className="font-medium text-black">{
                        username.split(" ").map((item)=>item[0]).join("").toUpperCase()
                        }</span>
                </div>
                <div className="text-black font-medium text-md pl-1 pt-5">{username}</div>
                {/* logout button that clars local storage and navigates to home page / */}
                <button className="underline text-red-400 pl-1 py-1 rounded-md mt-3" onClick={()=>{
                    localStorage.clear();
                    navigate('/');
                }}>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default Profile