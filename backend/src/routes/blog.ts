import { Hono } from "hono";
import { tokenValidationMiddleware,inputValidationmiddleware, editDeleteBlogMiddleware } from "../middlewares/BlogMiddlewares";
import { env } from "hono/adapter";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "jsonwebtoken";

const blogRoutes=new Hono();

blogRoutes.post("/blog", tokenValidationMiddleware, inputValidationmiddleware, async (c) => {
    const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
    const prisma = new PrismaClient({
        datasourceUrl: DATABASE_URL
    }).$extends(withAccelerate());

    const { title, content } = await c.req.json(); // Assume `published` comes from the request body
    let id: string;

    try {
        const token = await c.req.header("authorization");
        if (!token) {
            return c.json({ message: "Token is missing" }, 401);
        }
        const decodedToken = verify(token, "secret") as unknown as { id: string };
        id = decodedToken.id;
    } catch (error) {
        return c.json({ message: "Invalid token" }, 401);
    }

    // Function to get the current date in DD/MM/YYYY format
    function getCurrentDate() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = today.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Add blog to db
    try {
        const blogData = {
            title,
            content,
            author: {
                connect: {id},
            },
            // Set the published date if the blog is published
            publishedDate: getCurrentDate()
        };

        const blog = await prisma.blogs.create({
            data: blogData,
            select: {
                id: true,
            }
        });

        return c.json(blog, 201);
    } catch (error) {
        return c.json({ message: "Some server issue in adding blog to db" }, 500);
    }
});


blogRoutes.get("/blog",tokenValidationMiddleware, async (c)=>{
    //return all blogs
    const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)
    const prisma = new PrismaClient({
        datasourceUrl: DATABASE_URL
    }).$extends(withAccelerate());
    try {
        const blogs=await prisma.blogs.findMany({
            select:{
                title:true,
                content:true,//also send author name 
                author:{
                    select:{
                        uname:true
                    }
                }
            }
        });
        return c.json(blogs,200);
    } catch (error) {
        return c.json({message:"Some server issue in getting blogs from db"},500);
    }
})

blogRoutes.get("/blog/:id", tokenValidationMiddleware, async (c)=>{
    //return blog with given id
    const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)
    const prisma = new PrismaClient({
        datasourceUrl: DATABASE_URL
    }).$extends(withAccelerate());
    const id= c.req.param("id");
    try {
        const blog=await prisma.blogs.findUnique({
            where:{
                id
            },
        });
        return c.json(blog,200);
    } catch (error) {
        return c.json({message:"Some server issue in getting blog from db"},500);
    }
})

blogRoutes.put("/blog",tokenValidationMiddleware, inputValidationmiddleware, editDeleteBlogMiddleware, async (c)=>{
    //update blog
    const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)
    const prisma = new PrismaClient({
        datasourceUrl: DATABASE_URL
    }).$extends(withAccelerate());
    const { id, title, content } = await c.req.json();
    try {
        const blog=await prisma.blogs.update({
            where:{
                id
            },
            data:{
                title,
                content
            },
            select:{
                id:true
            }
        });
        return c.json(blog,200);
    } catch (error) {
        return c.json({message:"Some server issue in updating blog in db"},500);
    }
})

blogRoutes.delete("/blog",tokenValidationMiddleware, editDeleteBlogMiddleware, async (c)=>{
    //delete blog from db and id of blog is in request body as id
    const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)
    const prisma = new PrismaClient({
        datasourceUrl: DATABASE_URL
    }).$extends(withAccelerate());
    const { id } = await c.req.json();
    if(!id){
        return c.json({message:"Please provide the id of the blog to delete"},400);
    }
    try {
        const blog=await prisma.blogs.delete({
            where:{
                id
            }
        });
        return c.json(blog,200);
    } catch (error) {
        return c.json({message:"Some server issue in deleting blog from db"},500);
    }
})

blogRoutes.get("/getmyblogs",tokenValidationMiddleware, async (c)=>{
    //get all blogs of the user
    const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)
    const prisma = new PrismaClient({
        datasourceUrl: DATABASE_URL
    }).$extends(withAccelerate());
    let id:string;
    try {
        const token=await c.req.header("authorization");
        if (!token) {
            return c.json({ message: "Token is missing" }, 401);
        }
        const decodedToken = verify(token, "secret") as unknown as { id: string };
        id = decodedToken.id;
    } catch (error) {
        return c.json({ message: "Invalid token" }, 401);
    }
    try {
        const blogs=await prisma.blogs.findMany({
            where:{
                authorId:id
            }
        });
        return c.json(blogs,200);
    } catch (error) {
        return c.json({message:"Some server issue in getting blogs from db"},500);
    }
})

//export

export default blogRoutes;