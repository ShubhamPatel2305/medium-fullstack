import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs }: { loading: boolean; blogs: Array<{ id: string; author?: { uname?: string; id?: string }; title: string; content: string; publishedDate?: string }> } = useBlogs();
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
    <div className="mt-24 px-1/5">
      <h1 className="text-2xl font-bold">Blogs</h1>
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
        <p>Please Sign in to see blogs.</p>
      )}
    </div>
  );
};

export default Blogs;
