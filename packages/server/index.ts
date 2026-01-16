import Utility from "@business/Utility";
import { AuthorController } from "@controller/AuthorController";
import { Hono } from "hono";

const app = new Hono();

app.get("/author", AuthorController.getAll);
app.get("/author/:displayName", async (context) => {
  return AuthorController.getOneByDisplayName(context.req.param("displayName"));
});
app.post("/author", Utility.getPostRequestHandler(AuthorController.createOne));
app.delete("/author/:displayName", async (context) => {
  return AuthorController.deleteOneByDisplayName(context.req.param("displayName"));
});

export default app;
