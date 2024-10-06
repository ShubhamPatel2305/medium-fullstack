import { Hono } from "hono";

const blogRoutes=new Hono();

blogRoutes.post("/blog",(c)=>{
    return c.text("Hello User Routes blog post");
})

blogRoutes.get("/blog",(c)=>{
    return c.text("Hello User Routes blog get");
})

blogRoutes.put("/blog",(c)=>{
    return c.text("Hello User Routes blog put");
})

blogRoutes.delete("/blog",(c)=>{
    return c.text("Hello User Routes blog delete");
})

//export

export default blogRoutes;