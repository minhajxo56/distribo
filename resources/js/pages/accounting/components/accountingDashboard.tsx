// resources/js/pages/accounting/components/accountingDashboard.tsx
import { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet, FileText, PieChart } from 'lucide-react';

interface AccountingDashboardProps {
    onViewBalanceSheet: () => void;
    onExportLedger: () => void;
}

export default function AccountingDashboard({ onViewBalanceSheet, onExportLedger }: AccountingDashboardProps) {
    // Standardize month selection (defaults to current month)
    const [selectedPeriod, setSelectedPeriod] = useState('March 2026');

    return (
        <div className="flex flex-col gap-4 animate-in fade-in pb-24 w-full max-w-3xl mx-auto">
            
            {/* 1. HIGH-LEVEL PROFIT & LOSS SUMMARY */}
            <div className="bg-white p-4 border-b border-gray-200 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                        <PieChart size={18} className="text-gray-400" />
                        Net Profit
                    </h2>
                    <select 
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="March 2026">March 2026</option>
                        <option value="February 2026">February 2026</option>
                        <option value="January 2026">January 2026</option>
                    </select>
                </div>
                
                <div className="flex flex-col">
                    <span className="text-4xl font-black text-green-600 tracking-tight">৳1,45,000</span>
                    <span className="text-sm font-bold text-gray-500 mt-1">Total Income minus Total Expenses</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                    {/* Total Income Block */}
                    <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl flex items-start gap-2">
                        <ArrowUpRight size={20} className="text-blue-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                        <div>
                            <p className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-0.5">Total Income</p>
                            <p className="text-lg font-black text-blue-900 leading-none">৳5,20,000</p>
                        </div>
                    </div>
                    
                    {/* Total Expenses Block */}
                    <div className="bg-orange-50 border border-orange-200 p-3 rounded-xl flex items-start gap-2">
                        <ArrowDownRight size={20} className="text-orange-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                        <div>
                            <p className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-0.5">Total Expenses</p>
                            <p className="text-lg font-black text-orange-900 leading-none">৳3,75,000</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. LIQUID ASSETS (CASH & BANK BALANCES) */}
            <div className="px-3">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 pl-1">
                    Liquid Assets (Cash & Bank)
                </h3>
                <div className="flex flex-col gap-3">
                    
                    {/* Cash Register */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-teal-100 p-2.5 rounded-full text-teal-700 shrink-0">
                                <Wallet size={24} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-base leading-tight">Main Cash Register</h4>
                                <p className="text-xs font-bold text-gray-500 mt-0.5">Asset • Cash in Hand</p>
                            </div>
                        </div>
                        <span className="text-xl font-black text-gray-900 tracking-tight">৳85,000</span>
                    </div>
                    
                    {/* Bank Account */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-indigo-100 p-2.5 rounded-full text-indigo-700 shrink-0">
                                <DollarSign size={24} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-base leading-tight">City Bank Ltd.</h4>
                                <p className="text-xs font-bold text-gray-500 mt-0.5">Asset • Bank Account</p>
                            </div>
                        </div>
                        <span className="text-xl font-black text-gray-900 tracking-tight">৳3,40,000</span>
                    </div>

                </div>
            </div>

            {/* 3. ACTION PROMPTS */}
            <div className="px-3 mt-2 mb-4">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 pl-1">
                    Quick Reports
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={onViewBalanceSheet}
                        className="py-4 bg-gray-900 text-white rounded-xl font-bold text-sm shadow-sm active:bg-black touch-manipulation flex flex-col items-center justify-center gap-1.5 transition-colors"
                    >
                        <Wallet size={20} strokeWidth={2.5} />
                        Balance Sheet
                    </button>
                    
                    <button 
                        onClick={onExportLedger}
                        className="py-4 bg-white border-2 border-gray-300 text-gray-800 rounded-xl font-bold text-sm shadow-sm active:bg-gray-100 touch-manipulation flex flex-col items-center justify-center gap-1.5 transition-colors"
                    >
                        <FileText size={20} strokeWidth={2.5} className="text-gray-600" />
                        Export Ledger
                    </button>
                </div>
            </div>

        </div>
    );
}