import { t } from "elysia";

export namespace ModelsModel {
    export const getModelResponseSchema = t.Object({
        models: t.Array(t.Object({}))
    });


    export type getModelResponseSchema = typeof getModelResponseSchema.static

    export const getProvidersResponseSchema = t.Object({
        providers: t.Array(t.Object({}))
    })

    export type getProvidersResponseSchema = typeof getProvidersResponseSchema.static;

    export const getModelProvidersResponseSchema = t.Object({
        providers: t.Array(t.Object({}))
    })


    export type getModelProvidersResponseSchema = typeof getModelProvidersResponseSchema.static
}