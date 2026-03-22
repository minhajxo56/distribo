// resources/js/pages/components/topIndexBar.tsx
import { Filter, X } from 'lucide-react';

interface TopIndexBarProps {
    title: string;
    onActionClick: () => void;
    actionLabel: string;
    isFilterActive?: boolean; // Used to change the button appearance when filter is open
}

export default function TopIndexBar({ title, onActionClick, actionLabel, isFilterActive }: TopIndexBarProps) {
    return (
        <header className="bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between shrink-0 sticky top-0 z-20 shadow-sm">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h1>
            
            <button 
                onClick={onActionClick}
                className={`px-3 py-2 rounded-lg flex items-center gap-1.5 font-bold text-sm transition-colors touch-manipulation shadow-sm border ${
                    isFilterActive 
                        ? 'bg-blue-50 text-blue-700 border-blue-200 active:bg-blue-100' 
                        : 'bg-white text-gray-700 border-gray-300 active:bg-gray-100'
                }`}
            >
                {isFilterActive ? (
                    <X size={18} strokeWidth={2.5} />
                ) : (
                    <Filter size={18} strokeWidth={2.5} />
                )}
                <span>{isFilterActive ? 'Close' : actionLabel}</span>
            </button>
        </header>
    );
}