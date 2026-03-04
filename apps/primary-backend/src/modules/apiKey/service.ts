import {Elysia} from "elysia"
import {prisma} from "db"
import { ApikeysModel } from "./model";
import { generateApiKey, hashKeys } from "../../utils";

export abstract class ApiKeyService {
    static async create(name: string, userId: string): Promise<{id: string, key: string}> {
        // create the apiKey
        const apiKey = generateApiKey();
        // store it in the database as a hash

        const hashedKey = await hashKeys(apiKey);

        // check if there is an api-key with the give name
        const apiKeyNameExists = await prisma.apiKeys.findFirst({
            where: {
                name
            }
        });

        if(apiKeyNameExists){
            throw new Error("An api in your collection with the same name already exists")
        }

        const apiKeys = await prisma.apiKeys.create({
            data: {
                user_id: Number(userId),
                name,
                api_key: hashedKey,
            }
        })

        return {id: String(apiKeys.id), key: apiKey}
    }

    static async getApiKeys(userId: number){
        const apiKeys = await prisma.apiKeys.findMany({
            where: {
                user_id: userId
            }
        })

        return apiKeys.map(apiKey => ({
            id: apiKey.id,
            apiKey: apiKey.api_key,
            name: apiKey.name,
            lastUsed: apiKey.lastUsed,
            creditsConsumed: apiKey.credits
        }))
    }

    static async updateApiKeyDisable(userId: number, id: number, disable: boolean){
        // find the specifi api key
        // change the disabled row to true
        return await prisma.apiKeys.update({
            where: {
                id,
                user_id: userId
            },
            data: {
                disabled: true
            }
        })
    }

    static async updateApiKeyEnable(userId: number, id: number, disable: boolean){
        return await prisma.apiKeys.update({
            where:{
                id,
                user_id: userId
            },
            data: {
                disabled: false
            }
        })
    }


    static async deleteApiKey(userId: number, id: number){
        return await prisma.apiKeys.delete({
            where: {
                id,
                user_id: userId
            }
        })
    }

}