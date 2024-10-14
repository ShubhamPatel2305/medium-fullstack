import { useBlog } from '../hooks';
import { useParams } from 'react-router-dom';

const Blog = () => {
  // Get the id from the URL params
  const { id } = useParams<{ id: string }>(); // Define the type for the id parameter
  // Get blog and loading states
  const { blog, loading } = useBlog(id || '');

  // Handle loading and null blog states
  if (loading) {
    return <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-lg font-semibold">Please wait...</p>
    </div>
  </div>;
  }

  if (!blog) {
    return <div className='mt-32 px-1/10 grid grid-cols-10'>No blog found</div>;
  }

  return (
    <div className='mt-32 px-1/10 grid grid-cols-10'>
      <div className='col-span-7 pr-2'>
        <div className='text-black text-5xl font-bold'>{blog.title}</div>
        <div className='py-2 text-gray-500'>{`Posted on : ${blog.publishedDate}`}</div>
        <div className=''>{blog.content}</div>
      </div>
      <div className='col-span-3 pl-4'>
        <div className='text-black font-semibold'>Author</div>
        <div className='flex items-start items-baseline gap-2 pt-2'>
          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {blog?.author?.uname ? (
                blog.author.uname.split(" ").map((name) => name[0]).join("").toUpperCase()
              ) : (
                "NA" // Fallback if author or uname is not available
              )}
            </span>
          </div>
          <div className="text-black font-medium text-md pl-1">
            {blog?.author?.uname ? blog.author.uname : "Unknown Author"}
          </div>
        </div>
      </div>

      {/* <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <p>Author: {blog.author?.uname || 'Unknown Author'}</p>
      <p>Published: {blog.publishedDate || 'Not Published'}</p> */}
    </div>
  );
};

export default Blog;
