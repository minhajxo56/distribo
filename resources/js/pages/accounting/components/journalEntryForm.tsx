// resources/js/pages/accounting/components/journalEntryForm.tsx
import { useState } from 'react';
import { ChevronLeft, CheckCircle, Plus, Trash2, AlertTriangle } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';

interface JournalRow { id: number; account: string; debit: string; credit: string; }

export default function JournalEntryForm({ onClose }: any) {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [reference, setReference] = useState('');
    const [rows, setRows] = useState<JournalRow[]>([
        { id: 1, account: 'Office Expenses', debit: '', credit: '' },
        { id: 2, account: 'Cash Register', debit: '', credit: '' },
    ]);

    const ACCOUNTS = ['Cash Register', 'City Bank Ltd.', 'Office Expenses', 'Sales Revenue', 'Inventory Asset', 'Owner Equity', 'Accounts Receivable', 'Accounts Payable'];

    const addRow = () => setRows([...rows, { id: Date.now(), account: '', debit: '', credit: '' }]);
    const removeRow = (id: number) => setRows(rows.filter(r => r.id !== id));

    const updateRow = (id: number, field: keyof JournalRow, value: string) => {
        setRows(rows.map(r => {
            if (r.id === id) {
                // Prevent having both debit and credit in the same row
                if (field === 'debit' && value !== '') return { ...r, debit: value, credit: '' };
                if (field === 'credit' && value !== '') return { ...r, credit: value, debit: '' };
                return { ...r, [field]: value };
            }
            return r;
        }));
    };

    // Calculate Totals
    const totalDebit = rows.reduce((sum, r) => sum + (Number(r.debit) || 0), 0);
    const totalCredit = rows.reduce((sum, r) => sum + (Number(r.credit) || 0), 0);
    const difference = Math.abs(totalDebit - totalCredit);
    
    // Strict Double-Entry Validation
    const isBalanced = totalDebit > 0 && totalCredit > 0 && totalDebit === totalCredit;
    const isAccountsSelected = rows.every(r => r.account !== '');
    const isValid = isBalanced && isAccountsSelected && date !== '';

    const handleSave = () => {
        console.log("Journal Entry Saved", { date, reference, rows, totalDebit });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">Manual Journal Entry</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-48 w-full max-w-3xl mx-auto p-4 flex flex-col gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex gap-3">
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Date</label>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-600" />
                    </div>
                    <div className="flex-[1.5]">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Reference</label>
                        <input type="text" placeholder="e.g. Correction" value={reference} onChange={e => setReference(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-600" />
                    </div>
                </div>

                {/* Journal Rows */}
                <div className="flex flex-col gap-3">
                    {rows.map((row, index) => (
                        <div key={row.id} className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm relative">
                            {rows.length > 2 && (
                                <button onClick={() => removeRow(row.id)} className="absolute top-2 right-2 p-1.5 bg-red-50 text-red-600 rounded-md"><Trash2 size={16}/></button>
                            )}
                            <div className="mb-2 pr-8">
                                <select value={row.account} onChange={e => updateRow(row.id, 'account', e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-600">
                                    <option value="">Select Account...</option>
                                    {ACCOUNTS.map(a => <option key={a} value={a}>{a}</option>)}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Debit (Dr)</label>
                                    <input type="text" inputMode="numeric" placeholder="0" value={row.debit} onChange={e => updateRow(row.id, 'debit', e.target.value.replace(/\D/g, ''))} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Credit (Cr)</label>
                                    <input type="text" inputMode="numeric" placeholder="0" value={row.credit} onChange={e => updateRow(row.id, 'credit', e.target.value.replace(/\D/g, ''))} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600" />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={addRow} className="py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:bg-gray-100">
                        <Plus size={18} strokeWidth={3} /> Add Account Row
                    </button>
                </div>
            </main>

            {/* Validation & Save Footer */}
            <div className="fixed bottom-14 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
                <div className="max-w-3xl mx-auto w-full p-4">
                    
                    {/* Totals & Validation State */}
                    <div className="flex justify-between items-center mb-3 px-1">
                        <div className="text-center">
                            <p className="text-xs font-bold text-gray-500 uppercase">Total Debit</p>
                            <p className="text-lg font-black text-gray-900">৳{totalDebit.toLocaleString()}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            {isBalanced ? (
                                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1"><CheckCircle size={14}/> Balanced</div>
                            ) : (
                                <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1"><AlertTriangle size={14}/> Diff: ৳{difference.toLocaleString()}</div>
                            )}
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-bold text-gray-500 uppercase">Total Credit</p>
                            <p className="text-lg font-black text-gray-900">৳{totalCredit.toLocaleString()}</p>
                        </div>
                    </div>

                    <button onClick={handleSave} disabled={!isValid} className="w-full py-4 bg-gray-900 active:bg-black disabled:bg-gray-300 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors">
                        <CheckCircle size={22} strokeWidth={3} /> Post Journal Entry
                    </button>
                </div>
            </div>
            <BottomBreadcrumb currentPage="Accounting > Journal Entry" />
        </div>
    );
}