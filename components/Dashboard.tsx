
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useMiningTimer } from '../hooks/useMiningTimer';
import AdModal from './AdModal';
import { BoosterIcon } from './icons';

const StatCard: React.FC<{ title: string; value: string; unit: string }> = ({ title, value, unit }) => (
    <div className="bg-dark-card p-4 rounded-xl border border-dark-border text-center">
        <p className="text-sm text-medium-text mb-1">{title}</p>
        <p className="text-2xl font-bold text-white">{value} <span className="text-lg text-brand-secondary">{unit}</span></p>
    </div>
);

const Dashboard: React.FC = () => {
    const { hashRate, balance } = useAppContext();
    const [isAdVisible, setIsAdVisible] = useState(false);

    const showAd = () => setIsAdVisible(true);
    
    const { isActive, secondsLeft, handleStartClick, startMiningSession } = useMiningTimer(showAd);
    
    const handleAdClose = () => {
        setIsAdVisible(false);
        startMiningSession();
    };

    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {isAdVisible && <AdModal onClose={handleAdClose} />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatCard title="Current Hash Rate" value={hashRate.toFixed(2)} unit="MH/s" />
                <StatCard title="Accumulated Balance" value={balance.toFixed(6)} unit="USDT" />
            </div>

            <div className="bg-dark-card p-8 rounded-2xl border border-dark-border flex flex-col items-center justify-center text-center shadow-lg">
                <h2 className="text-2xl font-bold mb-2 text-white">{isActive ? 'Mining Session Active' : 'Miner Idle'}</h2>
                <p className="text-medium-text mb-6">{isActive ? 'Your rig is currently hashing.' : 'Click below to start a new session.'}</p>
                
                <div className="mb-8">
                    <p className="text-5xl font-mono font-bold tracking-wider text-brand-secondary">{formatTime(secondsLeft)}</p>
                    <p className="text-sm text-medium-text mt-1">Time Remaining</p>
                </div>

                <button
                    onClick={handleStartClick}
                    disabled={isActive}
                    className={`px-12 py-5 rounded-full font-bold text-xl text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-primary/50 ${isActive ? 'bg-gray-600 cursor-not-allowed' : 'bg-brand-primary hover:bg-brand-secondary animate-pulseGlow'}`}
                >
                    {isActive ? 'MINING...' : 'START MINER'}
                </button>
            </div>
            
            <div className="bg-dark-card p-4 rounded-xl border border-dark-border text-center">
                 <p className="text-sm text-medium-text">This is a persistent banner ad simulation.</p>
            </div>
        </div>
    );
};

export default Dashboard;
