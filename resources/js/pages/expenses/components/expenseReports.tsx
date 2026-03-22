// resources/js/pages/expenses/components/expenseReports.tsx
import { useState } from 'react';
import { ChevronLeft, PieChart, Tag, Plus, CheckCircle, Trash2 } from 'lucide-react';

export default function ExpenseReports({ onClose }: any) {
    const [activeTab, setActiveTab] = useState<'reports' | 'categories'>('reports');
    
    // Category Management State
    const [categories, setCategories] = useState(['Utilities', 'Transport', 'Rent', 'Maintenance', 'Office Supplies']);
    const [newCategory, setNewCategory] = useState('');

    const addCategory = () => {
        if (newCategory.trim() && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setNewCategory('');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">Expense Management</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-10 w-full max-w-3xl mx-auto p-4 flex flex-col gap-4">
                {/* Tabs */}
                <div className="flex bg-gray-200 p-1 rounded-xl shadow-inner">
                    <button onClick={() => setActiveTab('reports')} className={`flex-1 py-3 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${activeTab === 'reports' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 active:bg-gray-300'}`}>
                        <PieChart size={18} /> Reports Summary
                    </button>
                    <button onClick={() => setActiveTab('categories')} className={`flex-1 py-3 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${activeTab === 'categories' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 active:bg-gray-300'}`}>
                        <Tag size={18} /> Manage Categories
                    </button>
                </div>

                {activeTab === 'reports' && (
                    <div className="flex flex-col gap-4 animate-in fade-in">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-blue-600 text-white p-4 rounded-xl shadow-sm">
                                <p className="text-xs font-bold text-blue-200 uppercase tracking-wider mb-1">This Month</p>
                                <p className="text-2xl font-black">৳45,200</p>
                            </div>
                            <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Pending Approval</p>
                                <p className="text-2xl font-black text-orange-600">৳8,500</p>
                            </div>
                        </div>

                        {/* Category Breakdown Bar Chart Simulator */}
                        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Category Breakdown</h3>
                            
                            <div className="flex flex-col gap-3">
                                {[
                                    { cat: 'Utilities', amt: 20000, pct: 60, color: 'bg-blue-500' },
                                    { cat: 'Transport', amt: 12000, pct: 30, color: 'bg-indigo-500' },
                                    { cat: 'Office Supplies', amt: 3200, pct: 10, color: 'bg-teal-500' },
                                ].map(item => (
                                    <div key={item.cat}>
                                        <div className="flex justify-between text-sm font-bold text-gray-700 mb-1">
                                            <span>{item.cat}</span>
                                            <span>৳{item.amt.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                            <div className={`${item.color} h-2`} style={{ width: `${item.pct}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <button className="w-full mt-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-bold text-sm active:bg-gray-200">
                                Export Full Report (PDF)
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'categories' && (
                    <div className="flex flex-col gap-4 animate-in fade-in">
                        <div className="flex items-center gap-2">
                            <input 
                                type="text" placeholder="New category name..." value={newCategory} onChange={e => setNewCategory(e.target.value)}
                                className="flex-1 bg-white border border-gray-300 text-gray-900 font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <button onClick={addCategory} disabled={!newCategory} className="py-3 px-4 bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-bold flex items-center gap-2">
                                <Plus size={20} /> Add
                            </button>
                        </div>
                        
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                            {categories.map((cat, idx) => (
                                <div key={cat} className={`flex justify-between items-center p-4 ${idx !== categories.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                    <span className="font-bold text-gray-900">{cat}</span>
                                    <button className="p-2 bg-red-50 text-red-600 rounded-lg active:bg-red-100"><Trash2 size={18}/></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}