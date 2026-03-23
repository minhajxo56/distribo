// resources/js/pages/partners/components/partnerFilter.tsx
import { useState } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';

export default function PartnerFilter() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeStatus, setActiveStatus] = useState('All');
    const [activeType, setActiveType] = useState('All');

    return (
        <div className="bg-white p-3 border-b border-gray-200 flex flex-col gap-4 shadow-sm relative z-10">
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
                    Search Partners
                </label>
                <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-600 transition-colors">
                    <div className="px-3 text-gray-400"><Search size={20} /></div>
                    <input 
                        type="text" 
                        placeholder="Name, Phone, or Code..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 w-full py-3 pr-3 bg-transparent border-none outline-none font-bold text-gray-900 text-base placeholder-gray-400"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
                        Partner Type
                    </label>
                    <select 
                        value={activeType}
                        onChange={(e) => setActiveType(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                        <option value="All">All Types</option>
                        <option value="Vendor">Vendor</option>
                        <option value="Shop">Shop</option>
                        <option value="Distributor">Distributor</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
                        Status
                    </label>
                    <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                        {['All', 'Active', 'Inactive'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setActiveStatus(status)}
                                className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors touch-manipulation ${
                                    activeStatus === status 
                                        ? 'bg-white text-indigo-700 shadow-sm border border-gray-200/50' 
                                        : 'text-gray-600 active:bg-gray-200'
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}