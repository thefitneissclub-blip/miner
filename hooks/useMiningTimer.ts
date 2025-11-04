
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAppContext } from '../context/AppContext';

const MINING_DURATION_SECONDS = 6 * 60 * 60; // 6 hours
// For demonstration purposes, we use a shorter duration
const DEMO_MINING_DURATION_SECONDS = 300; // 5 minutes

export const useMiningTimer = (showAdCallback: () => void) => {
    const { user, hashRate, setAppState } = useAppContext();
    const [isActive, setIsActive] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(DEMO_MINING_DURATION_SECONDS);

    // Fix: Replace NodeJS.Timeout with ReturnType<typeof setInterval> for browser compatibility.
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const miningIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const stopMining = useCallback(() => {
        setIsActive(false);
        if (timerRef.current) clearInterval(timerRef.current);
        if (miningIntervalRef.current) clearInterval(miningIntervalRef.current);
        timerRef.current = null;
        miningIntervalRef.current = null;
        setSecondsLeft(DEMO_MINING_DURATION_SECONDS);
    }, []);

    const startMiningSession = useCallback(() => {
        setIsActive(true);
        setSecondsLeft(DEMO_MINING_DURATION_SECONDS);
        
        timerRef.current = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev <= 1) {
                    stopMining();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        miningIntervalRef.current = setInterval(() => {
            setAppState(prev => ({
                ...prev,
                balance: prev.balance + (prev.hashRate / 3600), // Add earnings per second
            }));
        }, 1000);
    }, [hashRate, setAppState, stopMining]);
    
    const handleStartClick = useCallback(() => {
        if (isActive) return;

        if (user && !user.isPaid) {
            showAdCallback(); // Show ad, and the ad component will call startMiningSession on close
        } else {
            startMiningSession();
        }
    }, [isActive, user, showAdCallback, startMiningSession]);


    useEffect(() => {
        // Cleanup on component unmount
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (miningIntervalRef.current) clearInterval(miningIntervalRef.current);
        };
    }, []);

    return { isActive, secondsLeft, handleStartClick, startMiningSession, stopMining };
};
