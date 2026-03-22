// resources/js/pages/expenses/components/expenseList.tsx
import { Receipt, AlertCircle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface Expense {
    id: string;
    title: string;
    amount: number;
    category: string;
    date: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    paymentMethod: string;
    isRecurring?: boolean;
}

export default function ExpenseList({ expenses, onRowClick }: { expenses: Expense[], onRowClick: (e: Expense) => void }) {
    return (
        <div className="p-3 pb-24 flex flex-col gap-3"> 
            {expenses.map((expense) => {
                const isPending = expense.status === 'Pending';
                const isApproved = expense.status === 'Approved';
                const isRejected = expense.status === 'Rejected';
                
                return (
                    <div 
                        key={expense.id}
                        onClick={() => onRowClick(expense)}
                        className={`bg-white border rounded-xl p-4 shadow-sm transition-colors touch-manipulation flex flex-col gap-2
                            ${isPending ? 'border-orange-300 active:bg-orange-50' : 
                              isRejected ? 'border-red-300 active:bg-red-50' : 
                              'border-gray-200 active:bg-gray-50'}`}
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-1 pr-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-base font-bold text-gray-900 leading-none">{expense.title}</h3>
                                    {expense.isRecurring && <RefreshCw size={14} className="text-blue-600" />}
                                </div>
                                <p className="text-xs font-bold text-gray-500">
                                    {expense.category} • {expense.date}
                                </p>
                            </div>
                            <div className="text-right">
                                <span className="text-xl font-black text-gray-900">৳{expense.amount.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-100 pt-2 mt-1">
                            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                                Paid via: {expense.paymentMethod}
                            </span>
                            
                            <div className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md
                                ${isPending ? 'bg-orange-100 text-orange-700' : isRejected ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
                            >
                                {isPending && <AlertCircle size={14} />}
                                {isApproved && <CheckCircle size={14} />}
                                {isRejected && <XCircle size={14} />}
                                {expense.status}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}