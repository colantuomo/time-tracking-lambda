import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.SECRET_KEY)

export function formatResponse<T>(status: number, body: T) {
    return {
        status,
        body
    }
}

export async function validateJWT(token: string) {
    try {
        const { payload, protectedHeader } = await jwtVerify(token, secret);
        return {
            isValid: true,
            payload,
            protectedHeader
        };
    } catch (error: any) {
        return {
            isValid: false,
            error: error?.message
        };
    }
}