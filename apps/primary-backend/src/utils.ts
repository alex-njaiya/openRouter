import crypto from "crypto"
export const generateApiKey = (): string => {
    const keyBytes = crypto.randomBytes(32);
    return 'opr_' + keyBytes.toString('hex');
};

export async function hashKeys(apiKey: string): Promise<string>{
    return await Bun.password.hash(apiKey)
}

export async function decode(rawKey: string, hashedValue: string): Promise<boolean>{
    return await Bun.password.verify(rawKey, hashedValue) 
}