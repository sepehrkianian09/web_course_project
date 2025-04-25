import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";

const numberParam = (c, _id) => parseInt(c.req.param(_id));

const app = new Hono();

app.use("/*", cors());
app.use("/*", logger());

app.get("/", (c) => c.json({ message: "Hello world!" }));

app.get("/courses", (c) => c.json({courses: [{"id": 1, "name": "Web Software Development" }, {"id": 2, "name": "Device-Agnostic Design"}]}));

app.get("/courses/:id", (c) => c.json({"course": {"id": numberParam(c, "id"), "name": "Course Name" }}));

app.post("/courses", async (c) => {
  const body = await c.req.json();

  return c.json({"course": {"id": 3, "name": body.name}});
});

app.get("/courses/:id/topics", (c) => {
  return c.json({"topics": [ { "id": 1, "name": "Topic 1" }, {"id": 2, "name": "Topic 2" } ] });
});

app.get("/courses/:cId/topics/:tId/posts", (c) => {
  return c.json({"posts": [ {"id": 1, "title": "Post 1" }, {"id": 2, "title": "Post 2" } ] });
});

app.get("/courses/:cId/topics/:tId/posts/:pId", (c) => {
  return c.json({"post": {"id": numberParam(c, "pId"), "title": "Post Title" }, "answers": [ { "id": 1, "content": "Answer 1" }, {"id": 2, "content": "Answer 2" } ] });
})

export default app;
