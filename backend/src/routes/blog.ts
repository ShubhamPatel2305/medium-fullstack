import { Hono } from "hono";
import { tokenValidationMiddleware } from "../middlewares/BlogMiddlewares";

const blogRoutes=new Hono();

blogRoutes.post("/blog",tokenValidationMiddleware, (c)=>{
    return c.text("Hello User Routes blog post");
})

blogRoutes.get("/blog",tokenValidationMiddleware, (c)=>{
    return c.text("Hello User Routes blog get");
})

blogRoutes.put("/blog",tokenValidationMiddleware, (c)=>{
    return c.text("Hello User Routes blog put");
})

blogRoutes.delete("/blog",tokenValidationMiddleware, (c)=>{
    return c.text("Hello User Routes blog delete");
})

//export

export default blogRoutes;