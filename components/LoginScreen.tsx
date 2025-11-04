
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const LoginScreen: React.FC = () => {
    const { login } = useAppContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please enter a username and password.');
            return;
        }
        setError('');
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            login(username);
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-dark-bg p-4 animate-fadeIn">
            <div className="w-full max-w-md bg-dark-card rounded-2xl shadow-lg border border-dark-border p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome to AuraMine</h1>
                    <p className="text-medium-text">Your simulated crypto mining journey starts here.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-medium-text text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="e.g., satoshi"
                            className="w-full bg-dark-bg border border-dark-border rounded-lg py-3 px-4 text-light-text focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-medium-text text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="******************"
                            className="w-full bg-dark-bg border border-dark-border rounded-lg py-3 px-4 text-light-text focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Logging In...' : 'Login / Sign Up'}
                        </button>
                    </div>
                    <p className="text-center text-medium-text text-xs mt-6">
                        By signing in, you agree to our simulated terms of service.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;
