// resources/js/pages/delivery/components/deliveryFilter.tsx
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function DeliveryFilter() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeStatus, setActiveStatus] = useState('All');

    return (
        <div className="bg-white p-3 border-b border-gray-200 flex flex-col gap-4 shadow-sm relative z-10">
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
                    Search Trips or Drivers
                </label>
                <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-600 transition-colors">
                    <div className="px-3 text-gray-400"><Search size={20} /></div>
                    <input 
                        type="text" 
                        placeholder="Trip ID, Driver Name, or Vehicle..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 w-full py-3 pr-3 bg-transparent border-none outline-none font-bold text-gray-900 text-base placeholder-gray-400"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
                    Trip Status
                </label>
                <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 overflow-x-auto hide-scrollbar">
                    {['All', 'Pending', 'In Transit', 'Completed'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setActiveStatus(status)}
                            className={`flex-1 min-w-[80px] py-2.5 text-xs sm:text-sm font-bold rounded-md transition-colors touch-manipulation ${
                                activeStatus === status 
                                    ? 'bg-white text-blue-700 shadow-sm border border-gray-200/50' 
                                    : 'text-gray-600 active:bg-gray-200'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}