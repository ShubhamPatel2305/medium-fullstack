/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUser } from '../hooks';
import BlogCard from '../components/BlogCard';

const OthersProfile = () => {
    const navigate=useNavigate();
    const [username, setusername]=useState("U N");
    const { id } = useParams<{ id: string }>();
    const userId = id || ''; // Provide a default value if id is undefined
    
    const { loading, blogs }: { loading: boolean; blogs: Array<{ id: string; author?: { uname?: string; id?:string; }; title: string; content: string; publishedDate?: string }> } = useGetUser(userId);
    console.log(blogs);
  if (loading) {
    return <div className="mt-24 px-1/5">Loading...</div>;
  }

  return (
    <div className='mt-16 px-1/5 grid grid-cols-10 h-screen '>
        <div className='col-span-8 border-gray-200 border-e-2 pt-28 pr-16 '>
            <div className='text-4xl text-black font-bold border-b-2 pb-10'>
            {blogs[0].author?.uname}
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
                <div className="relative inline-flex items-center justify-center w-24 h-24 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-gray-600 dark:text-gray-300">{
                        (blogs[0].author?.uname || "U N").split(" ").map((item)=>item[0]).join("").toUpperCase()
                        }</span>
                </div>
                <div className="text-black font-medium text-md pl-1 pt-5">{blogs[0].author?.uname}</div>
            </div>
        </div>
    </div>
  )
}

export default OthersProfile