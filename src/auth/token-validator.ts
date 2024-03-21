import { verify } from 'jsonwebtoken';
import { JwtValues } from '../interfaces';

export async function validateJWT(token: string) {
    try {
        const tokenDecoded = verify(token, process.env.SECRET_KEY as string);
        return {
            isValid: true,
            payload: tokenDecoded as JwtValues,
            error: undefined
        };
    } catch (error: any) {
        return {
            isValid: false,
            payload: undefined,
            error: error?.message
        };
    }
}