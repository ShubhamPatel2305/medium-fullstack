//import zod and necesary jsonwebtokens to verify token

import { string, z } from "zod";
import { Context, Next } from "hono";
import { env } from "hono/adapter";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "jsonwebtoken";


async function tokenValidationMiddleware(c:Context,next:Next){
    //seeif header has an authorization
    if(await c.req.header("authorization")){
        //verify that token is digned using our secret if yes than decode token to get uname i.e in hashed form search our db if same uname exists let it pass else error
        const token=await c.req.header("authorization");
        if (!token) {
            return c.json({ message: "Please provide a valid token" }, 401);
        }
        let id:string;
        try {
            const decodedToken = verify(token, "secret") as unknown as { id: string };
            id = decodedToken.id;
        } catch (error) {
            return c.json({ message: "Invalid token" }, 401);
        }
        //now search db if same uname exists let it pass
        try {
            const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)
            const prisma = new PrismaClient({
                datasourceUrl: DATABASE_URL
            }).$extends(withAccelerate());
            const user = await prisma.user.findFirst({
                where:{
                    id
                },select:{
                    id:true
                }
            });   
            if(user){
                await next();
            }else{
                return c.json({message:"User does not exists"},401);
            }
        } catch (error) {
            //error in server while extracting db
            return c.json({message:"Some server issue in db in token validation middleware"},500);
        }
    }else{
        return c.json({message:"Please provide a token"},401);
    }
}

export {
    tokenValidationMiddleware
}