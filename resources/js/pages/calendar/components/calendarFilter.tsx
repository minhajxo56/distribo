// resources/js/pages/calendar/components/calendarFilter.tsx
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function CalendarFilter() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeType, setActiveType] = useState('All');

    return (
        <div className="bg-white p-3 border-b border-gray-200 flex flex-col gap-4 shadow-sm relative z-10">
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
                    Search Agenda
                </label>
                <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-600 transition-colors">
                    <div className="px-3 text-gray-400"><Search size={20} /></div>
                    <input 
                        type="text" 
                        placeholder="Search events, tasks, or notes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 w-full py-3 pr-3 bg-transparent border-none outline-none font-bold text-gray-900 text-base placeholder-gray-400"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
                    Filter by Type
                </label>
                <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1">
                    {['All', 'Meeting', 'Delivery', 'Task', 'Note', 'Personal'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveType(type)}
                            className={`px-4 py-2 text-sm font-bold rounded-full transition-colors whitespace-nowrap touch-manipulation border ${
                                activeType === type 
                                    ? 'bg-indigo-50 border-indigo-600 text-indigo-700' 
                                    : 'bg-white border-gray-300 text-gray-600 active:bg-gray-100'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}