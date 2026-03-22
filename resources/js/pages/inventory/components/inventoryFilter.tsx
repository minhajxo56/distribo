// resources/js/pages/inventory/components/inventoryFilter.tsx
import { useState } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';

export default function InventoryFilter() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeStatus, setActiveStatus] = useState('All');
    const [sortBy, setSortBy] = useState('Last Updated');

    return (
        <div className="bg-white p-3 border-b border-gray-200 flex flex-col gap-4 shadow-sm relative z-10">
            {/* Search (Name, Code, Barcode) */}
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
                    Search Inventory
                </label>
                <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-600 transition-colors">
                    <div className="px-3 text-gray-400"><Search size={20} /></div>
                    <input 
                        type="text" 
                        placeholder="Name, Code, or Barcode..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 w-full py-3 pr-3 bg-transparent border-none outline-none font-bold text-gray-900 text-base placeholder-gray-400"
                    />
                </div>
            </div>

            {/* Status Segments */}
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
                    Stock Status
                </label>
                <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                    {['All', 'In Stock', 'Low', 'Out'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setActiveStatus(status)}
                            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-md transition-colors touch-manipulation ${
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

            {/* Sorting Dropdown */}
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
                    Sort By
                </label>
                <div className="relative">
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600 appearance-none"
                    >
                        <option>Last Updated</option>
                        <option>Name (A-Z)</option>
                        <option>Quantity (High to Low)</option>
                        <option>Quantity (Low to High)</option>
                    </select>
                    <ArrowUpDown size={16} className="absolute right-3 top-3.5 text-gray-500 pointer-events-none" />
                </div>
            </div>
        </div>
    );
}