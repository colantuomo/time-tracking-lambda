export interface JwtValues {
    user: string;
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