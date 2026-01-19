import type { JwtVariables as JWTVariables } from "hono/jwt";
import Utility from "@business/Utility";
import { AuthControler } from "@controller/AuthController";
import { AuthorController } from "@controller/AuthorController";
import { DocumentController } from "@controller/DocumentController";
import { Hono } from "hono";
import { jwt as JWT } from "hono/jwt";
import { ProfileController } from "@controller/ProfileController";

type Variables = JWTVariables<{ idAuthor: number }>;

const app = new Hono<{ Variables: Variables }>();

app.use(
  "/api/*",
  JWT({
    secret: process.env.ACCESS_TOKEN!,
    alg: "HS256",
  }),
);

app.post("/auth/sign-in", Utility.getPostRequestHandler(AuthControler.handleSignIn));
app.post("/auth/sign-up", Utility.getPostRequestHandler(AuthControler.handleSignUp));

app.get("/api/profile", async (context) => {
  return ProfileController.getOne(context.get("jwtPayload").idAuthor);
});
app.get("/api/author", AuthorController.getAll);
app.get("/api/author/:displayName", async (context) => {
  return AuthorController.getOneByDisplayName(context.req.param("displayName"));
});
app.delete("/api/author/:displayName", async (context) => {
  return AuthorController.deleteOneByDisplayName(context.req.param("displayName"));
});

app.get("/api/document", DocumentController.getAll);
app.get("/api/document/:id", async (context) => {
  return DocumentController.getOne(context.req.param("id"));
});
app.post("/api/document", Utility.getPostRequestHandler(DocumentController.createOne));
app.delete("/api/document/:id", async (context) => {
  return DocumentController.deleteOne(context.req.param("id"));
});

export default app;
