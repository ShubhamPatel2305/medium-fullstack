import { Hono } from 'hono'
import userRoutes from './routes/user'
import blogRoutes from './routes/blog';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from 'hono/adapter'


const app = new Hono()

app.route("/api/v1",userRoutes);
app.route("/api/v1",blogRoutes);

app.get('/', async (c) => {

  const body: {
    name: string;
    email: string;
    password: string
  } = await c.req.json()

  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)

  const prisma = new PrismaClient({
      datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate())

  console.log(body)

  const user=await prisma.user.create({
    data: {
      uname: body.name,
      email: body.email,
      pass: body.password
    }
  })
  
  return c.json(user)
})

export default app
