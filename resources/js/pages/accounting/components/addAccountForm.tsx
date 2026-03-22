// resources/js/pages/accounting/components/addAccountForm.tsx
import { useState } from 'react';
import { ChevronLeft, CheckCircle, Hash } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';

export default function AddAccountForm({ onClose }: any) {
    const [name, setName] = useState('');
    const [type, setType] = useState('Asset');
    const [code, setCode] = useState('');

    const handleSave = () => {
        console.log("Account Added", { name, type, code });
        onClose();
    };

    const isValid = name.trim() !== '' && type !== '';

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">Add New Account</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-32 w-full max-w-3xl mx-auto p-4 flex flex-col gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Account Name</label>
                        <input type="text" placeholder="e.g. Petty Cash, Office Supplies" value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-lg font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Account Type</label>
                        <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600">
                            <option value="Asset">Asset (Cash, Bank, Property)</option>
                            <option value="Liability">Liability (Loans, Payables)</option>
                            <option value="Equity">Equity (Capital, Retained Earnings)</option>
                            <option value="Income">Income (Sales, Revenue)</option>
                            <option value="Expense">Expense (Rent, Utilities, Payroll)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><Hash size={16}/> Account Code (Optional)</label>
                        <input type="text" placeholder="e.g. 1001" value={code} onChange={e => setCode(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600" />
                    </div>
                </div>
            </main>

            <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 shadow-sm">
                <div className="max-w-3xl mx-auto w-full">
                    <button onClick={handleSave} disabled={!isValid} className="w-full py-4 bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors">
                        <CheckCircle size={22} strokeWidth={3} /> Save Account
                    </button>
                </div>
            </div>
            <BottomBreadcrumb currentPage="Accounting > Accounts > Add Account" />
        </div>
    );
}