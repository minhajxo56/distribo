// resources/js/pages/expenses/components/expenseForm.tsx
import { useState } from 'react';
import { ChevronLeft, CheckCircle, Upload, FileText, RefreshCw, Paperclip } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';

export default function ExpenseForm({ isEdit = false, initialData, onClose }: any) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [amount, setAmount] = useState(initialData?.amount?.toString() || '');
    const [category, setCategory] = useState(initialData?.category || '');
    const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
    const [paymentMethod, setPaymentMethod] = useState(initialData?.paymentMethod || 'Cash');
    
    const [isRecurring, setIsRecurring] = useState(initialData?.isRecurring || false);
    const [recurringFreq, setRecurringFreq] = useState('Monthly');
    const [notes, setNotes] = useState(initialData?.notes || '');
    const [hasAttachment, setHasAttachment] = useState(false);

    const isValid = title.trim() !== '' && Number(amount) > 0 && category !== '';

    const handleSave = () => {
        console.log("Expense Saved", { title, amount: Number(amount), category, date, paymentMethod, isRecurring, recurringFreq, notes, status: 'Pending' });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">{isEdit ? 'Edit Expense' : 'Record Expense'}</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-32 w-full max-w-3xl mx-auto p-4 flex flex-col gap-4">
                
                {/* Core Details */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Expense Amount (৳)</label>
                        <input 
                            type="text" inputMode="numeric" placeholder="0" value={amount}
                            onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
                            className="w-full h-14 bg-gray-50 border border-gray-300 text-gray-900 text-2xl font-black rounded-xl px-4 outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Title / Description</label>
                        <input 
                            type="text" placeholder="e.g. Office Electricity Bill" value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Category</label>
                            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600">
                                <option value="">Select...</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Transport">Transport</option>
                                <option value="Rent">Rent</option>
                                <option value="Maintenance">Maintenance</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Date</label>
                            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Paid From (Account / Method)</label>
                        <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600">
                            <option value="Cash">Cash (Main Register)</option>
                            <option value="Bank">Bank Account</option>
                            <option value="bKash">bKash Merchant</option>
                        </select>
                    </div>
                </div>

                {/* Advanced Options */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Advanced Tracking</h3>
                    </div>
                    <div className="p-4 flex flex-col gap-4">
                        
                        {/* Recurring Setup */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-gray-900 text-base flex items-center gap-2"><RefreshCw size={18}/> Recurring Expense</h4>
                                <p className="text-xs font-bold text-gray-500">Auto-generate this expense</p>
                            </div>
                            <button onClick={() => setIsRecurring(!isRecurring)} className={`w-14 h-8 rounded-full transition-colors flex items-center px-1 ${isRecurring ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'}`}>
                                <div className="w-6 h-6 bg-white rounded-full shadow-sm"></div>
                            </button>
                        </div>
                        {isRecurring && (
                            <select value={recurringFreq} onChange={e => setRecurringFreq(e.target.value)} className="w-full bg-blue-50 border border-blue-200 text-blue-900 text-sm font-bold rounded-lg px-3 py-3 outline-none">
                                <option value="Daily">Repeat Daily</option>
                                <option value="Weekly">Repeat Weekly</option>
                                <option value="Monthly">Repeat Monthly</option>
                            </select>
                        )}

                        {/* File Attachment */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1.5"><Paperclip size={16}/> Receipt / Invoice</label>
                            <button onClick={() => setHasAttachment(!hasAttachment)} className={`w-full py-4 border-2 border-dashed rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${hasAttachment ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300 text-gray-600 active:bg-gray-100'}`}>
                                {hasAttachment ? <><CheckCircle size={20}/> document_scan_001.pdf Attached</> : <><Upload size={20}/> Tap to Upload Photo/PDF</>}
                            </button>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Internal Notes</label>
                            <textarea rows={2} placeholder="Add reason or remarks..." value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none resize-none" />
                        </div>
                    </div>
                </div>
            </main>

            <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 shadow-sm">
                <div className="max-w-3xl mx-auto w-full">
                    <button onClick={handleSave} disabled={!isValid} className="w-full py-4 bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors">
                        <CheckCircle size={22} strokeWidth={3} /> Submit for Approval
                    </button>
                </div>
            </div>
            <BottomBreadcrumb currentPage="Expenses > Record Expense" />
        </div>
    );
}