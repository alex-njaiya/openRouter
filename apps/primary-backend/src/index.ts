import { Elysia } from "elysia";
import {app as authApp} from "./modules/auth";
import {jwt} from "@elysiajs/jwt"

const app = new Elysia()
  .use(authApp)
  .use(jwt({
    name: 'jwt',
    secret: await Bun.password.hash("97766988@topsecret")
  }))
  .listen(3000);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
