// resources/js/pages/accounting/components/exportLedgerForm.tsx
import { useState } from 'react';
import { ChevronLeft, Download, FileText, Calendar } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';

export default function ExportLedgerForm({ onClose }: any) {
    const [account, setAccount] = useState('All Accounts');
    const [dateRange, setDateRange] = useState('This Month');
    const [format, setFormat] = useState('PDF');

    const handleExport = () => {
        console.log(`Exporting Ledger: ${account} | ${dateRange} | ${format}`);
        // Trigger simulated toast or download action here
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">Export Ledger</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-32 w-full max-w-3xl mx-auto p-4 flex flex-col gap-5">
                
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><FileText size={16}/> Select Account</label>
                        <select value={account} onChange={e => setAccount(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600">
                            <option value="All Accounts">All Accounts (Full Ledger)</option>
                            <option value="Cash Register">Cash Register</option>
                            <option value="City Bank Ltd.">City Bank Ltd.</option>
                            <option value="Sales Revenue">Sales Revenue</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><Calendar size={16}/> Date Range</label>
                        <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600">
                            <option value="Today">Today</option>
                            <option value="This Month">This Month (Mar 2026)</option>
                            <option value="Last Month">Last Month (Feb 2026)</option>
                            <option value="This Year">This Year (2026)</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Export Format</label>
                    <div className="flex gap-3">
                        {['PDF', 'Excel (CSV)'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFormat(f)}
                                className={`flex-1 py-4 text-sm font-bold rounded-xl border-2 transition-colors touch-manipulation ${
                                    format === f ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm' : 'bg-white border-gray-200 text-gray-600 active:bg-gray-50'
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

            </main>

            <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 shadow-sm">
                <div className="max-w-3xl mx-auto w-full">
                    <button onClick={handleExport} className="w-full py-4 bg-blue-600 active:bg-blue-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors">
                        <Download size={22} strokeWidth={3} /> Download {format} File
                    </button>
                </div>
            </div>
            <BottomBreadcrumb currentPage="Accounting > Export Ledger" />
        </div>
    );
}