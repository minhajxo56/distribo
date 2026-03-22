// resources/js/pages/sales/components/saleForm.tsx
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Plus, Minus, CheckCircle, User, Search, PlusCircle, StickyNote } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';

interface ProductItem { id: string; name: string; price: number; quantity: number; stock: number; }
interface Client { id: string; name: string; phone: string; }

// Dummy Client Database for Autocomplete
const DUMMY_CLIENTS: Client[] = [
    { id: 'c1', name: 'Hasan Builders', phone: '01711223344' },
    { id: 'c2', name: 'Al-Amin Traders', phone: '01822334455' },
    { id: 'c3', name: 'Rahim Store', phone: '01933445566' },
];

export default function SaleForm({ isEdit = false, initialData, onClose }: any) {
    // Client Autocomplete State
    const [clientSearch, setClientSearch] = useState(initialData?.customer || '');
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    // Form States
    const [notes, setNotes] = useState('');
    
    // Product State (Stock limited)
    const [products, setProducts] = useState<ProductItem[]>([
        { id: '1', name: 'Cement Bag (50kg)', price: 550, quantity: initialData ? 50 : 0, stock: 200 },
        { id: '2', name: 'Steel Rod (500W)', price: 78000, quantity: initialData ? 1 : 0, stock: 5 },
    ]);

    const totalAmount = products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = products.reduce((sum, item) => sum + item.quantity, 0);

    // Helpers
    const updateQuantity = (id: string, delta: number) => {
        setProducts(products.map(p => {
            if (p.id === id) {
                const newQuantity = Math.max(0, Math.min(p.stock, p.quantity + delta));
                return { ...p, quantity: newQuantity };
            }
            return p;
        }));
    };

    // Autocomplete Logic
    const filteredClients = DUMMY_CLIENTS.filter(c => 
        c.name.toLowerCase().includes(clientSearch.toLowerCase()) || 
        c.phone.includes(clientSearch)
    );

    const handleClientSelect = (client: Client) => {
        setSelectedClient(client);
        setClientSearch(client.name);
        setShowSuggestions(false);
    };

    const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClientSearch(e.target.value);
        setSelectedClient(null); // Reset selected client if they start typing again
        setShowSuggestions(true);
    };

    const handleComplete = () => {
        // Submit payload defaults to Unpaid / Pending Payment
        const payload = {
            client: selectedClient ? selectedClient : { id: 'new', name: clientSearch },
            isNewClient: !selectedClient && clientSearch.trim() !== '',
            products: products.filter(p => p.quantity > 0),
            totalAmount,
            notes,
            status: 'Pending Payment'
        };
        
        console.log("Order Created! (Pending Payment)", payload);
        onClose(); // In a real app, this might redirect to the new Payment Module
    };

    const breadcrumbString = `Sales > ${isEdit ? "Edit Sale" : "Create Sale"}`;

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            {/* TOP BAR */}
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm relative z-20">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full touch-manipulation">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">{isEdit ? "Edit Sale Order" : "New Sale Order"}</h1>
                </div>
            </header>

            {/* MAIN SCROLLABLE CONTENT */}
            <main className="flex-1 overflow-y-auto pb-32 w-full max-w-3xl mx-auto relative z-10">
                <div className="p-4 flex flex-col gap-5">
                    
                    {/* 1. AUTOCOMPLETE CLIENT SELECTION */}
                    <div className="relative">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Customer Details</label>
                        <div className={`flex items-center bg-white border ${selectedClient ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-300'} rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-600 shadow-sm transition-all`}>
                            <div className={`px-3 ${selectedClient ? 'text-green-600' : 'text-gray-400'}`}>
                                {selectedClient ? <CheckCircle size={20} strokeWidth={2.5} /> : <Search size={20} />}
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search by name or phone..."
                                value={clientSearch}
                                onChange={handleClientChange}
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay to allow click
                                className="flex-1 w-full py-4 pr-3 bg-transparent border-none outline-none font-bold text-gray-900 text-base placeholder-gray-400"
                            />
                        </div>

                        {/* Suggestions Dropdown */}
                        {showSuggestions && clientSearch.trim() !== '' && (
                            <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-30 overflow-hidden max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2">
                                {filteredClients.length > 0 ? (
                                    filteredClients.map(client => (
                                        <button
                                            key={client.id}
                                            onClick={() => handleClientSelect(client)}
                                            className="w-full text-left p-4 border-b border-gray-100 last:border-none active:bg-blue-50 flex flex-col touch-manipulation"
                                        >
                                            <span className="font-bold text-gray-900 text-base">{client.name}</span>
                                            <span className="text-sm font-bold text-gray-500">{client.phone}</span>
                                        </button>
                                    ))
                                ) : (
                                    <div className="p-3">
                                        <button 
                                            onClick={() => setShowSuggestions(false)}
                                            className="w-full flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg font-bold text-base active:bg-blue-100 touch-manipulation"
                                        >
                                            <PlusCircle size={20} strokeWidth={2.5} />
                                            Add as new client: "{clientSearch}"
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* 2. PRODUCT LIST */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Order Items</label>
                        <div className="flex flex-col gap-3">
                            {products.map(product => (
                                <div key={product.id} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 text-base mb-1">{product.name}</h3>
                                        <p className="text-sm font-bold text-gray-500">
                                            ৳{product.price.toLocaleString()} 
                                            <span className="text-xs text-blue-600 ml-1">(Stock: {product.stock})</span>
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-lg p-1">
                                        <button 
                                            onClick={() => updateQuantity(product.id, -1)}
                                            disabled={product.quantity === 0}
                                            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-md active:bg-gray-100 disabled:opacity-50 touch-manipulation"
                                        >
                                            <Minus size={20} strokeWidth={3} className={product.quantity === 0 ? "text-gray-300" : "text-red-600"} />
                                        </button>
                                        <span className="w-6 text-center font-bold text-lg text-gray-900">{product.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(product.id, 1)}
                                            disabled={product.quantity >= product.stock}
                                            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-md active:bg-gray-100 disabled:opacity-50 touch-manipulation"
                                        >
                                            <Plus size={20} strokeWidth={3} className={product.quantity >= product.stock ? "text-gray-300" : "text-blue-600"} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. ORDER NOTES (OPTIONAL) */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Order Notes (Optional)</label>
                        <div className="flex bg-white border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-600 shadow-sm p-3 gap-2">
                            <StickyNote size={20} className="text-gray-400 shrink-0 mt-0.5" />
                            <textarea 
                                rows={2}
                                placeholder="Delivery instructions, references..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="flex-1 w-full bg-transparent border-none outline-none font-bold text-gray-700 text-base resize-none"
                            />
                        </div>
                    </div>

                </div>
            </main>

            {/* FIXED BOTTOM ACTION BAR */}
            <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">
                <div className="max-w-3xl mx-auto w-full flex flex-col gap-2">
                    
                    {/* Summary Row inside the sticky bar for immediate visibility */}
                    <div className="flex justify-between items-center px-1 mb-1">
                        <span className="text-sm font-bold text-gray-500">Total ({totalItems} items)</span>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">৳{totalAmount.toLocaleString()}</span>
                    </div>

                    <button 
                        onClick={handleComplete} 
                        disabled={totalItems === 0 || clientSearch.trim() === ''} 
                        className="w-full py-4 bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 touch-manipulation shadow-sm transition-colors"
                    >
                        <CheckCircle size={22} strokeWidth={3} /> 
                        Create Order
                    </button>
                </div>
            </div>

            {/* DYNAMIC SEMANTIC BREADCRUMB */}
            <BottomBreadcrumb currentPage={breadcrumbString} />
        </div>
    );
}