import { Context, Hono } from "hono";
import {inputValidationMiddleware, userAlreadyExistsCheckMiddleware} from "../middlewares/UserMiddlewares";
import { env } from "hono/adapter";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import SHA256 from 'crypto-js/sha256';


const userRoutes=new Hono();

userRoutes.post("/signup",inputValidationMiddleware,userAlreadyExistsCheckMiddleware, async (c:Context)=>{
    //add the user to db 

    const {DATABASE_URL}=env<{DATABASE_URL:string}>(c)
    const prisma=new PrismaClient({
        datasourceUrl:DATABASE_URL
    }).$extends(withAccelerate());

    const {uname,email,pass}=await c.req.json();
    //hash the password and username 
    const hashedUname:string = SHA256(uname).toString();
    const hashedPass:string = SHA256(pass).toString();

    const user:{email:string}=await prisma.user.create({
        data:{
            uname:hashedUname,
            email,
            pass:hashedPass
        },
        select:{
            email:true,
        }
    });
    //send response asuser json with status codes
    return c.json(user,201);
});

userRoutes.post("/signin",inputValidationMiddleware, (c)=>{
    return c.text("Hello User Routes signin");
})

//export

export default userRoutes;