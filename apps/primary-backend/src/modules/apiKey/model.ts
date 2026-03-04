import { t } from "elysia";

export namespace ApikeysModel {
    export const createApiKeySchema = t.Object({
        name: t.String()
    })


    export type createApiKeySchema = typeof createApiKeySchema.static

    export const createApikeyResponse = t.Object({
        id: t.String(),
        apiKey: t.String()
    })

    export type createApikeyResponse = typeof createApikeyResponse.static

    export const createApiKeyFailureSchema = t.Object({
        message: t.Literal('Failed to create api-key'),
        error: t.String()
    })

    export type createApiKeyFailureSchema = typeof createApiKeyFailureSchema.static

    export const updateApikeySchema = t.Object({
        id: t.Number(),
        disabled: t.Boolean()
    })

    export type updateApikeySchema = typeof updateApikeySchema.static

    export const updateApikeyResponseSchema = t.Object({
        message: t.Literal("Updated api-key successfully")
    })

    export type updateApikeyResponseSchema = typeof updateApikeyResponseSchema.static


    export const updateApiKeyFailedSchema = t.Object({
        message: t.Literal("Updating api-key unsuccessfull")
    })

    export const getApikeyResponseSchema = t.Object({
        apiKeys: t.Array(t.Object({
            name: t.String(),
            apiKey: t.String(),
            lastUsed: t.Nullable(t.Date()),
            creditsConsumed: t.Number()
        }))

    })

    export type getApikeyResponseSchema = typeof getApikeyResponseSchema.static

    export const deleteApiSchema = t.Object({
        id: t.String()
    })

    export type deleteApiKeySchema = typeof deleteApiSchema.static;

    export const deleteApiKeyResponseSchema = t.Object({
        message: t.Literal("Api-Key deleted successfully")
    })

    export const deleteApiKeyFailedSchema = t.Object({
        message: t.Literal('Deleting api-key unsuccessfull')
    })
    
    export type deleteApiKeyFailedSchema = typeof deleteApiKeyFailedSchema.static
}