import { Elysia } from "elysia";
import { AuthModel } from "./model";
import { AuthService } from "./service";
import {jwt} from "@elysiajs/jwt";

export const app = new Elysia({ prefix: "auth" })
    .post(
        '/sign-up', async ({ body, status }) => {
            try {
                const userId = await AuthService.signup(body.email, body.password);

                return {
                    id: userId
                }
            } catch (e) {
                console.log(e)
                return status(400, {
                    message: "Error while signing up"
                })
            }

        }, {
        body: AuthModel.signupSchema,
        response: {
            200: AuthModel.signupResponseSchema,
            400: AuthModel.signupResponseFailure
        }
    }
    )

    .post("/sign-in", async ({ body, status, cookie: {auth}}) => {
        const {correctCredentials, userId} = await AuthService.signin(body.email, body.password);
        if(correctCredentials && userId){

            // sign a jwt token and pass it as a cookie
            auth.set({
                value: userId,
                maxAge: 1 * 36000,
                httpOnly: true,
                secure: true,
                sameSite: "lax"
            })

            return {
                message: "Signed in successfully"
            }
        } else {
            return status(403, {
                message: "Incorrect credentials"
            })
        }

    }, {
        body: AuthModel.signinSchema,
        response: {
            200: AuthModel.signinResponseSchema,
            403: AuthModel.signinResponseFailure
        }
    })