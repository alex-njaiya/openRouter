import {t} from "elysia"

export namespace AuthModel {
    export const signupSchema = t.Object({
        email: t.String(),
        password: t.String()
    })

    export type signupSchema = typeof signupSchema.static

    export const signupResponseSchema = t.Object({
        id: t.String()
    })

    export const signinSchema = t.Object({
        email: t.String(),
        password: t.String()
    })

    export type signinSchema = typeof signinSchema.static

    export const signinResponseSchema = t.Object({
        message: t.Literal("Signed in successfully")
    })

    export const signinResponseFailure = t.Object({
        message: t.Literal("Incorrect credentials")
    })

    export const signupResponseFailure = t.Object({
        message: t.Literal("Error while signing up")
    })

}