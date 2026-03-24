// resources/js/pages/orders/components/orderForm.tsx
import { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Minus, CheckCircle, ArrowRight, Trash2, AlertCircle, Calculator, Settings2 } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';
import CalculatorUtility from '../../components/calculatorUtility';

interface ProductItem {
    id: string;
    name: string;
    price: number | string; // string allowed for empty input while typing
    quantity: number;
    unit: string;
    availableUnits: string[];
    isCustomizing?: boolean; // UI state for the secondary options
}

interface PaymentEntry {
    id: number;
    method: string;
    amount: string;
    reference: string;
}

interface OrderFormProps {
    isEdit?: boolean;
    initialData?: any;
    onClose: () => void;
}

const PAYMENT_METHODS = ['Bank', 'bKash', 'Nagad', 'Cash'];

export default function OrderForm({ isEdit = false, initialData, onClose }: OrderFormProps) {
    // Navigation State
    const [step, setStep] = useState<1 | 2>(1);
    
    // Calculator State
    const [activeCalcPaymentId, setActiveCalcPaymentId] = useState<number | null>(null);
    
    // Step 1: Products (Updated with Unit and Customizing state)
    const [products, setProducts] = useState<ProductItem[]>([
        { 
            id: '1', 
            name: 'Artisan Ceramic Mug', 
            price: 520, 
            quantity: initialData ? 12 : 0,
            unit: 'Pieces',
            availableUnits: ['Pieces', '1 Box of 24 pieces', '1 Carton (48 pieces)'],
            isCustomizing: false
        },
        { 
            id: '2', 
            name: 'Premium Leather Tote', 
            price: 8500, 
            quantity: initialData ? 2 : 0,
            unit: 'Pieces',
            availableUnits: ['Pieces', 'Bundle of 5'],
            isCustomizing: false
        },
    ]);

    // Calculate totals factoring in potentially edited prices
    const totalAmount = products.reduce((sum, item) => sum + ((Number(item.price) || 0) * item.quantity), 0);
    const totalItems = products.reduce((sum, item) => sum + item.quantity, 0);

    // Step 2: Payments
    const [isFullPaid, setIsFullPaid] = useState(false);
    const [payments, setPayments] = useState<PaymentEntry[]>([
        { id: Date.now(), method: 'bKash', amount: '', reference: '' }
    ]);

    // Derived Payment State
    const totalPaid = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const dueAmount = totalAmount - totalPaid;
    const isOverpaid = totalPaid > totalAmount;

    // Auto-sync "Full Paid" toggle if manual entries equal total
    useEffect(() => {
        if (totalPaid === totalAmount && totalAmount > 0) {
            setIsFullPaid(true);
        } else if (totalPaid !== totalAmount) {
            setIsFullPaid(false);
        }
    }, [totalPaid, totalAmount]);

    // Helpers
    const updateQuantity = (id: string, delta: number) => {
        setProducts(products.map(p => {
            if (p.id === id) {
                return { ...p, quantity: Math.max(0, p.quantity + delta) };
            }
            return p;
        }));
    };

    const updateProduct = (id: string, field: keyof ProductItem, value: any) => {
        setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const handleFullPaidToggle = () => {
        if (!isFullPaid) {
            setPayments([{ 
                id: Date.now(), 
                method: payments[0]?.method || 'Cash', 
                amount: totalAmount.toString(), 
                reference: '' 
            }]);
            setIsFullPaid(true);
        } else {
            setPayments([{ id: Date.now(), method: 'Cash', amount: '', reference: '' }]);
            setIsFullPaid(false);
        }
    };

    const updatePayment = (id: number, field: keyof PaymentEntry, value: string) => {
        setPayments(payments.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const addSplitPayment = () => {
        if (dueAmount > 0) {
            setPayments([...payments, { id: Date.now(), method: 'Cash', amount: dueAmount.toString(), reference: '' }]);
        } else {
            setPayments([...payments, { id: Date.now(), method: 'Cash', amount: '', reference: '' }]);
        }
    };

    const removePayment = (id: number) => {
        setPayments(payments.filter(p => p.id !== id));
    };

    const handleComplete = () => {
        if (isOverpaid) return; 
        console.log("Order Saved!", { products, payments, totalAmount, totalPaid, dueAmount });
        onClose();
    };

    const actionName = isEdit ? "Edit Order" : "Create Order";
    const breadcrumbString = `Orders > ${actionName} > ${step === 1 ? "Items" : "Payment"}`;

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            
            {/* TOP BAR */}
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <button 
                        onClick={step === 2 ? () => setStep(1) : onClose}
                        className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full touch-manipulation"
                    >
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                        {actionName}
                    </h1>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1 overflow-y-auto pb-32 w-full max-w-3xl mx-auto z-10">
                
                {/* STEP 1: ORDER ITEMS */}
                {step === 1 && (
                    <div className="p-4 flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            {products.map(product => (
                                <div key={product.id} className="bg-[#121212] border-b border-[#2a2a2a] p-5 pb-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 pr-4">
                                            <h3 className="font-medium text-white text-[15px] mb-1 leading-snug">{product.name}</h3>
                                            
                                            {/* Primary Info */}
                                            <div className="flex items-center gap-1.5 mb-3">
                                                <span className="text-[14px] text-gray-300 font-bold">৳{Number(product.price).toLocaleString()}</span>
                                                <span className="text-[13px] text-[#9aa0a6]">/ {product.unit}</span>
                                            </div>
                                            
                                            {/* Secondary Option Toggle */}
                                            <button 
                                                onClick={() => updateProduct(product.id, 'isCustomizing', !product.isCustomizing)}
                                                className="text-[12px] text-blue-400 active:text-blue-300 font-medium flex items-center gap-1.5 transition-colors touch-manipulation w-fit"
                                            >
                                                <Settings2 size={12} />
                                                {product.isCustomizing ? 'Hide Options' : 'Edit Unit & Price'}
                                            </button>
                                            
                                            {/* Secondary Settings (Expandable) */}
                                            {product.isCustomizing && (
                                                <div className="mt-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-1 duration-200 bg-[#1a1a1a] p-3.5 rounded-xl border border-[#3c4043]">
                                                    {/* Unit Dropdown */}
                                                    <div>
                                                        <label className="block text-[10px] uppercase tracking-wider text-[#9aa0a6] mb-1.5 font-bold">Unit Type</label>
                                                        <select 
                                                            value={product.unit}
                                                            onChange={(e) => updateProduct(product.id, 'unit', e.target.value)}
                                                            className="w-full bg-[#202124] border border-[#3c4043] text-white text-sm rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 transition-colors"
                                                        >
                                                            {product.availableUnits.map(u => (
                                                                <option key={u} value={u}>{u}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    
                                                    {/* Price Override */}
                                                    <div>
                                                        <label className="block text-[10px] uppercase tracking-wider text-[#9aa0a6] mb-1.5 font-bold">Custom Selling Price (৳)</label>
                                                        <input 
                                                            type="number" 
                                                            inputMode="numeric"
                                                            value={product.price}
                                                            onChange={(e) => updateProduct(product.id, 'price', e.target.value)}
                                                            className="w-full bg-[#202124] border border-[#3c4043] text-white text-sm rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 transition-colors"
                                                            placeholder="Enter price"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Quantity Selector */}
                                        <div className="flex items-center border border-[#3c4043] rounded-lg overflow-hidden h-9 mt-0.5 shrink-0">
                                            <div className="px-3 min-w-[40px] text-center text-[15px] font-medium text-white flex items-center justify-center">
                                                {product.quantity}
                                            </div>
                                            <div className="flex border-l border-[#3c4043]">
                                                <button 
                                                    onClick={() => updateQuantity(product.id, -1)}
                                                    className="w-9 h-full flex items-center justify-center bg-transparent active:bg-[#202124] transition-colors border-r border-[#3c4043] touch-manipulation"
                                                >
                                                    <Minus size={16} strokeWidth={2} className="text-white" />
                                                </button>
                                                <button 
                                                    onClick={() => updateQuantity(product.id, 1)}
                                                    className="w-9 h-full flex items-center justify-center bg-transparent active:bg-[#202124] transition-colors touch-manipulation"
                                                >
                                                    <Plus size={16} strokeWidth={2} className="text-white" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Totals Summary Card */}
                        <div className="bg-gray-900 text-white p-4 rounded-xl mt-2 flex justify-between items-center shadow-md">
                            <div>
                                <p className="text-sm text-gray-300 font-bold mb-0.5">Total Amount</p>
                                <p className="text-2xl font-bold tracking-tight">৳{totalAmount.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-300 font-bold mb-0.5">Items</p>
                                <p className="text-xl font-bold">{totalItems}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 2: ADVANCE PAYMENT / SPLIT PAYMENT */}
                {step === 2 && (
                    <div className="p-4 flex flex-col gap-4">
                        {/* Summary Dashboard */}
                        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Payable</p>
                                <p className="text-xl font-bold text-gray-900">৳{totalAmount.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Due Balance</p>
                                <p className={`text-xl font-bold ${dueAmount === 0 ? 'text-green-600' : dueAmount < 0 ? 'text-red-600' : 'text-orange-600'}`}>
                                    ৳{Math.abs(dueAmount).toLocaleString()} {dueAmount < 0 && '(Overpaid)'}
                                </p>
                            </div>
                        </div>

                        {/* Full Paid Quick Toggle */}
                        <button
                            onClick={handleFullPaidToggle}
                            className={`w-full py-4 rounded-xl font-bold text-lg border-2 transition-colors touch-manipulation flex items-center justify-center gap-2 shadow-sm ${
                                isFullPaid 
                                    ? 'bg-green-50 border-green-600 text-green-700' 
                                    : 'bg-white border-gray-300 text-gray-700 active:bg-gray-100'
                            }`}
                        >
                            <CheckCircle size={22} className={isFullPaid ? "text-green-600" : "text-gray-400"} />
                            Mark as Full Paid
                        </button>

                        {/* Error Feedback */}
                        {isOverpaid && (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg flex items-center gap-2 animate-in fade-in">
                                <AlertCircle size={18} strokeWidth={2.5} />
                                <span className="text-sm font-bold">Payment exceeds total amount!</span>
                            </div>
                        )}

                        {/* Payment Cards List */}
                        <div className="flex flex-col gap-3 mt-2">
                            {payments.map((payment, index) => (
                                <div key={payment.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm relative">
                                    {payments.length > 1 && (
                                        <button 
                                            onClick={() => removePayment(payment.id)}
                                            className="absolute top-3 right-3 p-2 bg-red-50 text-red-600 rounded-lg active:bg-red-100 touch-manipulation"
                                        >
                                            <Trash2 size={16} strokeWidth={2.5} />
                                        </button>
                                    )}
                                    
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Payment {index + 1}</p>
                                    
                                    <div className="flex gap-3 mb-3">
                                        <div className="flex-1">
                                            <label className="block text-xs font-bold text-gray-700 mb-1">Method</label>
                                            <select 
                                                value={payment.method}
                                                onChange={(e) => updatePayment(payment.id, 'method', e.target.value)}
                                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                                            >
                                                {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                                            </select>
                                        </div>
                                        <div className="flex-[1.5]">
                                            <label className="block text-xs font-bold text-gray-700 mb-1">Amount (৳)</label>
                                            <div className="relative flex items-center">
                                                <input 
                                                    type="text" 
                                                    inputMode="numeric"
                                                    placeholder="0"
                                                    value={payment.amount}
                                                    onChange={(e) => updatePayment(payment.id, 'amount', e.target.value.replace(/\D/g, ''))}
                                                    className={`w-full bg-gray-50 border ${isOverpaid ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-lg font-bold rounded-lg pl-3 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-blue-600`}
                                                />
                                                <button
                                                    onClick={() => setActiveCalcPaymentId(payment.id)}
                                                    className="absolute right-2 p-1.5 text-gray-400 active:text-blue-600 active:bg-blue-50 rounded-md transition-colors touch-manipulation"
                                                    title="Open Calculator"
                                                >
                                                    <Calculator size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {payment.method !== 'Cash' && (
                                        <div>
                                            <input 
                                                type="text" 
                                                placeholder="Ref / Trx ID (Optional)"
                                                value={payment.reference}
                                                onChange={(e) => updatePayment(payment.id, 'reference', e.target.value)}
                                                className="w-full bg-gray-50 border border-gray-300 text-gray-700 text-sm font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Add Split Payment Button */}
                        {!isFullPaid && !isOverpaid && dueAmount > 0 && (
                            <button
                                onClick={addSplitPayment}
                                className="w-full py-3.5 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:bg-gray-100 touch-manipulation"
                            >
                                <Plus size={18} strokeWidth={3} />
                                Add Split Payment
                            </button>
                        )}
                    </div>
                )}
            </main>

            {/* FIXED BOTTOM ACTION BAR */}
            <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-gray-200 z-30">
                <div className="max-w-3xl mx-auto w-full">
                    {step === 1 ? (
                        <button
                            onClick={() => setStep(2)}
                            disabled={totalItems === 0}
                            className="w-full py-4 bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 touch-manipulation shadow-md transition-colors"
                        >
                            Next: Payment <ArrowRight size={20} strokeWidth={3} />
                        </button>
                    ) : (
                        <button
                            onClick={handleComplete}
                            disabled={isOverpaid}
                            className={`w-full py-4 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 touch-manipulation shadow-md transition-colors ${
                                isOverpaid ? 'bg-gray-400' : 'bg-green-600 active:bg-green-700'
                            }`}
                        >
                            <CheckCircle size={22} strokeWidth={3} />
                            Complete Order
                        </button>
                    )}
                </div>
            </div>

            {/* DYNAMIC SEMANTIC BREADCRUMB */}
            <div className="z-30 relative">
                <BottomBreadcrumb currentPage={breadcrumbString} />
            </div>

            {/* CALCULATOR UTILITY OVERLAY */}
            {activeCalcPaymentId !== null && (
                <CalculatorUtility 
                    onClose={() => setActiveCalcPaymentId(null)}
                    onUseResult={(result) => {
                        const roundedResult = Math.round(Number(result)).toString();
                        updatePayment(activeCalcPaymentId, 'amount', roundedResult);
                        setActiveCalcPaymentId(null);
                    }}
                />
            )}
        </div>
    );
}