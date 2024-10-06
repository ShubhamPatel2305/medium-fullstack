import { Hono } from "hono";
import { tokenValidationMiddleware,inputValidationmiddleware } from "../middlewares/BlogMiddlewares";
import { env } from "hono/adapter";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "jsonwebtoken";

const blogRoutes=new Hono();

blogRoutes.post("/blog",tokenValidationMiddleware, inputValidationmiddleware, async (c)=>{
    //add the blog to db
    const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)
    const prisma = new PrismaClient({
        datasourceUrl: DATABASE_URL
    }).$extends(withAccelerate());

    const { title, content } = await c.req.json();
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
    //add blog to db
    try {
        const blog = await prisma.blogs.create({
            data: {
                title,
                content,
                author: {
                    connect: {
                        id: id 
                    }
                }
            },select :{
                id:true,
            }
        });
        return c.json(blog,201);
    } catch (error) {
        return c.json({message:"Some server issue in adding blog to db"},500);
    }
})

blogRoutes.get("/blog",tokenValidationMiddleware, (c)=>{
    return c.text("Hello User Routes blog get");
})

blogRoutes.put("/blog",tokenValidationMiddleware, inputValidationmiddleware, (c)=>{
    return c.text("Hello User Routes blog put");
})

blogRoutes.delete("/blog",tokenValidationMiddleware, (c)=>{
    return c.text("Hello User Routes blog delete");
})

//export

export default blogRoutes;