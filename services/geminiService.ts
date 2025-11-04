
import { GoogleGenAI, Type } from '@google/genai';
import type { Booster, Task } from '../types';
import { TaskStatus, TaskVerification } from '../types';

// IMPORTANT: In a real application, the API key should be handled securely and not exposed on the client-side.
// We are assuming `process.env.API_KEY` is available in the build environment.
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// --- MOCK IMPLEMENTATION ---
// To avoid running real API calls in this example, we will use mocked data that
// simulates the structure of a real Gemini API response. The functions below
// demonstrate how the API *would* be called.

export const generateInitialBoosters = async (): Promise<Booster[]> => {
    console.log("Simulating Gemini API call to generate boosters...");
    
    /*
    // REAL GEMINI API CALL EXAMPLE:
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Generate a list of 5 creative names for crypto mining boosters. Include a short, exciting description for each, a price in USD, and how much it increases the hash rate (MH/s).",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.STRING },
                            name: { type: Type.STRING },
                            description: { type: Type.STRING },
                            price: { type: Type.NUMBER },
                            hashRateIncrease: { type: Type.NUMBER }
                        }
                    }
                }
            }
        });
        const boosters = JSON.parse(response.text);
        return boosters.map((b: any, index: number) => ({...b, id: `booster-${index}`}));
    } catch (error) {
        console.error("Error fetching boosters from Gemini API, using fallback data.", error);
        // Fallback to mock data if API fails
    }
    */

    return Promise.resolve([
        { id: 'b-1', name: 'Quantum Overdrive', description: 'Harness quantum fluctuations for a massive temporary boost.', price: 25, hashRateIncrease: 15 },
        { id: 'b-2', name: 'Cryo-Coolant System', description: 'Super-cool your rigs to increase efficiency and output.', price: 15, hashRateIncrease: 8 },
        { id: 'b-3', name: 'Solar Flare Surge', description: 'Capture cosmic energy for a powerful hashing surge.', price: 50, hashRateIncrease: 35 },
        { id: 'b-4', name: 'Nano-Bot Swarm', description: 'Deploy microscopic bots to optimize mining algorithms in real-time.', price: 35, hashRateIncrease: 22 },
        { id: 'b-5', name: 'Singularity Core', description: 'A stable micro-singularity provides unparalleled processing power.', price: 100, hashRateIncrease: 80 },
    ]);
};

export const generateInitialTasks = async (): Promise<Task[]> => {
    console.log("Simulating Gemini API call to generate tasks...");

    // This function would similarly call the Gemini API to generate tasks.
    // For brevity, we'll return a mock list directly.
    return Promise.resolve([
        { id: 't-1', title: 'Follow AuraMine on X', description: 'Stay up to date with our latest news and updates.', reward: 0.5, verification: TaskVerification.AUTO, status: TaskStatus.IDLE },
        { id: 't-2', title: 'Join our Discord Community', description: 'Engage with other miners and get support.', reward: 0.75, verification: TaskVerification.AUTO, status: TaskStatus.IDLE },
        { id: 't-3', title: 'Watch a Tutorial Video', description: 'Learn how to maximize your mining efficiency.', reward: 1.0, verification: TaskVerification.AUTO, status: TaskStatus.IDLE },
        { id: 't-4', title: 'Submit a Feedback Form', description: 'Help us improve AuraMine by sharing your thoughts.', reward: 2.5, verification: TaskVerification.MANUAL, status: TaskStatus.IDLE },
        { id: 't-5', title: 'Refer a Friend', description: 'Invite a friend to join AuraMine and earn when they start mining.', reward: 5.0, verification: TaskVerification.MANUAL, status: TaskStatus.IDLE },
    ]);
};
