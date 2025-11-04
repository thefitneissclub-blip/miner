
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { BoosterIcon } from './icons';
import type { Booster } from '../types';

const BoosterCard: React.FC<{ booster: Booster, onPurchase: (booster: Booster) => void, disabled: boolean }> = ({ booster, onPurchase, disabled }) => {
    return (
        <div className="bg-dark-card p-6 rounded-xl border border-dark-border flex flex-col justify-between animate-fadeIn transition-transform transform hover:-translate-y-1">
            <div>
                <div className="flex items-center mb-3">
                    <BoosterIcon className="w-6 h-6 mr-3 text-brand-secondary" />
                    <h3 className="text-xl font-bold text-white">{booster.name}</h3>
                </div>
                <p className="text-medium-text mb-4 text-sm">{booster.description}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
                <div className="text-left">
                     <p className="text-green-400 font-semibold text-lg">+{booster.hashRateIncrease} MH/s</p>
                </div>
                <button 
                    onClick={() => onPurchase(booster)}
                    disabled={disabled}
                    className="bg-brand-accent hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    {booster.price} USDT
                </button>
            </div>
        </div>
    );
};


const BoosterSection: React.FC = () => {
    const { boosters, balance, setAppState } = useAppContext();
    const [notification, setNotification] = useState<string | null>(null);

    const handlePurchase = (booster: Booster) => {
        if (balance >= booster.price) {
            setAppState(prev => ({
                ...prev,
                balance: prev.balance - booster.price,
                hashRate: prev.hashRate + booster.hashRateIncrease
            }));
            setNotification(`Successfully purchased ${booster.name}!`);
        } else {
            setNotification('Insufficient balance.');
        }
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8">Mining Boosters</h2>
            
            {notification && (
                <div className="bg-brand-primary/20 border border-brand-primary text-brand-secondary px-4 py-3 rounded-lg text-center animate-fadeIn" role="alert">
                    <p>{notification}</p>
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {boosters.map(booster => (
                    <BoosterCard 
                        key={booster.id} 
                        booster={booster} 
                        onPurchase={handlePurchase} 
                        disabled={balance < booster.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default BoosterSection;
