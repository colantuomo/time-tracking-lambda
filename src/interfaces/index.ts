import { JWTPayload } from 'jose';

export interface JwtValues extends JWTPayload {
    password: string;
    exp: number;
    user: string;
    iat: number;
}