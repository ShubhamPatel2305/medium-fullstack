//import zod
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context, Next } from "hono";
import { env } from "hono/adapter";
import { z } from "zod";

//user schema zod
const userSchema=z.object({
    uname:z.string().min(4),
    email:z.string().email(),
    pass:z.string().min(8)
})

async function inputValidationMiddleware(c:Context,next:Next){
    try {
        const body=await c.req.json();
        //safe parsing
        const user=userSchema.safeParse(body);
        //if success next else return error
        if(user.success){
            await next();
        }else{
            //send error message as json wih proper status code
            return c.json({message:"Enter input credentials in proper format"},400);
        }

    } catch (error) {
        //send error message as json wih proper status code
        return c.json({message:"somer server issue in input validation middleware"},500);
    }
}

async function userAlreadyExistsCheckMiddleware(c:Context, next:Next){
    //check if user already exists
    //if exists return error else next

    try {
        const {DATABASE_URL}=env<{DATABASE_URL:string}>(c)
        const prisma=new PrismaClient({
            datasourceUrl:DATABASE_URL
        }).$extends(withAccelerate());

        const {email}=await c.req.json();
        //check if user already exists
        const user=await prisma.user.findUnique({
            where:{
                email
            }
        });
        //if user exists return error else next
        if(user){
            return c.json({message:"User already exists"},400);
        }else{
            await next();
        }
    } catch (error) {
        return c.json({message:"some server issue in user already exists check middleware"},500);
    }
}


//export both
export { inputValidationMiddleware, userAlreadyExistsCheckMiddleware };