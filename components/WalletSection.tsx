
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const WalletSection: React.FC = () => {
    const { balance, setAppState } = useAppContext();
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [withdrawAddress, setWithdrawAddress] = useState('');
    const [isWithdrawing, setIsWithdrawing] = useState(false);
    const [withdrawTimer, setWithdrawTimer] = useState(0);

    useEffect(() => {
        // Fix: Replace NodeJS.Timeout with ReturnType<typeof setTimeout> for browser compatibility.
        let timer: ReturnType<typeof setTimeout>;
        if (isWithdrawing && withdrawTimer > 0) {
            timer = setTimeout(() => setWithdrawTimer(prev => prev - 1), 1000);
        } else if (isWithdrawing && withdrawTimer === 0) {
            setIsWithdrawing(false);
            // In a real app, you'd confirm success here.
        }
        return () => clearTimeout(timer);
    }, [isWithdrawing, withdrawTimer]);

    const handleWithdraw = () => {
        const amount = parseFloat(withdrawAmount);
        if (amount > 0 && amount <= balance && withdrawAddress.trim() !== '') {
            setAppState(prev => ({...prev, balance: prev.balance - amount}));
            setIsWithdrawing(true);
            setWithdrawTimer(15 * 60); // 15 minutes
            setWithdrawAmount('');
            setWithdrawAddress('');
        }
    };
    
    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <h2 className="text-3xl font-bold text-center mb-4">Wallet</h2>

            <div className="bg-dark-card p-6 rounded-2xl border border-dark-border text-center">
                <p className="text-medium-text mb-2">Total Balance</p>
                <p className="text-4xl font-bold text-brand-primary">{balance.toFixed(6)} <span className="text-2xl">USDT</span></p>
            </div>
            
            {/* Deposit Section */}
            <div className="bg-dark-card p-6 rounded-2xl border border-dark-border">
                <h3 className="text-xl font-bold mb-4 text-white">Deposit USDT</h3>
                <div className="flex space-x-4">
                    <button className="flex-1 bg-brand-accent hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                        Auto Gateway
                    </button>
                    <button className="flex-1 bg-dark-bg border border-dark-border hover:bg-dark-border text-light-text font-bold py-3 px-4 rounded-lg transition-colors">
                        Manual Gateway
                    </button>
                </div>
            </div>

            {/* Withdraw Section */}
            <div className="bg-dark-card p-6 rounded-2xl border border-dark-border">
                <h3 className="text-xl font-bold mb-4 text-white">Withdraw USDT</h3>
                {isWithdrawing ? (
                    <div className="text-center">
                        <p className="text-medium-text">Processing withdrawal...</p>
                        <p className="text-4xl font-mono text-yellow-400 my-4">{formatTime(withdrawTimer)}</p>
                        <p className="text-xs text-medium-text">Your funds will be sent after the timer completes.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                         <input
                            type="text"
                            value={withdrawAddress}
                            onChange={(e) => setWithdrawAddress(e.target.value)}
                            placeholder="Your USDT Deposit Address"
                            className="w-full bg-dark-bg border border-dark-border rounded-lg py-3 px-4 text-light-text focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                        <input
                            type="number"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            placeholder="Amount (Min: 10, Max: 500)"
                            className="w-full bg-dark-bg border border-dark-border rounded-lg py-3 px-4 text-light-text focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                        <button 
                            onClick={handleWithdraw}
                            className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
                            disabled={!withdrawAmount || !withdrawAddress || parseFloat(withdrawAmount) > balance}
                        >
                            Submit Withdrawal
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WalletSection;
