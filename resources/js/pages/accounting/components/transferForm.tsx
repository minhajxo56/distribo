// resources/js/pages/accounting/components/transferForm.tsx
import { useState } from 'react';
import { ChevronLeft, CheckCircle, ArrowRightLeft, Calendar } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';

export default function TransferForm({ onClose }: any) {
    const [fromAccount, setFromAccount] = useState('Cash Register');
    const [toAccount, setToAccount] = useState('City Bank Ltd.');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [notes, setNotes] = useState('');

    const handleSave = () => {
        console.log("Transfer Recorded", { fromAccount, toAccount, amount: Number(amount), date, notes });
        onClose();
    };

    const isValid = fromAccount && toAccount && fromAccount !== toAccount && Number(amount) > 0;

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">Record Transfer</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-32 w-full max-w-3xl mx-auto p-4 flex flex-col gap-4">
                
                {/* Amount */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center">
                    <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Transfer Amount (৳)</label>
                    <input 
                        type="text" inputMode="numeric" placeholder="0" value={amount}
                        onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
                        className="w-full text-center bg-gray-50 border border-gray-300 text-gray-900 text-4xl font-black rounded-xl py-4 outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* From / To Routing */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm relative p-4 flex flex-col gap-4">
                    <div>
                        <label className="block text-xs font-bold text-red-600 uppercase tracking-wider mb-1.5">Take Money From</label>
                        <select value={fromAccount} onChange={e => setFromAccount(e.target.value)} className="w-full bg-red-50 border border-red-200 text-red-900 text-base font-bold rounded-lg px-3 py-3 outline-none">
                            <option value="Cash Register">Cash Register</option>
                            <option value="City Bank Ltd.">City Bank Ltd.</option>
                            <option value="Owner Equity">Owner Equity / Capital</option>
                        </select>
                    </div>
                    
                    {/* Visual Connector */}
                    <div className="absolute left-8 top-[85px] bottom-[85px] w-0.5 bg-gray-200 z-0"></div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-100 p-2 rounded-full border border-gray-300 z-10">
                        <ArrowRightLeft size={20} className="text-gray-500" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-green-600 uppercase tracking-wider mb-1.5">Deposit To</label>
                        <select value={toAccount} onChange={e => setToAccount(e.target.value)} className="w-full bg-green-50 border border-green-200 text-green-900 text-base font-bold rounded-lg px-3 py-3 outline-none">
                            <option value="Cash Register">Cash Register</option>
                            <option value="City Bank Ltd.">City Bank Ltd.</option>
                            <option value="Petty Cash">Petty Cash</option>
                        </select>
                    </div>
                </div>

                {/* Details */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><Calendar size={16}/> Date</label>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Reference / Notes</label>
                        <textarea rows={2} placeholder="Reason for transfer..." value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-600" />
                    </div>
                </div>
            </main>

            <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 shadow-sm">
                <div className="max-w-3xl mx-auto w-full">
                    <button onClick={handleSave} disabled={!isValid} className="w-full py-4 bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors">
                        <CheckCircle size={22} strokeWidth={3} /> Save Transfer
                    </button>
                </div>
            </div>
            <BottomBreadcrumb currentPage="Accounting > Record Transfer" />
        </div>
    );
}