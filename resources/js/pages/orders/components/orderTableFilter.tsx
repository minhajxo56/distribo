// resources/js/pages/orders/components/orderTableFilter.tsx
import { useState } from 'react';
import { ChevronDown, Calendar, Check } from 'lucide-react';

const MORE_STATUS_OPTIONS = ['Processing', 'Refunded', 'Failed'];
const MORE_DATE_OPTIONS = ['Last Month', 'Last 3 Months', 'This Year'];

export default function OrderTableFilter() {
    // Filter States
    const [orderNumber, setOrderNumber] = useState('');
    const [activeStatus, setActiveStatus] = useState('Pending');
    const [activeDate, setActiveDate] = useState('This Month');
    
    // Dropdown States
    const [openDropdown, setOpenDropdown] = useState<'status' | 'date' | null>(null);

    const toggleDropdown = (type: 'status' | 'date') => {
        setOpenDropdown(openDropdown === type ? null : type);
    };

    const selectStatus = (status: string) => {
        setActiveStatus(status);
        setOpenDropdown(null);
    };

    const selectDate = (date: string) => {
        setActiveDate(date);
        setOpenDropdown(null);
    };

    // Reusable Dropdown Component
    const MoreDropdown = ({ 
        type, 
        options, 
        currentValue, 
        onSelect 
    }: { 
        type: 'status' | 'date', 
        options: string[], 
        currentValue: string, 
        onSelect: (val: string) => void 
    }) => {
        if (openDropdown !== type) return null;
        
        return (
            <>
                <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)} />
                <div className="absolute top-full mt-2 left-0 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => onSelect(option)}
                            className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                        >
                            {option}
                            {currentValue === option && <Check size={16} className="text-gray-800" />}
                        </button>
                    ))}
                </div>
            </>
        );
    };

    return (
        <div className="bg-[#f8f9fa] p-5 pb-6 border-b border-gray-200 flex flex-col gap-8 relative z-10">
            
            {/* 1. Order Number Search Cell */}
            <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                    Search by order number
                </label>
                <div className="flex items-center bg-[#f1f3f5] rounded-md px-4 py-3 w-[220px]">
                    <input 
                        type="text" 
                        maxLength={4} 
                        inputMode="numeric"
                        placeholder="Last 4 digits"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value.replace(/\D/g, ''))}
                        className="flex-1 bg-transparent border-none outline-none font-medium text-gray-800 text-sm placeholder-gray-400"
                    />
                    <span className="text-gray-400 text-lg font-normal leading-none ml-2">#</span>
                </div>
            </div>

            {/* 2. Status Segmented Buttons */}
            <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                    Select order status
                </label>
                <div className="flex flex-wrap gap-3">
                    {['Received', 'Pending', 'Cancel'].map((status) => (
                        <button
                            key={status}
                            onClick={() => selectStatus(status)}
                            className={`px-5 py-2.5 text-sm font-medium rounded-md transition-colors touch-manipulation ${
                                activeStatus === status 
                                    ? 'bg-[#5f6368] text-white' 
                                    : 'bg-white text-gray-600 shadow-sm'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
                
                {/* Status More Button */}
                <div className="relative inline-block mt-3">
                    <button
                        onClick={() => toggleDropdown('status')}
                        className="flex items-center gap-1.5 py-2 text-sm font-medium text-gray-600 transition-colors touch-manipulation"
                    >
                        {MORE_STATUS_OPTIONS.includes(activeStatus) ? activeStatus : 'More'}
                        <ChevronDown size={14} strokeWidth={2} />
                    </button>
                    
                    <MoreDropdown 
                        type="status" 
                        options={MORE_STATUS_OPTIONS} 
                        currentValue={activeStatus} 
                        onSelect={selectStatus} 
                    />
                </div>
            </div>

            {/* 3. Date Pill Buttons */}
            <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                    Select date range
                </label>
                <div className="flex flex-wrap items-center gap-3 relative">
                    {['Today', 'Yesterday', 'Last 7 Days', 'This Month'].map((date) => (
                        <button
                            key={date}
                            onClick={() => selectDate(date)}
                            className={`px-5 py-2.5 rounded-[14px] text-sm font-medium transition-colors touch-manipulation ${
                                activeDate === date
                                    ? 'bg-[#5f6368] text-white'
                                    : 'bg-white text-gray-600 shadow-sm'
                            }`}
                        >
                            {date}
                        </button>
                    ))}

                    {/* Date More Button */}
                    <div className="relative inline-block ml-1">
                        <button
                            onClick={() => toggleDropdown('date')}
                            className="flex items-center gap-1.5 px-2 py-2 text-sm font-medium text-gray-600 transition-colors touch-manipulation"
                        >
                            {MORE_DATE_OPTIONS.includes(activeDate) ? activeDate : 'More'}
                            <Calendar size={15} strokeWidth={2} className="text-gray-500" />
                        </button>
                        
                        <MoreDropdown 
                            type="date" 
                            options={MORE_DATE_OPTIONS} 
                            currentValue={activeDate} 
                            onSelect={selectDate} 
                        />
                    </div>
                </div>
            </div>
            
        </div>
    );
}