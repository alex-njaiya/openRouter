import { t } from "elysia"


export namespace PaymentModel {
    export const onrampResponseSchema = t.Object({
        message: t.Literal("Onramp successfull"),
        credits: t.Number()
    });

    export type onrampResponseSchema = typeof onrampResponseSchema.static;

    export const onrampFailedSchema = t.Object({
        message: t.Literal("Onramp failed")
    });

    export type onrampFailedSchema = typeof onrampFailedSchema.static;
}