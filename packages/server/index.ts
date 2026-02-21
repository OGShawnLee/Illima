import { BusinessRuleException } from "@business/Exception";
import { AuthService } from "@business/service/AuthService";
import { Elysia, status, t } from "elysia";
import { cors as CORS } from "@elysiajs/cors";
import { jwt as JWT } from "@elysiajs/jwt";
import { AccountSchema, DocumentSchema, isNullish } from "shared";
import { ProfileDAO } from "@business/dao/ProfileDAO";
import { DocumentDAO } from "@business/dao/DocumentDAO";
import { DocumentService } from "@business/service/DocumentService";

const app = new Elysia()
  .use(CORS())
  .use(
    JWT({
      name: "auth",
      alg: "HS256",
      secret: process.env.ACCESS_TOKEN!,
      schema: t.Object({
        idAuthor: t.Number(),
      }),
    }),
  )
  .macro({
    protected: {
      resolve: async ({ auth, headers: { authorization } }) => {
        if (isNullish(authorization)) {
          return status(400);
        }

        const payload = await auth.verify(authorization);

        if (payload) {
          return { idCurrentUser: payload.idAuthor };
        }

        return status(400);
      },
    },
  })
  .get("/", "Hello from Elysia!")
  .post(
    "/auth/sign-in",
    async (context) => {
      const { data, error } = await AuthService.handleSignIn(context.body);

      if (error instanceof BusinessRuleException) {
        return status(400);
      } else if (error) {
        return status(500);
      }

      return status(201, data as string);
    },
    { body: AccountSchema.SIGN_IN_SCHEMA },
  )
  .post(
    "/auth/sign-up",
    async (context) => {
      const { error } = await AuthService.handleSignUp(context.body);

      if (error instanceof BusinessRuleException) {
        return status(400, error.message);
      } else if (error) {
        return status(500);
      }

      return status(200);
    },
    { body: AccountSchema.SIGN_UP_SCHEMA },
  )
  .get(
    "/api/profile",
    async ({ idCurrentUser }) => {
      const { data } = await ProfileDAO.getOne(idCurrentUser);

      if (data) {
        return status(200, data);
      }

      return status(500);
    },
    { protected: true },
  )
  .get(
    "/api/document",
    async ({ idCurrentUser }) => {
      const { data } = await DocumentDAO.getAllByAuthor(idCurrentUser);

      if (data) {
        return status(200, data);
      }

      return status(500);
    },
    { protected: true },
  )
  .get(
    "/api/document/:id",
    async ({ params }) => {
      const { data, error } = await DocumentDAO.getOne(params.id);

      if (error) return status(500);
      if (data) return status(200, data);

      return status(404);
    },
    { protected: true },
  )
  .post(
    "/api/document",
    async ({ body }) => {
      const { error } = await DocumentService.createOne(body);

      if (error instanceof BusinessRuleException) {
        return status(400, error.message);
      }

      return status(error ? 500 : 201);
    },
    { body: DocumentSchema.INSERT_DOCUMENT_SCHEMA, protected: true },
  )
  .patch(
    "/api/document/:id",
    async ({ body }) => {
      const { error } = await DocumentService.updateOne(body);

      if (error instanceof BusinessRuleException) {
        return status(400, error.message);
      }

      return status(error ? 500 : 201);
    },
    { body: DocumentSchema.DOCUMENT_SCHEMA, protected: true },
  )
  .delete(
    "/api/document/:id",
    async ({ params }) => {
      const { error } = await DocumentDAO.deleteOne(params.id);

      return status(error ? 500 : 204);
    },
    { protected: true },
  )
  .listen(3000);

export default app;
export type App = typeof app;
