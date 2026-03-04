import jwt from "@elysiajs/jwt"
import {Elysia} from "elysia"
import { ApiKeyService } from "./service";
import { ApikeysModel } from "./model";

type AuthenticatedContext = {
    body: {name: string};
    status: any;
    userId: string;
}

export const apiApp = new Elysia({prefix: "api-key"})
    .use(
        jwt({
            name: 'jwt',
            secret: process.env.JWT_SECRET!
        })
    )

    .resolve(async ({cookie: {auth}, status, jwt}) => {
        if(!auth){
            return status(401)
        }
        
        const decoded = await jwt.verify(auth.value as string);

        if(!decoded || !decoded.userId){
            return status(401)
        }

        return {
            userId: decoded.userId as string
        }
    })
    .post(
        "/create-apikey", async ({userId, body, status}) => {
        try{
            const {id, key} = await ApiKeyService.create(body.name, userId);
            return {
                id,
                apiKey: key,
            }
        } catch(e: any){
            return status(400, {
                message: `Failed to create api-key`,
                error: String(e)
            })
        }
    }, {
        body: ApikeysModel.createApiKeySchema,
        response: {
            200: ApikeysModel.createApikeyResponse,
            400: ApikeysModel.createApiKeyFailureSchema
        }
    })
    
    .get('/', async ({userId}) => {
        const apiKeys = await ApiKeyService.getApiKeys(Number(userId));
        return {
            apiKeys
        }
    }, {
        response: ApikeysModel.getApikeyResponseSchema
    })

    .put("/disable", async({userId, body, status}) => {
        try{
            await ApiKeyService.updateApiKeyDisable(Number(userId), Number(body.id), body.disabled)
            return {
                message: "Updated api-key successfully"
            }
        } catch(e){
            return status(411, {
                message: "Updating api-key unsuccessfull"
            })
        }
    }, {
        body: ApikeysModel.updateApikeySchema,
        response: {
            200: ApikeysModel.updateApikeyResponseSchema,
            411: ApikeysModel.updateApiKeyFailedSchema
        }
    })
    .put("/enable", async ({userId, body, status}) => {
        try{
            await ApiKeyService.updateApiKeyEnable(Number(userId), body.id, body.disabled);
            return {
                message: "Updated api-key successfully"
            }
        } catch(e){
            return status(411, {
                message: "Updating api-key unsuccessfull"
            })
        }
    }, {
        body: ApikeysModel.updateApikeySchema,
        response: {
            200: ApikeysModel.updateApikeyResponseSchema,
            411: ApikeysModel.updateApiKeyFailedSchema
        }
    })

    .delete('/:id', async ({body, userId, status}) => {
        try{
            await ApiKeyService.deleteApiKey(Number(userId), Number(body.id));
            return {
                message: 'Api-Key deleted successfully'
            }
        } catch(e){
            return status(411, {
                message: 'Deleting api-key unsuccessfull'
            })
        }
    }, {
        body: ApikeysModel.deleteApiSchema,
        response: {
            200: ApikeysModel.deleteApiKeyResponseSchema,
            411: ApikeysModel.deleteApiKeyFailedSchema
        }
    })