
import type React from 'react';

export interface User {
    id: string;
    username: string;
    email: string;
    isPaid: boolean;
    referralId: string;
}

export interface Booster {
    id: string;
    name: string;
    description: string;
    price: number;
    hashRateIncrease: number;
}

export enum TaskVerification {
    MANUAL = 'MANUAL',
    AUTO = 'AUTO',
}

export enum TaskStatus {
    IDLE = 'IDLE',
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED'
}

export interface Task {
    id: string;
    title: string;
    description: string;
    reward: number;
    verification: TaskVerification;
    status: TaskStatus;
}

export interface AppState {
    user: User | null;
    balance: number;
    hashRate: number;
    boosters: Booster[];
    tasks: Task[];
    currentView: View;
}

export interface AppContextType extends AppState {
    setAppState: React.Dispatch<React.SetStateAction<AppState>>;
    login: (username: string) => void;
    logout: () => void;
    setView: (view: View) => void;
}

export enum View {
    DASHBOARD = 'DASHBOARD',
    BOOSTERS = 'BOOSTERS',
    TASKS = 'TASKS',
    REFERRALS = 'REFERRALS',
    WALLET = 'WALLET',
}
