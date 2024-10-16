import { useNavigate } from "react-router-dom"
interface BlogCardProps{
    authorName:string,
    title:string,
    content:string,
    published:string,
    id:string,
    authorId:string
}

const BlogCard = ({
    authorName,
    title,
    content,
    published,
    id,
    authorId,
    }: BlogCardProps) => {
        const navigate =useNavigate();
        const handleClick=()=>{
            navigate(`/profile/${authorId}`);
        }
  return (
    <div className="border-b-2">
        <div className="flex items-end items-baseline pt-8 ">
            <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300 hover:underline cursor-pointer" onClick={()=>handleClick()} >{
                    //split authorname and include first letters of first and lastname 
                    authorName.split(" ").map((name)=>name[0]).join("").toUpperCase()
                    }</span>
            </div>
            <div className="text-black font-medium text-md pl-2 hover:underline cursor-pointer" onClick={()=>handleClick()}>{authorName}</div>
            <div className="text-gray-500 font-medium text-sm pl-1">{`. ${published}`}</div>
        </div>
        <div className="cursor-pointer flex flex-col" onClick={()=>navigate(`/blog/${id}`)}>
            <p className="text-xl font-bold pt-1 line-clamp-2"><span className="hover:underline">{title}</span></p>
            <div className="line-clamp-3">{content}</div>
            <div className="text-sm text-gray-500 py-3">{`${Math.ceil(content.length/1000)} minute(s) read`}</div>
        </div>
    </div>
  )
}

export default BlogCard