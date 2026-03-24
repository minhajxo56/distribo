// resources/js/pages/orders/components/orderForm.tsx
import { useState, useEffect } from 'react';
import { Plus, Minus, CheckCircle, ChevronLeft, ChevronRight, Trash2, AlertCircle, Calculator, Pencil, MoreVertical, Save } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';
import CalculatorUtility from '../../components/calculatorUtility'; 

interface ProductItem {
    id: string;
    name: string;
    price: number | string;
    quantity: number;
    unit: string;
    availableUnits: string[];
    isEditingPrice?: boolean; 
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
    // Navigation & Modal States
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [activeCalcPaymentId, setActiveCalcPaymentId] = useState<number | null>(null);
    const [isTopMenuOpen, setIsTopMenuOpen] = useState(false);
    
    // Step 1: Products
    const [products, setProducts] = useState<ProductItem[]>([
        { 
            id: '1', 
            name: 'Artisan Ceramic Mug', 
            price: 1000, 
            quantity: initialData ? 12 : 1,
            unit: 'Pieces',
            availableUnits: ['Pieces', 'Box of 24', 'Carton (48)'],
            isEditingPrice: false
        },
        { 
            id: '2', 
            name: 'Premium Leather Tote', 
            price: 8500, 
            quantity: initialData ? 2 : 0,
            unit: 'Pieces',
            availableUnits: ['Pieces', 'Bundle of 5'],
            isEditingPrice: false
        },
    ]);

    const totalAmount = products.reduce((sum, item) => sum + ((Number(item.price) || 0) * item.quantity), 0);
    const totalItems = products.reduce((sum, item) => sum + item.quantity, 0);

    // Payments
    const [isFullPaid, setIsFullPaid] = useState(false);
    const [payments, setPayments] = useState<PaymentEntry[]>([
        { id: Date.now(), method: 'bKash', amount: '', reference: '' }
    ]);

    const totalPaid = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const dueAmount = totalAmount - totalPaid;
    const isOverpaid = totalPaid > totalAmount;

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
            setPayments([{ id: Date.now(), method: payments[0]?.method || 'Cash', amount: totalAmount.toString(), reference: '' }]);
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
    const getStepName = () => {
        if (step === 1) return "Items";
        if (step === 2) return "Summary";
        return "Payment";
    };
    const breadcrumbString = `Orders > ${actionName} > ${getStepName()}`;

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            
            {/* TOP BAR */}
            <header className="bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between shrink-0 shadow-sm z-30 relative">
                <h1 className="text-[17px] font-bold text-gray-900 tracking-tight">
                    {actionName}
                </h1>

                {/* Top Right Menu */}
                <div className="relative">
                    <button 
                        onClick={() => setIsTopMenuOpen(!isTopMenuOpen)}
                        className="p-2 -mr-2 text-gray-500 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors touch-manipulation"
                        aria-label="More options"
                    >
                        <MoreVertical size={20} strokeWidth={2.5} />
                    </button>

                    {/* Dropdown Menu */}
                    {isTopMenuOpen && (
                        <>
                            {/* Invisible backdrop */}
                            <div className="fixed inset-0 z-40" onClick={() => setIsTopMenuOpen(false)} />
                            
                            <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-100 rounded-[14px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2">
                                <button 
                                    onClick={() => { 
                                        console.log('Saved as Draft'); 
                                        setIsTopMenuOpen(false); 
                                        onClose(); 
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-[14px] text-gray-700 active:bg-gray-50 text-left font-medium transition-colors border-b border-gray-100"
                                >
                                    <Save size={18} className="text-gray-500" strokeWidth={2} />
                                    Save as Draft
                                </button>
                                
                                <button 
                                    onClick={() => { 
                                        console.log('Order Cancelled'); 
                                        setIsTopMenuOpen(false); 
                                        onClose(); 
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-[14px] text-red-600 active:bg-red-50 text-left font-medium transition-colors"
                                >
                                    <Trash2 size={18} className="text-red-500" strokeWidth={2} />
                                    Cancel Order
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1 overflow-y-auto pb-32 w-full max-w-3xl mx-auto z-10 relative">
                
                {/* STEP 1: ORDER ITEMS */}
                {step === 1 && (
                    <div className="p-4 flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            {products.map(product => (
                                <div key={product.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
                                    
                                    <h3 className="font-semibold text-gray-900 text-[16px] leading-snug">
                                        {product.name}
                                    </h3>
                                    
                                    <div className="flex items-center gap-2">
                                        {product.isEditingPrice ? (
                                            <div className="flex items-center gap-1 bg-gray-50 border border-blue-500 rounded-lg px-2 py-1 h-8">
                                                <span className="text-gray-900 font-bold text-[15px]">৳</span>
                                                <input 
                                                    type="number" 
                                                    inputMode="numeric"
                                                    value={product.price}
                                                    onChange={(e) => updateProduct(product.id, 'price', e.target.value)}
                                                    onBlur={() => updateProduct(product.id, 'isEditingPrice', false)}
                                                    autoFocus
                                                    className="w-16 bg-transparent text-gray-900 font-bold text-[15px] outline-none"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 h-8">
                                                <span className="text-gray-900 font-bold text-[15px] tracking-tight">
                                                    ৳{Number(product.price).toLocaleString()}
                                                </span>
                                                <button 
                                                    onClick={() => updateProduct(product.id, 'isEditingPrice', true)}
                                                    className="text-gray-400 active:text-gray-600 bg-gray-50 hover:bg-gray-100 p-1 rounded-md transition-colors touch-manipulation flex items-center justify-center"
                                                    title="Edit Price"
                                                >
                                                    <Pencil size={12} strokeWidth={2.5} />
                                                </button>
                                            </div>
                                        )}

                                        <span className="text-gray-200 font-light px-0.5">/</span>

                                        <select 
                                            value={product.unit}
                                            onChange={(e) => updateProduct(product.id, 'unit', e.target.value)}
                                            className="bg-white border border-gray-200 text-gray-700 text-[13px] font-medium rounded-lg px-2.5 py-1.5 outline-none focus:ring-1 focus:ring-blue-500 h-8 cursor-pointer shadow-sm"
                                        >
                                            {product.availableUnits.map(u => (
                                                <option key={u} value={u}>{u}</option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <div className="inline-flex items-center border border-gray-200 rounded-lg overflow-hidden h-9 w-fit mt-1 shadow-sm">
                                        <div className="w-12 text-center text-[15px] font-bold text-gray-900 flex items-center justify-center bg-white h-full border-r border-gray-200">
                                            {product.quantity}
                                        </div>
                                        <button 
                                            onClick={() => updateQuantity(product.id, -1)}
                                            className="w-10 h-full flex items-center justify-center bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors border-r border-gray-200 touch-manipulation"
                                        >
                                            <Minus size={16} strokeWidth={2.5} className="text-gray-700" />
                                        </button>
                                        <button 
                                            onClick={() => updateQuantity(product.id, 1)}
                                            className="w-10 h-full flex items-center justify-center bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors touch-manipulation"
                                        >
                                            <Plus size={16} strokeWidth={2.5} className="text-gray-700" />
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* STEP 2: SUMMARY VIEW */}
                {step === 2 && (
                    <div className="p-4 flex flex-col gap-4">
                        {/* Summary Block Moved to Top of Step 2 */}
                        <div className="bg-[#1a1a1a] text-white p-5 rounded-2xl flex justify-between items-center shadow-md">
                            <div>
                                <p className="text-[12px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Total Amount</p>
                                <p className="text-2xl font-bold tracking-tight">৳{totalAmount.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[12px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Items</p>
                                <p className="text-xl font-bold">{totalItems}</p>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                            <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-5">
                                Order Details
                            </h3>
                            
                            <div className="flex flex-col gap-4">
                                {products.filter(p => p.quantity > 0).map(product => (
                                    <div key={product.id} className="flex justify-between items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                        <div className="pr-4">
                                            <p className="font-bold text-gray-900 text-[15px] mb-1">{product.name}</p>
                                            <p className="text-[13px] text-gray-500 font-medium">
                                                {product.quantity} × ৳{Number(product.price).toLocaleString()} / {product.unit}
                                            </p>
                                        </div>
                                        <p className="font-bold text-gray-900 text-[15px] shrink-0">
                                            ৳{(Number(product.price) * product.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 3: ADVANCE PAYMENT / SPLIT PAYMENT */}
                {step === 3 && (
                    <div className="p-4 flex flex-col gap-4">
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

                        {isOverpaid && (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg flex items-center gap-2 animate-in fade-in">
                                <AlertCircle size={18} strokeWidth={2.5} />
                                <span className="text-sm font-bold">Payment exceeds total amount!</span>
                            </div>
                        )}

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

            {/* LIGHT THEME FLOATING ISLAND NAVIGATION (JOINED) */}
            <div className="fixed bottom-16 right-4 flex items-center z-40 touch-manipulation">
                <div className="flex bg-white/95 backdrop-blur-md border border-gray-200 rounded-[14px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden">
                    
                    {/* Navigation Control (Left Edge) */}
                    <button
                        onClick={step === 1 ? onClose : () => setStep((s) => (s - 1) as 1 | 2 | 3)}
                        className="h-[42px] w-[42px] flex items-center justify-center text-slate-700 active:bg-gray-100 transition-colors border-r border-gray-200"
                        aria-label={step === 1 ? "Close" : "Back"}
                    >
                        <ChevronLeft size={20} strokeWidth={2.5} />
                    </button>

                    {/* Main Actions (Right Edge) */}
                    {step === 1 && (
                        <button
                            onClick={() => setStep(2)}
                            disabled={totalItems === 0}
                            className="h-[42px] pl-4 pr-3 flex items-center justify-center gap-1 font-bold text-[14px] text-blue-700 active:bg-gray-100 transition-colors disabled:opacity-40"
                        >
                            Summary
                            <ChevronRight size={18} strokeWidth={2.5} className="text-slate-600" />
                        </button>
                    )}
                    
                    {step === 2 && (
                        <button
                            onClick={() => setStep(3)}
                            className="h-[42px] pl-4 pr-3 flex items-center justify-center gap-1 font-bold text-[14px] text-blue-700 active:bg-gray-100 transition-colors"
                        >
                            Payment
                            <ChevronRight size={18} strokeWidth={2.5} className="text-slate-600" />
                        </button>
                    )}
                    
                    {step === 3 && (
                        <button
                            onClick={handleComplete}
                            disabled={isOverpaid}
                            className={`h-[42px] pl-4 pr-3 flex items-center justify-center gap-1.5 font-bold text-[14px] transition-colors ${
                                isOverpaid ? 'text-gray-400' : 'text-blue-700 active:bg-blue-50'
                            }`}
                        >
                            Complete
                            <CheckCircle size={18} strokeWidth={2.5} className={isOverpaid ? 'text-gray-400' : 'text-blue-600'} />
                        </button>
                    )}
                </div>
            </div>

            {/* DYNAMIC SEMANTIC BREADCRUMB */}
            <div className="z-30 relative bg-white border-t border-gray-200">
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