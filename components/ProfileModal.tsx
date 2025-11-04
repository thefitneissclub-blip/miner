
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { CloseIcon, ProfileIcon } from './icons';

interface ProfileModalProps {
    onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
    const { user, setAppState, logout } = useAppContext();
    const [username, setUsername] = useState(user?.username || '');
    const [isPaid, setIsPaid] = useState(user?.isPaid || false);

    const handleSave = () => {
        if(user) {
            setAppState(prev => ({
                ...prev,
                user: { ...user, username, isPaid }
            }));
            onClose();
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn p-4">
            <div className="bg-dark-card rounded-2xl border border-dark-border w-full max-w-md p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-medium-text hover:text-light-text">
                    <CloseIcon className="w-6 h-6" />
                </button>
                
                <div className="flex flex-col items-center mb-6">
                    <ProfileIcon className="w-16 h-16 text-brand-primary mb-4" />
                    <h2 className="text-2xl font-bold text-white">Profile & Settings</h2>
                </div>

                <div className="space-y-4">
                     <div>
                        <label className="block text-medium-text text-sm font-bold mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3 text-light-text focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                    </div>
                     <div>
                        <label className="block text-medium-text text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={user?.email}
                            disabled
                            className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3 text-medium-text cursor-not-allowed"
                        />
                    </div>
                    <div className="flex items-center justify-between bg-dark-bg p-3 rounded-lg border border-dark-border">
                         <span className="text-medium-text font-bold">Account Type (Toggle for Demo)</span>
                         <label className="inline-flex items-center cursor-pointer">
                            <span className="mr-3 text-sm font-medium">{isPaid ? 'Paid' : 'Free'}</span>
                            <input type="checkbox" checked={isPaid} onChange={() => setIsPaid(!isPaid)} className="sr-only peer"/>
                            <div className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                        </label>
                    </div>
                </div>

                <div className="mt-8 space-y-3">
                    <button onClick={handleSave} className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-4 rounded-lg transition-colors">
                        Save Changes
                    </button>
                     <button onClick={logout} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
