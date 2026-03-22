// resources/js/pages/expenses/index.tsx
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Plus, CheckCircle, XCircle, FileEdit, Trash2, PieChart } from 'lucide-react';

import TopIndexBar from '../components/topIndexBar';
import BottomBreadcrumb from '../components/bottomBreadcrumb';
import ListItemActions from '../components/listItemActions';

import ExpenseFilter from './components/expenseFilter';
import ExpenseList from './components/expenseList';
import ExpenseForm from './components/expenseForm';
import ExpenseReports from './components/expenseReports';

const dummyExpenses = [
    { id: 'EXP-101', title: 'Office Electricity Bill', amount: 12500, category: 'Utilities', date: '2026-03-21', status: 'Pending' as const, paymentMethod: 'Bank', isRecurring: true },
    { id: 'EXP-102', title: 'Delivery Van Fuel', amount: 3000, category: 'Transport', date: '2026-03-20', status: 'Approved' as const, paymentMethod: 'Cash' },
    { id: 'EXP-103', title: 'New Office Chairs', amount: 45000, category: 'Maintenance', date: '2026-03-18', status: 'Rejected' as const, paymentMethod: 'Bank' },
];

export default function ExpensesIndex() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    // Bottom Action Sheets
    const [isActionOpen, setIsActionOpen] = useState(false);
    const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState<any>(null);
    
    // Modals
    const [showExpenseForm, setShowExpenseForm] = useState(false);
    const [showReports, setShowReports] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const isAnyModalOpen = showExpenseForm || showReports;

    const handleRowClick = (expense: any) => {
        setSelectedExpense(expense);
        setIsActionOpen(true);
    };

    const handleEditExpense = () => {
        setIsEditMode(true);
        setIsActionOpen(false);
        setShowExpenseForm(true);
    };

    // FAB Menu items
    const fabActions = [
        { label: 'Record New Expense', icon: Plus, onClick: () => { setIsFabMenuOpen(false); setIsEditMode(false); setSelectedExpense(null); setShowExpenseForm(true); }, type: 'primary' as const },
        { label: 'View Reports & Categories', icon: PieChart, onClick: () => { setIsFabMenuOpen(false); setShowReports(true); } },
    ];

    // Item Specific Actions (Includes Approvals)
    const itemActions = [
        ...(selectedExpense?.status === 'Pending' ? [
            { label: 'Approve Expense', icon: CheckCircle, onClick: () => console.log('Approve', selectedExpense.id), type: 'primary' as const },
            { label: 'Reject Expense', icon: XCircle, onClick: () => console.log('Reject', selectedExpense.id), type: 'danger' as const },
        ] : []),
        { label: 'Edit Details', icon: FileEdit, onClick: handleEditExpense },
        { label: 'Delete Record', icon: Trash2, onClick: () => console.log('Delete', selectedExpense?.id), type: 'danger' as const },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
            <Head title="Expenses - Distribo" />

            <TopIndexBar 
                title="Expenses" 
                actionLabel="Filter" 
                onActionClick={() => setIsFilterOpen(!isFilterOpen)} 
                isFilterActive={isFilterOpen}
            />

            <main className="flex-1 w-full max-w-3xl mx-auto flex flex-col relative">
                {isFilterOpen && (
                    <div className="animate-in slide-in-from-top-2 duration-200 z-20">
                        <ExpenseFilter />
                    </div>
                )}
                
                <div className="z-10">
                    <ExpenseList expenses={dummyExpenses} onRowClick={handleRowClick} />
                </div>
            </main>

            {!isAnyModalOpen && (
                <button
                    onClick={() => setIsFabMenuOpen(true)}
                    className="fixed bottom-20 right-4 bg-red-600 active:bg-red-700 text-white px-5 py-3.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.25)] z-30 touch-manipulation transition-transform active:scale-95 flex items-center gap-2 font-bold text-base"
                >
                    <Plus size={22} strokeWidth={3} />
                    Manage Expenses
                </button>
            )}

            <ListItemActions isOpen={isFabMenuOpen} onClose={() => setIsFabMenuOpen(false)} title="Expense Options" actions={fabActions} />
            <ListItemActions isOpen={isActionOpen} onClose={() => setIsActionOpen(false)} title={selectedExpense ? selectedExpense.title : ''} actions={itemActions} />

            <BottomBreadcrumb currentPage="Expenses" />

            {showExpenseForm && <ExpenseForm isEdit={isEditMode} initialData={isEditMode ? selectedExpense : null} onClose={() => setShowExpenseForm(false)} />}
            {showReports && <ExpenseReports onClose={() => setShowReports(false)} />}
        </div>
    );
}