import {jwt} from "@elysiajs/jwt"
import {Elysia} from "elysia";

export const middleware = new Elysia({prefix: "middleware"})
    .use(jwt, )