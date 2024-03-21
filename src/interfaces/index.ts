import { JWTPayload } from "jose";

export interface JwtValues extends JWTPayload {
    password: string;
    exp: number;
    user: string;
    iat: number;
}

export interface User {
    id: string;
    username: string;
    pass: string;
    registration: string;
}

export interface TimeTrackingItem {
    id?: string;
    lastAction: 'checkin' | 'checkout';
    referenceDate: string;
    username: string;
    trackings: Tracking[];
}

export interface Tracking {
    checkin?: string;
    checkout?: string;
}