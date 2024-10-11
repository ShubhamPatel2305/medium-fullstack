import { Context, Hono } from "hono";
import {inputValidationMiddleware, inputValidationMiddlewareSignin, userAlreadyExistsCheckMiddlewareSignin,userAlreadyExistsCheckMiddlewareSignup} from "../middlewares/UserMiddlewares";
import { env } from "hono/adapter";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import SHA256 from 'crypto-js/sha256';
import { sign, verify } from "jsonwebtoken";
import { tokenValidationMiddleware } from "../middlewares/BlogMiddlewares";

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
    const hashedPass:string = SHA256(pass).toString();

    const user:{email:string}=await prisma.user.create({
        data:{
            uname:uname,
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

userRoutes.post("/signin",inputValidationMiddlewareSignin,userAlreadyExistsCheckMiddlewareSignin,async (c)=>{
    //we know that user already exists and inputs are in correct format so we will directly generate a jwt token valid for 6 hours and send it in response
    //we will use the username in hashed format to generate the token
    const {email}=await c.req.json();
    //extract userid corresponsding to given uname and store that uid in jwt also the uname in db is not hashed its in normal form
    

    const {DATABASE_URL}=env<{DATABASE_URL:string}>(c)
    const prisma=new PrismaClient({
        datasourceUrl:DATABASE_URL
    }).$extends(withAccelerate());
    //get the user id from the database using the username
    const user=await prisma.user.findFirst({
        where:{
            email
        },select:{
            id:true,
            uname:true
        }
    });

    if(user){
        //generate jwt token
        const token:string = sign({id:user.id},secret,{expiresIn:"6h"});
        //send response with token
        return c.json({token, uname: user.uname},200);
    }else{
        return c.json({message:"User does not exists"},401);
    }
})

userRoutes.get("/verifytoken",tokenValidationMiddleware,async (c)=>{
    //if token is valid decode it and send user id in response with status 200
    const token = c.req.header("authorization");
    if (!token) {
        return c.json({ message: "Authorization token is missing" }, 401);
    }
    const decodedToken = verify(token, secret) as unknown as { id: string };
    return c.json({id:decodedToken.id},200);
})

//export

export default userRoutes;