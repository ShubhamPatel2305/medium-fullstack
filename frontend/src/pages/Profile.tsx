/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Blog from './Blog';
import { useUserBlog } from '../hooks';
import BlogCard from '../components/BlogCard';

const Profile = () => {
    const navigate=useNavigate();
    const [username, setusername]=useState("U N");
    useEffect(()=>{
        setusername(localStorage.getItem('username') || "U N")
    },[])
    const { loading, blogs }: { loading: boolean; blogs: Array<{ id: string; author?: { uname?: string }; title: string; content: string; publishedDate?: string }> } = useUserBlog();

  if (loading) {
    return <div className="mt-24 px-1/5">Loading...</div>;
  }

  return (
    <div className='mt-16 px-1/5 grid grid-cols-10 h-screen '>
        <div className='col-span-7 border-gray-200 border-e-2 pt-28 pr-16 '>
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
                        />
                        ))
                    ) : (
                        <p>No blogs available.</p>
                    )}
                </div>
            </div>
        </div>
        <div className='col-span-3'>
            <div className='pt-16 pl-10'>
                <div className="relative inline-flex items-center justify-center w-24 h-24 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-gray-600 dark:text-gray-300">{
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