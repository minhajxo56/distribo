import { ListFilter } from 'lucide-react';

interface TopIndexBarProps {
    title: string;
    onActionClick?: () => void;
    isFilterActive?: boolean;
}

export default function TopIndexBar({ title, onActionClick, isFilterActive }: TopIndexBarProps) {
    return (
        <div className="bg-white border-b border-gray-50 px-5 py-2 flex items-center justify-between">
            <h1 className="text-base font-medium text-gray-900 tracking-tight">
                {title}
            </h1>
            
            <button 
                onClick={onActionClick}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isFilterActive ? 'bg-gray-200' : 'bg-gray-50 hover:bg-gray-100'
                }`}
                aria-label="Toggle Filter"
            >
                {/* ListFilter matches the three horizontal lines in your screenshot */}
                <ListFilter className="w-4 h-4 text-gray-700" strokeWidth={1.5} />
            </button>
        </div>
    );
}