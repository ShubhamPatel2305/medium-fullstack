import { Context, Hono } from "hono";
import {inputValidationMiddleware, userAlreadyExistsCheckMiddlewareSignin,userAlreadyExistsCheckMiddlewareSignup} from "../middlewares/UserMiddlewares";
import { env } from "hono/adapter";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import SHA256 from 'crypto-js/sha256';
import { sign } from "jsonwebtoken";

const secret:string="secret";


const userRoutes=new Hono();

userRoutes.post("/signup",inputValidationMiddleware,userAlreadyExistsCheckMiddlewareSignup, async (c:Context)=>{
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

userRoutes.post("/signin",inputValidationMiddleware,userAlreadyExistsCheckMiddlewareSignin,async (c)=>{
    //we know that user already exists and inputs are in correct format so we will directly generate a jwt token valid for 6 hours and send it in response
    //we will use the username in hashed format to generate the token
    const {uname}=await c.req.json();
    const hashedUname:string = SHA256(uname).toString();
    //generate jwt token
    const token:string = sign({uname:hashedUname},secret,{expiresIn:"6h"});
    //send response with token
    return c.json({token},200);
})

//export

export default userRoutes;