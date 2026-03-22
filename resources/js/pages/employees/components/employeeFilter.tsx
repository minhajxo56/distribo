// resources/js/pages/employees/components/employeeFilter.tsx
import { useState } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';

export default function EmployeeFilter() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeStatus, setActiveStatus] = useState('Active');

    return (
        <div className="bg-white p-3 border-b border-gray-200 flex flex-col gap-4 shadow-sm relative z-10">
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
                    Search Employees
                </label>
                <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-teal-600 transition-colors">
                    <div className="px-3 text-gray-400"><Search size={20} /></div>
                    <input 
                        type="text" 
                        placeholder="Name, Phone, or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 w-full py-3 pr-3 bg-transparent border-none outline-none font-bold text-gray-900 text-base placeholder-gray-400"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
                        Role
                    </label>
                    <select className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-teal-600">
                        <option>All Roles</option>
                        <option>Manager</option>
                        <option>Staff</option>
                        <option>Delivery Person</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
                        Status
                    </label>
                    <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                        {['Active', 'Inactive'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setActiveStatus(status)}
                                className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors touch-manipulation ${
                                    activeStatus === status 
                                        ? 'bg-white text-teal-700 shadow-sm border border-gray-200/50' 
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