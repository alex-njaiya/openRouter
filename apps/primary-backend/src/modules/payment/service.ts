import { prisma } from "db";

const ONRAMP_AMOUNT = 1000;

export abstract class PaymentService {
    static async onramp(userId: number) {
        const [user] = await prisma.$transaction([
            prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    credits: {
                        increment: ONRAMP_AMOUNT
                    }
                }
            }),
            prisma.onrampTransactions.create({
                data: {
                    user_id: userId,
                    amount: ONRAMP_AMOUNT,
                    status: "completed"
                }
            })
        ])
    }
}