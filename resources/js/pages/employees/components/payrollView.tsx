// resources/js/pages/employees/components/payrollView.tsx
import { useState } from 'react';
import { Banknote, CheckCircle, AlertCircle } from 'lucide-react';

const DUMMY_PAYROLL = [
    { id: 'PAY-001', empName: 'Karim Mia', baseSalary: 18000, netSalary: 18000, status: 'Paid' },
    { id: 'PAY-002', empName: 'Rahim Uddin', baseSalary: 35000, netSalary: 32000, status: 'Unpaid' }, // Deducted 3000
];

export default function PayrollView({ onProcessPayment }: any) {
    const [month, setMonth] = useState('2026-03');

    return (
        <div className="flex flex-col gap-4 pb-24">
            {/* Month Selector & Summary */}
            <div className="bg-white p-4 border-b border-gray-200 shadow-sm flex flex-col gap-4 sticky top-0 z-10">
                <div className="flex justify-between items-center">
                    <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Payroll Month</h2>
                    <input 
                        type="month" 
                        value={month} 
                        onChange={e => setMonth(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-600"
                    />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-teal-50 border border-teal-200 p-3 rounded-xl">
                        <p className="text-xs font-bold text-teal-800 uppercase mb-1">Total Payroll</p>
                        <p className="text-xl font-black text-teal-900">৳50,000</p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 p-3 rounded-xl">
                        <p className="text-xs font-bold text-orange-800 uppercase mb-1">Unpaid Dues</p>
                        <p className="text-xl font-black text-orange-900">৳32,000</p>
                    </div>
                </div>
            </div>

            {/* Payroll Records List */}
            <div className="px-3 flex flex-col gap-3">
                {DUMMY_PAYROLL.map(record => (
                    <div 
                        key={record.id} 
                        onClick={() => record.status === 'Unpaid' ? onProcessPayment(record) : null}
                        className={`bg-white border rounded-xl p-4 shadow-sm flex items-center justify-between touch-manipulation transition-colors
                            ${record.status === 'Unpaid' ? 'border-orange-300 active:bg-orange-50 cursor-pointer' : 'border-gray-200 opacity-75'}`}
                    >
                        <div>
                            <h3 className="font-bold text-gray-900 text-base mb-1">{record.empName}</h3>
                            <p className="text-sm font-bold text-gray-500">Net: ৳{record.netSalary.toLocaleString()} <span className="text-xs font-normal">(Base: ৳{record.baseSalary.toLocaleString()})</span></p>
                        </div>
                        <div className="text-right">
                            {record.status === 'Paid' ? (
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs font-bold uppercase flex items-center gap-1">
                                    <CheckCircle size={14}/> Paid
                                </span>
                            ) : (
                                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-md text-xs font-bold uppercase flex items-center gap-1 shadow-sm border border-orange-200">
                                    <AlertCircle size={14}/> Pay Now
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}