// resources/js/pages/employees/components/processPayrollForm.tsx
import { useState } from 'react';
import { ChevronLeft, CheckCircle, Banknote, Plus, Minus } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';

export default function ProcessPayrollForm({ record, onClose }: any) {
    const [allowance, setAllowance] = useState('');
    const [deduction, setDeduction] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Bank');

    const baseSalary = record?.baseSalary || 0;
    const numAllowance = Number(allowance) || 0;
    const numDeduction = Number(deduction) || 0;
    
    const netPayable = baseSalary + numAllowance - numDeduction;

    const handleConfirm = () => {
        console.log("Salary Paid", { empName: record.empName, baseSalary, numAllowance, numDeduction, netPayable, paymentMethod });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">Process Salary</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-32 w-full max-w-3xl mx-auto p-4 flex flex-col gap-4">
                <div className="bg-teal-600 text-white p-4 rounded-xl shadow-sm">
                    <p className="text-teal-100 text-sm font-bold uppercase tracking-wider mb-1">Employee</p>
                    <h2 className="text-2xl font-black">{record?.empName}</h2>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-gray-600 font-bold">Basic Salary</span>
                        <span className="text-lg font-black text-gray-900">৳{baseSalary.toLocaleString()}</span>
                    </div>

                    <div>
                        <label className="text-sm font-bold text-green-600 mb-1.5 flex items-center gap-1"><Plus size={16}/> Bonus / Allowance</label>
                        <input type="text" inputMode="numeric" placeholder="0" value={allowance} onChange={e => setAllowance(e.target.value.replace(/\D/g, ''))} className="w-full bg-green-50 border border-green-200 text-green-900 text-lg font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-green-600" />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-red-600 mb-1.5 flex items-center gap-1"><Minus size={16}/> Deductions (Loan/Advance)</label>
                        <input type="text" inputMode="numeric" placeholder="0" value={deduction} onChange={e => setDeduction(e.target.value.replace(/\D/g, ''))} className="w-full bg-red-50 border border-red-200 text-red-900 text-lg font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-red-600" />
                    </div>
                </div>

                <div className="bg-gray-900 text-white p-4 rounded-xl shadow-sm flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-300 uppercase tracking-wider">Net Payable</span>
                    <span className="text-3xl font-black">৳{netPayable.toLocaleString()}</span>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Payment Method</label>
                    <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                        {['Cash', 'Bank', 'bKash'].map(method => (
                            <button key={method} onClick={() => setPaymentMethod(method)} className={`flex-1 py-3 text-sm font-bold rounded-md transition-colors ${paymentMethod === method ? 'bg-white text-teal-700 shadow-sm border border-gray-200/50' : 'text-gray-600 active:bg-gray-200'}`}>
                                {method}
                            </button>
                        ))}
                    </div>
                </div>
            </main>

            <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 shadow-sm">
                <div className="max-w-3xl mx-auto w-full">
                    <button onClick={handleConfirm} className="w-full py-4 bg-teal-600 active:bg-teal-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors">
                        <Banknote size={22} strokeWidth={3} /> Record Payment
                    </button>
                </div>
            </div>
            <BottomBreadcrumb currentPage="Payroll > Process Salary" />
        </div>
    );
}