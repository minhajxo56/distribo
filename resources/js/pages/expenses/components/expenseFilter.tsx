// resources/js/pages/expenses/components/expenseFilter.tsx
import { useState } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';

export default function ExpenseFilter() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeStatus, setActiveStatus] = useState('All');
    const [sortBy, setSortBy] = useState('Date (Newest)');

    return (
        <div className="bg-white p-3 border-b border-gray-200 flex flex-col gap-4 shadow-sm relative z-10">
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
                    Search Expenses
                </label>
                <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-600 transition-colors">
                    <div className="px-3 text-gray-400"><Search size={20} /></div>
                    <input 
                        type="text" 
                        placeholder="Title, Reference, or Category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 w-full py-3 pr-3 bg-transparent border-none outline-none font-bold text-gray-900 text-base placeholder-gray-400"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
                        Approval Status
                    </label>
                    <select className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600">
                        <option>All Statuses</option>
                        <option>Pending</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                    </select>
                </div>
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
                            <option>Date (Newest)</option>
                            <option>Date (Oldest)</option>
                            <option>Amount (High-Low)</option>
                            <option>Amount (Low-High)</option>
                        </select>
                        <ArrowUpDown size={16} className="absolute right-3 top-3.5 text-gray-500 pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    );
}