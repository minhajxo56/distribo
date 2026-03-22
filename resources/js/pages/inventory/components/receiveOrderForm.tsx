// resources/js/pages/inventory/components/receiveOrderForm.tsx
import { useState } from 'react';
import { ChevronLeft, CheckCircle, Plus, Minus, AlertCircle, Save, PlusCircle, PackageOpen, Check } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';

interface OrderItem { 
    id: string; 
    name: string; 
    ordered: number; 
    received: string | number; // using string to allow empty input initially
    damaged: number; 
    isExtra?: boolean;
    isBonus?: boolean;
    isReviewed: boolean;
}

// Dummy pending orders list
const PENDING_ORDERS = [
    { id: 'ORD-1042', supplier: 'Premier Cement', date: 'Today', itemsCount: 2 },
    { id: 'ORD-1043', supplier: 'BSRM Steel', date: 'Yesterday', itemsCount: 1 },
];

export default function ReceiveOrderForm({ onClose }: any) {
    // Flow State
    const [step, setStep] = useState<1 | 2>(1);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    
    // Inventory Items State
    const [items, setItems] = useState<OrderItem[]>([]);

    // 1. ORDER SELECTION
    const handleSelectOrder = (order: any) => {
        setSelectedOrder(order);
        // Load dummy items based on order selection. 
        // Notice `received` starts as empty string to force user input.
        setItems([
            { id: '1', name: 'Cement Bag (50kg)', ordered: 100, received: '', damaged: 0, isReviewed: false },
            { id: '2', name: 'White Paint (10L)', ordered: 20, received: '', damaged: 0, isReviewed: false },
        ]);
        setStep(2);
    };

    // 2. ITEM INTERACTIONS
    const updateReceived = (id: string, value: string | number) => {
        setItems(items.map(item => {
            if (item.id === id) {
                const numValue = typeof value === 'string' ? value : Math.max(0, value);
                // Auto-adjust damaged if received drops below current damaged count
                const newDamaged = typeof numValue === 'number' && numValue < item.damaged ? numValue : item.damaged;
                return { ...item, received: numValue, damaged: newDamaged, isReviewed: false }; // Un-review if changed
            }
            return item;
        }));
    };

    const updateDamaged = (id: string, delta: number) => {
        setItems(items.map(item => {
            if (item.id === id) {
                const rec = Number(item.received) || 0;
                const newDamaged = Math.max(0, Math.min(rec, item.damaged + delta)); // Cannot be < 0 or > received
                return { ...item, damaged: newDamaged, isReviewed: false };
            }
            return item;
        }));
    };

    const receiveAll = (id: string) => {
        setItems(items.map(item => 
            item.id === id ? { ...item, received: item.ordered, damaged: 0, isReviewed: true } : item
        ));
    };

    const toggleReviewed = (id: string) => {
        setItems(items.map(item => 
            item.id === id ? { ...item, isReviewed: !item.isReviewed } : item
        ));
    };

    const addExtraItem = () => {
        const newItem: OrderItem = { 
            id: `extra-${Date.now()}`, 
            name: 'New Extra Item', 
            ordered: 0, 
            received: 1, 
            damaged: 0, 
            isExtra: true, 
            isBonus: false,
            isReviewed: false 
        };
        setItems([...items, newItem]);
    };

    // 3. STATUS CALCULATIONS
    const allReviewed = items.every(i => i.isReviewed) && items.length > 0;
    
    const isPartiallyReceived = items.some(i => !i.isExtra && (Number(i.received) || 0) < i.ordered);
    const isOverReceived = items.some(i => !i.isExtra && (Number(i.received) || 0) > i.ordered) || items.some(i => i.isExtra);
    
    const overallStatus = isPartiallyReceived ? 'Partially Received' : isOverReceived ? 'Over Received' : 'Fully Received';

    const handleConfirm = () => {
        if (!allReviewed) return;
        
        // Final payload for Transaction Record
        const payload = {
            orderId: selectedOrder.id,
            status: overallStatus,
            items: items.map(i => ({
                id: i.id,
                name: i.name,
                ordered: i.ordered,
                received: Number(i.received) || 0,
                damaged: i.damaged,
                validStock: (Number(i.received) || 0) - i.damaged,
                isExtra: i.isExtra,
                isBonus: i.isBonus
            }))
        };
        console.log("Receive Confirmed (Ready for Inventory Impact)", payload);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            {/* TOP BAR */}
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm relative z-20">
                <div className="flex items-center gap-2">
                    <button 
                        onClick={step === 2 ? () => setStep(1) : onClose} 
                        className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full"
                    >
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                        {step === 1 ? 'Select Order to Receive' : `Receiving: ${selectedOrder?.id}`}
                    </h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-36 w-full max-w-3xl mx-auto p-4 flex flex-col gap-4">
                
                {/* STEP 1: SELECT ORDER */}
                {step === 1 && (
                    <div className="flex flex-col gap-3">
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider pl-1">Pending Orders</p>
                        {PENDING_ORDERS.map(order => (
                            <button
                                key={order.id}
                                onClick={() => handleSelectOrder(order)}
                                className="w-full bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between active:bg-blue-50 active:border-blue-300 transition-colors touch-manipulation text-left"
                            >
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{order.id}</h3>
                                    <p className="text-sm font-bold text-gray-500">{order.supplier} • {order.itemsCount} Items</p>
                                </div>
                                <PackageOpen size={24} className="text-blue-600" />
                            </button>
                        ))}
                    </div>
                )}

                {/* STEP 2: RECEIVE ITEMS */}
                {step === 2 && (
                    <>
                        <div className={`border-l-4 p-3 rounded-r-md flex items-start gap-2 shadow-sm ${
                            overallStatus === 'Partially Received' ? 'bg-orange-50 border-orange-500 text-orange-900' :
                            overallStatus === 'Over Received' ? 'bg-blue-50 border-blue-500 text-blue-900' :
                            'bg-green-50 border-green-500 text-green-900'
                        }`}>
                            <AlertCircle size={18} className="shrink-0 mt-0.5" />
                            <p className="text-sm font-bold">Status: {overallStatus}</p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {items.map((item, index) => {
                                const recNum = Number(item.received) || 0;
                                const validStock = recNum - item.damaged;
                                const missing = !item.isExtra && recNum < item.ordered ? item.ordered - recNum : 0;
                                
                                return (
                                    <div key={item.id} className={`bg-white border-2 rounded-xl overflow-hidden shadow-sm transition-colors ${
                                        item.isReviewed ? 'border-green-500' : item.isExtra ? 'border-indigo-300' : 'border-gray-200'
                                    }`}>
                                        
                                        {/* Header */}
                                        <div className={`px-4 py-3 border-b flex justify-between items-start ${item.isReviewed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                                                    Item {index + 1} {item.isExtra && '(Extra)'}
                                                </p>
                                                <h3 className="font-bold text-gray-900 text-lg leading-tight">{item.name}</h3>
                                            </div>
                                            {!item.isExtra && (
                                                <div className="bg-gray-200 px-3 py-1 rounded-lg text-center">
                                                    <p className="text-[10px] font-bold text-gray-500 uppercase">Ordered</p>
                                                    <p className="text-lg font-black text-gray-900 leading-none">{item.ordered}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-4 flex flex-col gap-4">
                                            {/* Received Input Row */}
                                            <div>
                                                <div className="flex justify-between items-end mb-2">
                                                    <label className="block text-sm font-bold text-gray-700">Received Quantity</label>
                                                    {!item.isExtra && (
                                                        <button 
                                                            onClick={() => receiveAll(item.id)}
                                                            className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md active:bg-blue-200 touch-manipulation"
                                                        >
                                                            Receive All
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => updateReceived(item.id, recNum - 1)} disabled={recNum === 0} className="w-14 h-12 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg active:bg-gray-200 disabled:opacity-50 touch-manipulation">
                                                        <Minus size={20} strokeWidth={3} />
                                                    </button>
                                                    <input 
                                                        type="text" 
                                                        inputMode="numeric"
                                                        placeholder="0"
                                                        value={item.received}
                                                        onChange={(e) => updateReceived(item.id, e.target.value.replace(/\D/g, ''))}
                                                        className="flex-1 h-12 text-center bg-white border border-gray-300 text-gray-900 text-xl font-black rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                                                    />
                                                    <button onClick={() => updateReceived(item.id, recNum + 1)} className="w-14 h-12 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg active:bg-gray-200 touch-manipulation">
                                                        <Plus size={20} strokeWidth={3} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Damaged Input Row */}
                                            <div className="pt-3 border-t border-gray-100">
                                                <label className="block text-sm font-bold text-red-600 mb-2">Damaged / Rejected Quantity</label>
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => updateDamaged(item.id, -1)} disabled={item.damaged === 0} className="w-14 h-12 flex items-center justify-center bg-red-50 border border-red-200 text-red-600 rounded-lg active:bg-red-100 disabled:opacity-50 touch-manipulation">
                                                        <Minus size={20} strokeWidth={3} />
                                                    </button>
                                                    <div className="flex-1 h-12 flex items-center justify-center bg-red-50 border border-red-200 text-red-700 text-xl font-black rounded-lg">
                                                        {item.damaged}
                                                    </div>
                                                    <button onClick={() => updateDamaged(item.id, 1)} disabled={item.damaged >= recNum} className="w-14 h-12 flex items-center justify-center bg-red-50 border border-red-200 text-red-600 rounded-lg active:bg-red-100 disabled:opacity-50 touch-manipulation">
                                                        <Plus size={20} strokeWidth={3} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Auto Calculations Output */}
                                            <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center border border-gray-200">
                                                <div>
                                                    <p className="text-xs font-bold text-gray-500 uppercase">Valid Stock Added</p>
                                                    <p className="text-lg font-black text-green-600">+{validStock}</p>
                                                </div>
                                                {missing > 0 && (
                                                    <div className="text-right">
                                                        <p className="text-xs font-bold text-gray-500 uppercase">Missing</p>
                                                        <p className="text-lg font-black text-orange-600">{missing}</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Review Confirmation Button */}
                                            <button 
                                                onClick={() => toggleReviewed(item.id)}
                                                className={`w-full py-3.5 mt-1 rounded-lg font-bold text-base flex items-center justify-center gap-2 touch-manipulation transition-colors border-2 ${
                                                    item.isReviewed 
                                                        ? 'bg-green-50 border-green-500 text-green-700' 
                                                        : 'bg-white border-gray-300 text-gray-700 active:bg-gray-100'
                                                }`}
                                            >
                                                {item.isReviewed ? <><CheckCircle size={20} /> Reviewed</> : 'Mark as Reviewed'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <button onClick={addExtraItem} className="w-full py-4 mt-2 border-2 border-dashed border-indigo-300 text-indigo-700 bg-indigo-50/50 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:bg-indigo-100 touch-manipulation">
                            <PlusCircle size={20} strokeWidth={2.5} />
                            Add Extra / Bonus Item
                        </button>
                    </>
                )}
            </main>

            {/* FIXED BOTTOM ACTION BAR */}
            {step === 2 && (
                <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">
                    <div className="max-w-3xl mx-auto w-full flex gap-3">
                        <button 
                            onClick={() => console.log('Draft Saved', items)} 
                            className="flex-1 py-4 bg-gray-100 border border-gray-300 active:bg-gray-200 text-gray-800 rounded-xl font-bold text-base flex items-center justify-center gap-2 touch-manipulation"
                        >
                            <Save size={20} /> Save Draft
                        </button>
                        
                        <button 
                            onClick={handleConfirm}
                            disabled={!allReviewed}
                            className={`flex-[2] py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 touch-manipulation shadow-sm transition-colors ${
                                allReviewed ? 'bg-blue-600 active:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500'
                            }`}
                        >
                            {allReviewed ? <Check size={22} strokeWidth={3} /> : <AlertCircle size={22} strokeWidth={3} />}
                            {allReviewed ? 'Confirm Receive' : 'Review All Items'}
                        </button>
                    </div>
                </div>
            )}

            <BottomBreadcrumb currentPage={`Inventory > Receive Order ${step === 2 ? '> Process Items' : ''}`} />
        </div>
    );
}