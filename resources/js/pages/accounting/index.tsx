// resources/js/pages/accounting/index.tsx
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Plus, BookOpen, Repeat, PieChart, FileText, LayoutList } from 'lucide-react';

// Reusable UI
import TopIndexBar from '../components/topIndexBar';
import BottomBreadcrumb from '../components/bottomBreadcrumb';
import ListItemActions from '../components/listItemActions';

// Hub Components
import AccountingDashboard from './components/accountingDashboard';
import TransferForm from './components/transferForm';
import JournalEntryForm from './components/journalEntryForm';

// New Operational Modals
import BalanceSheetView from './components/balanceSheetView';
import ExportLedgerForm from './components/exportLedgerForm';
import AddAccountForm from './components/addAccountForm';

// Dummy Ledger
const DUMMY_TRANSACTIONS = [
    { id: 'TRX-992', desc: 'Salary Payment', date: 'Today', amount: 25000, type: 'Expense' },
    { id: 'TRX-991', desc: 'Invoice SA-5012 Paid', date: 'Yesterday', amount: 150000, type: 'Income' },
];

export default function AccountingHub() {
    const [activeTab, setActiveTab] = useState<'overview' | 'accounts' | 'ledger'>('overview');
    
    // Bottom Menus
    const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);
    
    // Full Screen Modals
    const [showTransferForm, setShowTransferForm] = useState(false);
    const [showJournalForm, setShowJournalForm] = useState(false);
    const [showBalanceSheet, setShowBalanceSheet] = useState(false);
    const [showExportLedger, setShowExportLedger] = useState(false);
    const [showAddAccount, setShowAddAccount] = useState(false);

    const isAnyModalOpen = showTransferForm || showJournalForm || showBalanceSheet || showExportLedger || showAddAccount;

    // Transaction Actions (Used for Overview and Ledger Tabs)
    const transactionFabActions = [
        { label: 'Record Transfer (Cash/Bank)', icon: Repeat, onClick: () => { setIsFabMenuOpen(false); setShowTransferForm(true); }, type: 'primary' as const },
        { label: 'Manual Journal Entry', icon: BookOpen, onClick: () => { setIsFabMenuOpen(false); setShowJournalForm(true); } },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
            <Head title="Accounting - Distribo" />
            <TopIndexBar title="Accounting" actionLabel="" onActionClick={() => {}} isFilterActive={false} />

            {/* TAB NAVIGATION */}
            <div className="bg-white border-b border-gray-200 px-3 py-3 sticky top-14 z-20 shadow-sm">
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button onClick={() => setActiveTab('overview')} className={`flex-1 py-2.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${activeTab === 'overview' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 active:bg-gray-200'}`}>
                        <PieChart size={16}/> Overview
                    </button>
                    <button onClick={() => setActiveTab('accounts')} className={`flex-1 py-2.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${activeTab === 'accounts' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 active:bg-gray-200'}`}>
                        <LayoutList size={16}/> Accounts
                    </button>
                    <button onClick={() => setActiveTab('ledger')} className={`flex-1 py-2.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${activeTab === 'ledger' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 active:bg-gray-200'}`}>
                        <FileText size={16}/> Ledger
                    </button>
                </div>
            </div>

            <main className="flex-1 w-full max-w-3xl mx-auto flex flex-col relative z-0">
                {activeTab === 'overview' && (
                    <AccountingDashboard 
                        onViewBalanceSheet={() => setShowBalanceSheet(true)}
                        onExportLedger={() => setShowExportLedger(true)}
                    />
                )}
                
                {activeTab === 'accounts' && (
                    <div className="p-4 flex flex-col gap-3 animate-in fade-in pb-24">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Chart of Accounts</h3>
                        {['Cash Register (Asset)', 'City Bank (Asset)', 'Sales Revenue (Income)', 'Office Rent (Expense)'].map((acc, i) => (
                            <div key={i} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex justify-between items-center active:bg-gray-50 touch-manipulation">
                                <span className="font-bold text-gray-900">{acc}</span>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'ledger' && (
                    <div className="p-4 flex flex-col gap-3 animate-in fade-in pb-24">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Recent Transactions</h3>
                        {DUMMY_TRANSACTIONS.map(trx => (
                            <div key={trx.id} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex flex-col gap-2">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-gray-900 text-base">{trx.desc}</h4>
                                    <span className={`text-lg font-black ${trx.type === 'Income' ? 'text-green-600' : trx.type === 'Expense' ? 'text-red-600' : 'text-gray-900'}`}>
                                        {trx.type === 'Expense' ? '-' : ''}৳{trx.amount.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* CONTEXTUAL FAB */}
            {!isAnyModalOpen && (
                <button
                    onClick={() => activeTab === 'accounts' ? setShowAddAccount(true) : setIsFabMenuOpen(true)}
                    className="fixed bottom-20 right-4 bg-gray-900 active:bg-black text-white px-5 py-3.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.25)] z-30 touch-manipulation transition-transform active:scale-95 flex items-center gap-2 font-bold text-base"
                >
                    <Plus size={22} strokeWidth={3} /> {activeTab === 'accounts' ? 'Add Account' : 'Record Entry'}
                </button>
            )}

            <ListItemActions isOpen={isFabMenuOpen} onClose={() => setIsFabMenuOpen(false)} title="Accounting Actions" actions={transactionFabActions} />

            <BottomBreadcrumb currentPage={`Accounting > ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`} />

            {/* FULL SCREEN MODALS */}
            {showTransferForm && <TransferForm onClose={() => setShowTransferForm(false)} />}
            {showJournalForm && <JournalEntryForm onClose={() => setShowJournalForm(false)} />}
            {showBalanceSheet && <BalanceSheetView onClose={() => setShowBalanceSheet(false)} />}
            {showExportLedger && <ExportLedgerForm onClose={() => setShowExportLedger(false)} />}
            {showAddAccount && <AddAccountForm onClose={() => setShowAddAccount(false)} />}
        </div>
    );
}