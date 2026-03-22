// resources/js/pages/inventory/components/manualAddStockForm.tsx
import { useState } from 'react';
import { ChevronLeft, CheckCircle, Plus, Minus, Search, PlusCircle, Calendar, Truck, DollarSign, StickyNote, Package } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';

interface InventoryItem {
    id: string;
    name: string;
    code: string;
    unit: string;
}

// Dummy Database for Autocomplete
const DUMMY_ITEMS: InventoryItem[] = [
    { id: '1', name: 'Cement Bag (50kg)', code: 'CEM-50', unit: 'Bags' },
    { id: '2', name: 'Steel Rod (500W)', code: 'STL-500', unit: 'Ton' },
    { id: '3', name: 'White Paint (10L)', code: 'PNT-W10', unit: 'Pcs' },
];

export default function ManualAddStockForm({ onClose }: any) {
    // Autocomplete State
    const [itemSearch, setItemSearch] = useState('');
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    // Core Form State
    const [quantity, setQuantity] = useState<number | string>('');
    
    // Optional Details State
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default today: YYYY-MM-DD
    const [purchasePrice, setPurchasePrice] = useState('');
    const [supplier, setSupplier] = useState('');
    const [notes, setNotes] = useState('');

    // Autocomplete Logic
    const filteredItems = DUMMY_ITEMS.filter(i => 
        i.name.toLowerCase().includes(itemSearch.toLowerCase()) || 
        i.code.toLowerCase().includes(itemSearch.toLowerCase())
    );

    const handleItemSelect = (item: InventoryItem) => {
        setSelectedItem(item);
        setItemSearch(item.name);
        setShowSuggestions(false);
    };

    const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemSearch(e.target.value);
        setSelectedItem(null); 
        setShowSuggestions(true);
    };

    const updateQuantity = (delta: number) => {
        const current = Number(quantity) || 0;
        setQuantity(Math.max(0, current + delta));
    };

    const handleSave = () => {
        const payload = {
            item: selectedItem ? selectedItem : { id: 'new', name: itemSearch },
            isNewItem: !selectedItem,
            quantity: Number(quantity) || 0,
            date,
            purchasePrice: Number(purchasePrice) || 0,
            supplier,
            notes,
            transactionType: 'Manual Add'
        };
        console.log("Manual Stock Added!", payload);
        onClose(); 
    };

    // Validation
    const isValid = itemSearch.trim() !== '' && (Number(quantity) > 0);

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            {/* TOP BAR */}
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm relative z-30">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full touch-manipulation">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">Add Manual Stock</h1>
                </div>
            </header>

            {/* MAIN SCROLLABLE CONTENT */}
            <main className="flex-1 overflow-y-auto pb-32 w-full max-w-3xl mx-auto p-4 flex flex-col gap-5 relative z-10">
                
                {/* 1. ITEM SELECTION (AUTOCOMPLETE) */}
                <div className="relative z-20">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Select or Create Item</label>
                    <div className={`flex items-center bg-white border ${selectedItem ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-300'} rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-600 shadow-sm transition-all`}>
                        <div className={`px-3 ${selectedItem ? 'text-green-600' : 'text-gray-400'}`}>
                            {selectedItem ? <CheckCircle size={20} strokeWidth={2.5} /> : <Search size={20} />}
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search item name or code..."
                            value={itemSearch}
                            onChange={handleItemChange}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            className="flex-1 w-full py-4 pr-3 bg-transparent border-none outline-none font-bold text-gray-900 text-base placeholder-gray-400"
                        />
                    </div>

                    {showSuggestions && itemSearch.trim() !== '' && (
                        <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-30 overflow-hidden max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2">
                            {filteredItems.length > 0 ? (
                                filteredItems.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleItemSelect(item)}
                                        className="w-full text-left p-4 border-b border-gray-100 last:border-none active:bg-blue-50 flex items-center justify-between touch-manipulation"
                                    >
                                        <div>
                                            <span className="font-bold text-gray-900 text-base block">{item.name}</span>
                                            <span className="text-sm font-bold text-gray-500">{item.code}</span>
                                        </div>
                                        <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{item.unit}</span>
                                    </button>
                                ))
                            ) : (
                                <div className="p-3">
                                    <button 
                                        onClick={() => setShowSuggestions(false)}
                                        className="w-full flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg font-bold text-base active:bg-blue-100 touch-manipulation"
                                    >
                                        <PlusCircle size={20} strokeWidth={2.5} />
                                        Add as new item: "{itemSearch}"
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* 2. QUANTITY INPUT */}
                <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm">
                    <label className="block text-sm font-bold text-gray-700 mb-3">Quantity to Add</label>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => updateQuantity(-1)}
                            className="w-16 h-14 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-xl active:bg-gray-200 touch-manipulation"
                        >
                            <Minus size={24} strokeWidth={3} className="text-gray-700" />
                        </button>
                        
                        <div className="flex-1 relative">
                            <input 
                                type="text" 
                                inputMode="numeric"
                                placeholder="0"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value.replace(/\D/g, ''))}
                                className="w-full h-14 text-center bg-gray-50 border border-gray-300 text-gray-900 text-2xl font-black rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            {selectedItem && (
                                <span className="absolute right-3 top-4 text-sm font-bold text-gray-400 uppercase">
                                    {selectedItem.unit}
                                </span>
                            )}
                        </div>

                        <button 
                            onClick={() => updateQuantity(1)}
                            className="w-16 h-14 flex items-center justify-center bg-blue-100 border border-blue-300 rounded-xl active:bg-blue-200 touch-manipulation"
                        >
                            <Plus size={24} strokeWidth={3} className="text-blue-700" />
                        </button>
                    </div>
                </div>

                {/* 3. OPTIONAL DETAILS CARD */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mt-2">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Optional Details</h3>
                    </div>
                    
                    <div className="p-4 flex flex-col gap-4">
                        {/* Date Picker */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                                <Calendar size={16} className="text-gray-400" /> Date
                            </label>
                            <input 
                                type="date" 
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        {/* Purchase Price */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                                <DollarSign size={16} className="text-gray-400" /> Total Purchase Price (৳)
                            </label>
                            <input 
                                type="text" 
                                inputMode="numeric"
                                placeholder="0"
                                value={purchasePrice}
                                onChange={(e) => setPurchasePrice(e.target.value.replace(/\D/g, ''))}
                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-lg font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        {/* Supplier */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                                <Truck size={16} className="text-gray-400" /> Supplier / Source
                            </label>
                            <input 
                                type="text" 
                                placeholder="e.g. Local Market, Vendor Name..."
                                value={supplier}
                                onChange={(e) => setSupplier(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                                <StickyNote size={16} className="text-gray-400" /> Notes
                            </label>
                            <textarea 
                                rows={2}
                                placeholder="Reason for adding..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                            />
                        </div>
                    </div>
                </div>

            </main>

            {/* FIXED BOTTOM ACTION BAR */}
            <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">
                <div className="max-w-3xl mx-auto w-full">
                    <button 
                        onClick={handleSave} 
                        disabled={!isValid}
                        className="w-full py-4 bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 disabled:active:bg-gray-300 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 touch-manipulation shadow-sm transition-colors"
                    >
                        <Package size={22} strokeWidth={2.5} /> 
                        Save Stock Entry
                    </button>
                </div>
            </div>

            <BottomBreadcrumb currentPage="Inventory > Manual Add Stock" />
        </div>
    );
}