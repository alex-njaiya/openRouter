import { Elysia } from "elysia";
import {app as authApp} from "./modules/auth";
import { apiApp } from "./modules/apiKey";

const app = new Elysia()
  .use(authApp)
  .use(apiApp)
  .get("/home", () => console.log("Hello from this side."))
  .listen(4000);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
