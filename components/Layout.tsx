
import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { useAppContext } from '../context/AppContext';
import { View } from '../types';
import { DashboardIcon, BoosterIcon, TaskIcon, ReferralIcon, WalletIcon, ProfileIcon } from './icons';
import ProfileModal from './ProfileModal';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { user, setView, currentView, balance } = useAppContext();
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const navItems = [
        { view: View.DASHBOARD, icon: DashboardIcon, label: 'Dashboard' },
        { view: View.BOOSTERS, icon: BoosterIcon, label: 'Boosters' },
        { view: View.TASKS, icon: TaskIcon, label: 'Tasks' },
        { view: View.REFERRALS, icon: ReferralIcon, label: 'Referrals' },
        { view: View.WALLET, icon: WalletIcon, label: 'Wallet' },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-dark-card/80 backdrop-blur-sm sticky top-0 z-20 border-b border-dark-border">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-2">
                             <img src="https://picsum.photos/32/32" alt="AuraMine Logo" className="rounded-full" />
                            <h1 className="text-xl font-bold text-white">AuraMine</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm text-medium-text">{user?.username}</p>
                                <p className="text-md font-semibold text-brand-secondary">{balance.toFixed(6)} USDT</p>
                            </div>
                            <button onClick={() => setIsProfileModalOpen(true)} className="p-2 rounded-full hover:bg-dark-border transition-colors">
                                <ProfileIcon className="w-6 h-6 text-light-text" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            
            <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
                {children}
            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-dark-card/80 backdrop-blur-sm border-t border-dark-border z-20">
                <nav className="max-w-4xl mx-auto flex justify-around items-center h-16">
                    {navItems.map(item => {
                        const isActive = currentView === item.view;
                        return (
                            <button
                                key={item.view}
                                onClick={() => setView(item.view)}
                                className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${isActive ? 'text-brand-primary' : 'text-medium-text hover:text-light-text'}`}
                            >
                                <item.icon className="w-6 h-6 mb-1" />
                                <span className="text-xs font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </footer>
            {isProfileModalOpen && <ProfileModal onClose={() => setIsProfileModalOpen(false)} />}
        </div>
    );
};

export default Layout;
