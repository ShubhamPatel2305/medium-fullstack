import { Hono } from 'hono'
import userRoutes from './routes/user'
import blogRoutes from './routes/blog';

const app = new Hono()

app.route("/api/v1",userRoutes);
app.route("/api/v1",blogRoutes);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
