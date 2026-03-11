import { ModelName } from "db/generated/prisma/internal/prismaNamespace";
import { Elysia } from "elysia";
import { ModelsModel } from "./model";
import { ModelService } from "./service";

export const app = new Elysia({ prefix: "models" })

    .get("/", async () => {

        const models = await ModelService.getModels();
        return {
            models
        }
    }, {
        response: {
            200: ModelsModel.getModelResponseSchema
        }
    })
    .get("/providers", async () => {
        const providers = await ModelService.getProviders();
        return {
            providers
        }
    }, {
        response: {
            200: ModelsModel.getProvidersResponseSchema
        }
    })
    .get("/:id/providers", async ({ params: { id } }) => {
        const providers = await ModelService.getModelProviders(Number(id));

        return {
            providers
        }
    }, {
        response: {
            200: ModelsModel.getModelProvidersResponseSchema
        }
    })