import Utility from "@business/Utility";
import { AuthControler } from "@controller/AuthController";
import { AuthorController } from "@controller/AuthorController";
import { DocumentController } from "@controller/DocumentController";
import { Hono } from "hono";

const app = new Hono();

app.post("auth/sign-in", async (context) => {});
app.post("auth/sign-up", Utility.getPostRequestHandler(AuthControler.handleSignUp));

app.get("/author", AuthorController.getAll);
app.get("/author/:displayName", async (context) => {
  return AuthorController.getOneByDisplayName(context.req.param("displayName"));
});
app.delete("/author/:displayName", async (context) => {
  return AuthorController.deleteOneByDisplayName(context.req.param("displayName"));
});

app.get("/document", DocumentController.getAll);
app.get("/document/:id", async (context) => {
  return DocumentController.getOne(context.req.param("id"));
});
app.post("/document", Utility.getPostRequestHandler(DocumentController.createOne));
app.delete("/document/:id", async (context) => {
  return DocumentController.deleteOne(context.req.param("id"));
});

export default app;
