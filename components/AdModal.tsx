
import React, { useState, useEffect } from 'react';

interface AdModalProps {
    onClose: () => void;
}

const AdModal: React.FC<AdModalProps> = ({ onClose }) => {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 text-white p-4">
            <div className="absolute top-4 right-4">
                {countdown > 0 ? (
                    <p className="bg-white/20 text-white text-sm font-bold py-1 px-3 rounded-full">
                        You can skip in {countdown}
                    </p>
                ) : (
                    <button 
                        onClick={onClose}
                        className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded-full"
                    >
                        Close Ad
                    </button>
                )}
            </div>
            
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">A Rewarded Ad is Playing...</h2>
                <p className="text-lg text-gray-300 mb-8">Watch this (simulated) ad to start your mining session!</p>
                <div className="w-full max-w-2xl aspect-video bg-dark-card border-2 border-brand-primary rounded-lg flex items-center justify-center">
                    <p className="text-2xl font-semibold text-medium-text">Simulated Video Ad Content</p>
                </div>
            </div>

            <div className="absolute bottom-4 text-center text-xs text-gray-500">
                <p>This is a simulated ad experience. In a real application, a video from an ad network would be displayed.</p>
            </div>
        </div>
    );
};

export default AdModal;
