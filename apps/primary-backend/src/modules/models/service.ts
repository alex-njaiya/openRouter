import {prisma} from "db"

export abstract class ModelService {
    static async getModels(){
        const models = await prisma.model.findMany();
        return models
    };

    static async getProviders(){
        const providers = await prisma.providers.findMany();
        return providers
    }

    static async getModelProviders(id: number){
        const modelProviders = await prisma.model.findMany({
            where: {
                company_id: id
            }
        })

        return modelProviders
    }
}