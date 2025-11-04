
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { TaskIcon } from './icons';
import type { Task } from '../types';
import { TaskStatus, TaskVerification } from '../types';

const TaskCard: React.FC<{ task: Task, onComplete: (task: Task) => void }> = ({ task, onComplete }) => {
    const getStatusStyles = () => {
        switch (task.status) {
            case TaskStatus.COMPLETED:
                return "bg-green-500 text-white";
            case TaskStatus.PENDING:
                return "bg-yellow-500 text-black";
            default:
                return "bg-brand-accent hover:bg-blue-600 text-white";
        }
    };
    
    const getStatusText = () => {
        switch(task.status) {
            case TaskStatus.COMPLETED: return "Completed";
            case TaskStatus.PENDING: return "Pending";
            default: return "Complete";
        }
    };

    return (
        <div className="bg-dark-card p-4 rounded-xl border border-dark-border flex items-center justify-between animate-fadeIn">
            <div className="flex-1 pr-4">
                <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                <p className="text-sm text-medium-text">{task.description}</p>
                <p className="text-sm text-brand-secondary font-bold mt-1">Reward: {task.reward} USDT</p>
            </div>
            <button
                onClick={() => onComplete(task)}
                disabled={task.status !== TaskStatus.IDLE}
                className={`py-2 px-5 rounded-lg font-bold transition-colors text-sm ${getStatusStyles()} disabled:opacity-60 disabled:cursor-not-allowed`}
            >
                {getStatusText()}
            </button>
        </div>
    );
};

const TaskCenter: React.FC = () => {
    const { tasks, setAppState } = useAppContext();

    const handleComplete = (taskToUpdate: Task) => {
        setAppState(prev => {
            const newTasks = prev.tasks.map(task => {
                if (task.id === taskToUpdate.id) {
                    const isAuto = task.verification === TaskVerification.AUTO;
                    return { ...task, status: isAuto ? TaskStatus.COMPLETED : TaskStatus.PENDING };
                }
                return task;
            });

            const newBalance = taskToUpdate.verification === TaskVerification.AUTO
                ? prev.balance + taskToUpdate.reward
                : prev.balance;

            return { ...prev, tasks: newTasks, balance: newBalance };
        });
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8">Task Center</h2>
            <div className="space-y-4">
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} onComplete={handleComplete} />
                ))}
            </div>
        </div>
    );
};

export default TaskCenter;
