// resources/js/pages/accounting/components/balanceSheetView.tsx
import { ChevronLeft, Download, Wallet, CreditCard, Building } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';

export default function BalanceSheetView({ onClose }: any) {
    const handleDownload = () => {
        console.log("Downloading Balance Sheet PDF...");
    };

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            <header className="bg-gray-900 border-b border-gray-800 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20 text-white">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-300 active:bg-gray-700 rounded-full touch-manipulation">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold tracking-tight">Balance Sheet</h1>
                </div>
                <button onClick={handleDownload} className="p-2 text-gray-300 active:bg-gray-700 rounded-full touch-manipulation">
                    <Download size={20} strokeWidth={2.5} />
                </button>
            </header>

            <main className="flex-1 overflow-y-auto pb-32 w-full max-w-3xl mx-auto p-4 flex flex-col gap-5">
                
                {/* As of Date */}
                <div className="text-center mb-2">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">As of</p>
                    <h2 className="text-lg font-black text-gray-900">March 22, 2026</h2>
                </div>

                {/* ASSETS */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-teal-50 px-4 py-3 border-b border-teal-100 flex items-center gap-2">
                        <Wallet size={18} className="text-teal-700" />
                        <h3 className="text-sm font-bold text-teal-900 uppercase tracking-wider">Assets (What you own)</h3>
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <span className="font-bold text-gray-700">Cash Register</span>
                            <span className="font-black text-gray-900">৳85,000</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <span className="font-bold text-gray-700">City Bank Ltd.</span>
                            <span className="font-black text-gray-900">৳3,40,000</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <span className="font-bold text-gray-700">Accounts Receivable</span>
                            <span className="font-black text-gray-900">৳12,000</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 mt-1">
                            <span className="font-black text-gray-900 uppercase">Total Assets</span>
                            <span className="text-xl font-black text-teal-700">৳4,37,000</span>
                        </div>
                    </div>
                </div>

                {/* LIABILITIES */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-orange-50 px-4 py-3 border-b border-orange-100 flex items-center gap-2">
                        <CreditCard size={18} className="text-orange-700" />
                        <h3 className="text-sm font-bold text-orange-900 uppercase tracking-wider">Liabilities (What you owe)</h3>
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <span className="font-bold text-gray-700">Accounts Payable</span>
                            <span className="font-black text-gray-900">৳25,000</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 mt-1">
                            <span className="font-black text-gray-900 uppercase">Total Liabilities</span>
                            <span className="text-xl font-black text-orange-700">৳25,000</span>
                        </div>
                    </div>
                </div>

                {/* EQUITY */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-blue-50 px-4 py-3 border-b border-blue-100 flex items-center gap-2">
                        <Building size={18} className="text-blue-700" />
                        <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider">Equity (Net Worth)</h3>
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <span className="font-bold text-gray-700">Owner's Capital</span>
                            <span className="font-black text-gray-900">৳2,67,000</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <span className="font-bold text-gray-700">Retained Earnings</span>
                            <span className="font-black text-gray-900">৳1,45,000</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 mt-1">
                            <span className="font-black text-gray-900 uppercase">Total Equity</span>
                            <span className="text-xl font-black text-blue-700">৳4,12,000</span>
                        </div>
                    </div>
                </div>

            </main>

            <div className="fixed bottom-14 left-0 right-0 p-4 bg-gray-900 border-t border-gray-800 z-40 shadow-sm text-white">
                <div className="max-w-3xl mx-auto w-full flex justify-between items-center px-2">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Assets</p>
                        <p className="text-2xl font-black text-teal-400">৳4,37,000</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Liabilities + Equity</p>
                        <p className="text-2xl font-black text-blue-400">৳4,37,000</p>
                    </div>
                </div>
            </div>
            <BottomBreadcrumb currentPage="Accounting > Balance Sheet" />
        </div>
    );
}