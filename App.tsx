
import React, { useState, useMemo, useCallback } from 'react';
import { AppProvider } from './context/AppContext';
import type { User, AppState, Booster, Task } from './types';
import { View } from './types';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import BoosterSection from './components/BoosterSection';
import TaskCenter from './components/TaskCenter';
import ReferralSection from './components/ReferralSection';
import WalletSection from './components/WalletSection';
import Layout from './components/Layout';
import { generateInitialBoosters, generateInitialTasks } from './services/geminiService';

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>({
        user: null,
        balance: 0.0,
        hashRate: 5.0,
        boosters: [],
        tasks: [],
        currentView: View.DASHBOARD,
    });

    const login = useCallback(async (username: string) => {
        // Simulate API call
        const user: User = {
            id: '1',
            username,
            email: `${username.toLowerCase()}@auramine.io`,
            isPaid: false, // Default to free user
            referralId: 'AM-4B1D7F',
        };
        const boosters = await generateInitialBoosters();
        const tasks = await generateInitialTasks();
        
        setAppState({
            user,
            balance: 12.3456,
            hashRate: 5.0,
            boosters,
            tasks,
            currentView: View.DASHBOARD,
        });
    }, []);

    const logout = useCallback(() => {
        setAppState(prev => ({ ...prev, user: null }));
    }, []);
    
    const setView = useCallback((view: View) => {
        setAppState(prev => ({ ...prev, currentView: view }));
    }, []);

    const value = useMemo(() => ({
        ...appState,
        setAppState,
        login,
        logout,
        setView,
    }), [appState, login, logout, setView]);

    const renderContent = () => {
        if (!appState.user) {
            return <LoginScreen />;
        }
        switch (appState.currentView) {
            case View.DASHBOARD:
                return <Dashboard />;
            case View.BOOSTERS:
                return <BoosterSection />;
            case View.TASKS:
                return <TaskCenter />;
            case View.REFERRALS:
                return <ReferralSection />;
            case View.WALLET:
                return <WalletSection />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <AppProvider value={value}>
            <div className="min-h-screen bg-dark-bg font-sans">
                {appState.user ? (
                    <Layout>{renderContent()}</Layout>
                ) : (
                    renderContent()
                )}
            </div>
        </AppProvider>
    );
};

export default App;
