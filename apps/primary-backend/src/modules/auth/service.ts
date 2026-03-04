import Elysia from "elysia";
import { AuthModel } from "./model";
import {prisma} from "db"
import { hashKeys } from "../../utils";

export abstract class AuthService {
    static async signup(email: string, password: string): Promise<string> {
        // create a new user account
        const created_user = await prisma.user.create({
            data: {
                email,
                password: await hashKeys(password)
            }
        })

        return created_user.id.toString()
    }

    static async signin(email: string, password: string): Promise<{correctCredentials: boolean, userId?: string}>{
        // check if the user already exists
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });


        if(user){
            // compare if the two passwords match
            const  matched = await Bun.password.verify(password, user.password);

            if(!user) return {correctCredentials: false}

            if(!matched) return {correctCredentials: false}
        }

        return {correctCredentials: true, userId: user?.id.toString()}
    }
}