import { Hono } from "hono";

const userRoutes=new Hono();

userRoutes.post("/signup",(c)=>{
    return c.text("Hello User Routes signup");
});

userRoutes.post("/signin",(c)=>{
    return c.text("Hello User Routes signin");
})

//export

export default userRoutes;