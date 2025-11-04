
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { QrCodeIcon } from './icons';

const ReferralSection: React.FC = () => {
    const { user } = useAppContext();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (user) {
            navigator.clipboard.writeText(user.referralId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <h2 className="text-3xl font-bold text-center mb-2">Refer & Earn</h2>
            <p className="text-center text-medium-text mb-8">Share your code with friends and earn rewards when they join AuraMine.</p>
            
            <div className="bg-dark-card p-8 rounded-2xl border border-dark-border flex flex-col items-center text-center">
                <p className="text-medium-text mb-2">Your Unique Referral ID</p>
                <div className="bg-dark-bg border border-dark-border rounded-lg px-6 py-3 mb-6">
                    <p className="text-2xl font-mono font-bold tracking-widest text-brand-secondary">{user?.referralId}</p>
                </div>
                <button 
                    onClick={handleCopy}
                    className="w-full max-w-xs bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300"
                >
                    {copied ? 'Copied!' : 'Copy Code'}
                </button>
            </div>

            <div className="bg-dark-card p-8 rounded-2xl border border-dark-border flex flex-col items-center text-center">
                <p className="text-medium-text mb-4">Scan QR Code</p>
                <div className="p-4 bg-white rounded-lg">
                    {/* In a real app, this would be a generated QR code */}
                    <QrCodeIcon className="w-40 h-40 text-black" />
                </div>
            </div>
        </div>
    );
};

export default ReferralSection;
