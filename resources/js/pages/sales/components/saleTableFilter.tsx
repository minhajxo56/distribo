// resources/js/pages/sales/components/saleTableFilter.tsx
import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const MORE_STATUS_OPTIONS = ['Refunded', 'Draft', 'Failed'];
const MORE_DATE_OPTIONS = ['Last Month', 'Last 3 Months', 'This Year'];

export default function SaleTableFilter() {
    const [saleNumber, setSaleNumber] = useState('');
    const [activeStatus, setActiveStatus] = useState('Paid');
    const [activeDate, setActiveDate] = useState('Today');
    const [openDropdown, setOpenDropdown] = useState<'status' | 'date' | null>(null);

    const toggleDropdown = (type: 'status' | 'date') => {
        setOpenDropdown(openDropdown === type ? null : type);
    };

    const selectStatus = (status: string) => { setActiveStatus(status); setOpenDropdown(null); };
    const selectDate = (date: string) => { setActiveDate(date); setOpenDropdown(null); };

    const MoreDropdown = ({ type, options, currentValue, onSelect }: any) => {
        if (openDropdown !== type) return null;
        return (
            <>
                <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)} />
                <div className="absolute top-full mt-1 right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                    {options.map((option: string) => (
                        <button
                            key={option}
                            onClick={() => onSelect(option)}
                            className="w-full text-left px-4 py-3 text-sm font-bold text-gray-800 border-b border-gray-100 last:border-0 active:bg-blue-50 flex items-center justify-between"
                        >
                            {option}
                            {currentValue === option && <Check size={16} className="text-blue-600" strokeWidth={3} />}
                        </button>
                    ))}
                </div>
            </>
        );
    };

    return (
        <div className="bg-white p-3 border-b border-gray-200 flex flex-col gap-4 shadow-sm relative z-10">
            {/* Sale Number Search Cell */}
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
                    Invoice Number
                </label>
                <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors">
                    <div className="bg-gray-200 px-3 py-3 flex items-center justify-center border-r border-gray-300">
                        <span className="text-sm font-bold text-gray-700">SA-</span>
                    </div>
                    <input 
                        type="text" 
                        maxLength={4} 
                        inputMode="numeric"
                        placeholder="0000"
                        value={saleNumber}
                        onChange={(e) => setSaleNumber(e.target.value.replace(/\D/g, ''))}
                        className="flex-1 w-full px-3 py-3 bg-transparent border-none outline-none font-bold text-gray-900 text-base placeholder-gray-400"
                    />
                </div>
            </div>

            {/* Status Segmented Buttons */}
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
                    Status
                </label>
                <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 relative">
                    {['Paid', 'Due', 'Cancel'].map((status) => (
                        <button
                            key={status}
                            onClick={() => selectStatus(status)}
                            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-md transition-colors touch-manipulation ${
                                activeStatus === status 
                                    ? 'bg-white text-blue-700 shadow-sm border border-gray-200/50' 
                                    : 'text-gray-600 active:bg-gray-200'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                    
                    <div className="flex-1 relative flex">
                        <button
                            onClick={() => toggleDropdown('status')}
                            className={`flex-1 flex items-center justify-center gap-1 py-2.5 text-xs sm:text-sm font-bold rounded-md transition-colors touch-manipulation ${
                                MORE_STATUS_OPTIONS.includes(activeStatus) || openDropdown === 'status'
                                    ? 'bg-white text-blue-700 shadow-sm border border-gray-200/50' 
                                    : 'text-gray-600 active:bg-gray-200'
                            }`}
                        >
                            {MORE_STATUS_OPTIONS.includes(activeStatus) ? activeStatus : 'More'}
                            <ChevronDown size={14} strokeWidth={3} />
                        </button>
                        <MoreDropdown type="status" options={MORE_STATUS_OPTIONS} currentValue={activeStatus} onSelect={selectStatus} />
                    </div>
                </div>
            </div>

            {/* Date Pill Buttons */}
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
                    Date Range
                </label>
                <div className="flex flex-wrap gap-2 relative">
                    {['Today', 'Yesterday', 'Last 7 Days', 'This Month'].map((date) => (
                        <button
                            key={date}
                            onClick={() => selectDate(date)}
                            className={`px-3.5 py-2 rounded-full text-sm font-bold border transition-colors touch-manipulation ${
                                activeDate === date
                                    ? 'bg-blue-50 border-blue-600 text-blue-700'
                                    : 'bg-white border-gray-300 text-gray-700 active:bg-gray-100'
                            }`}
                        >
                            {date}
                        </button>
                    ))}
                    <div className="relative inline-block">
                        <button
                            onClick={() => toggleDropdown('date')}
                            className={`flex items-center gap-1 px-3.5 py-2 rounded-full text-sm font-bold border transition-colors touch-manipulation ${
                                MORE_DATE_OPTIONS.includes(activeDate) || openDropdown === 'date'
                                    ? 'bg-blue-50 border-blue-600 text-blue-700'
                                    : 'bg-white border-gray-300 text-gray-700 active:bg-gray-100'
                            }`}
                        >
                            {MORE_DATE_OPTIONS.includes(activeDate) ? activeDate : 'More'}
                            <ChevronDown size={16} strokeWidth={2.5} />
                        </button>
                        <MoreDropdown type="date" options={MORE_DATE_OPTIONS} currentValue={activeDate} onSelect={selectDate} />
                    </div>
                </div>
            </div>
        </div>
    );
}