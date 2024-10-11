import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs }: { loading: boolean; blogs: Array<{ id: string; author?: { uname?: string }; title: string; content: string; publishedDate?: string }> } = useBlogs();

  if (loading) {
    return <div className="mt-24 px-1/5">Loading...</div>;
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
          />
        ))
      ) : (
        <p>No blogs available.</p>
      )}
    </div>
  );
};

export default Blogs;
