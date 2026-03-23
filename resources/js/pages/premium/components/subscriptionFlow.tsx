// resources/js/pages/premium/components/subscriptionFlow.tsx
import { useState } from 'react';
import { ChevronLeft, CheckCircle, ArrowRight, ShieldCheck, CreditCard, Copy } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';

const PRICING_PLANS = [
    { id: '1_month', title: '1 Month', pricePerMonth: 249, total: 249, save: 0 },
    { id: '6_months', title: '6 Months', pricePerMonth: 219, total: 1314, save: 180 },
    { id: '1_year', title: '1 Year (Best Value)', pricePerMonth: 199, total: 2388, save: 600 },
];

export default function SubscriptionFlow({ currentPlan, onClose }: any) {
    const [step, setStep] = useState<1 | 2>(1);
    const [selectedPlanId, setSelectedPlanId] = useState(currentPlan === 'Free' ? '1_year' : '1_month');
    
    // Payment States
    const [paymentMethod, setPaymentMethod] = useState('bKash');
    const [trxId, setTrxId] = useState('');

    const selectedPlan = PRICING_PLANS.find(p => p.id === selectedPlanId);

    const handleCopyNumber = () => {
        // Simulated copy to clipboard
        console.log("Copied 01700112233 to clipboard");
        alert("Number copied!"); // In production, use a toast
    };

    const handleConfirm = () => {
        console.log("Subscription Payment Recorded", { plan: selectedPlan, paymentMethod, trxId });
        onClose();
    };

    const isValidPayment = trxId.trim().length > 5;

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <button onClick={step === 2 ? () => setStep(1) : onClose} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full touch-manipulation">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                        {step === 1 ? 'Upgrade to Pro' : 'Make Payment'}
                    </h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-32 w-full max-w-3xl mx-auto p-4 flex flex-col gap-4">
                
                {/* STEP 1: CHOOSE PLAN */}
                {step === 1 && (
                    <>
                        <div className="flex flex-col items-center justify-center py-4 text-center gap-2">
                            <div className="p-4 rounded-full bg-blue-100 text-blue-600 mb-2">
                                <ShieldCheck size={40} strokeWidth={2.5} />
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 leading-tight">Unlock Pro Features</h2>
                            <p className="text-sm font-bold text-gray-500 px-4">Get unlimited sales orders, advanced reports, and priority support.</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            {PRICING_PLANS.map((plan) => {
                                const isSelected = selectedPlanId === plan.id;
                                return (
                                    <button
                                        key={plan.id}
                                        onClick={() => setSelectedPlanId(plan.id)}
                                        className={`w-full text-left p-4 rounded-xl border-2 transition-colors touch-manipulation relative shadow-sm flex flex-col gap-2 ${
                                            isSelected ? 'bg-blue-50 border-blue-600' : 'bg-white border-gray-200 active:bg-gray-50'
                                        }`}
                                    >
                                        {plan.save > 0 && (
                                            <span className="absolute top-0 right-0 bg-orange-100 text-orange-700 text-[10px] font-black uppercase px-2 py-1 rounded-bl-lg rounded-tr-lg border-b border-l border-orange-200">
                                                Save ৳{plan.save}
                                            </span>
                                        )}
                                        
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-blue-600' : 'border-gray-300'}`}>
                                                    {isSelected && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>}
                                                </div>
                                                <h3 className="font-bold text-gray-900 text-lg">{plan.title}</h3>
                                            </div>
                                            <span className="font-black text-gray-900 text-xl">৳{plan.total}</span>
                                        </div>
                                        
                                        <p className="text-sm font-bold text-gray-500 pl-7">
                                            ৳{plan.pricePerMonth} / month
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </>
                )}

                {/* STEP 2: PAYMENT RECORDING */}
                {step === 2 && selectedPlan && (
                    <>
                        {/* Order Summary */}
                        <div className="bg-gray-900 text-white rounded-xl p-4 shadow-sm flex justify-between items-center">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Total Payable</p>
                                <h2 className="text-2xl font-black">৳{selectedPlan.total}</h2>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Plan</p>
                                <p className="text-lg font-bold">Pro - {selectedPlan.title}</p>
                            </div>
                        </div>

                        {/* Payment Instructions */}
                        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-4">
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider border-b border-gray-100 pb-2">1. Send Money</h3>
                            
                            <div className="flex gap-2">
                                {['bKash', 'Nagad', 'Rocket'].map(method => (
                                    <button 
                                        key={method} 
                                        onClick={() => setPaymentMethod(method)} 
                                        className={`flex-1 py-3 text-sm font-bold rounded-lg border-2 transition-colors touch-manipulation ${paymentMethod === method ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-white border-gray-200 text-gray-600 active:bg-gray-50'}`}
                                    >
                                        {method}
                                    </button>
                                ))}
                            </div>

                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase">Merchant Number</p>
                                    <p className="text-xl font-black text-gray-900 tracking-wider">01700 11 22 33</p>
                                </div>
                                <button onClick={handleCopyNumber} className="p-3 bg-white border border-gray-300 rounded-lg text-gray-700 active:bg-gray-100 touch-manipulation">
                                    <Copy size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Payment Verification */}
                        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider border-b border-gray-100 pb-2">2. Verify Payment</h3>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><CreditCard size={16}/> Transaction ID (TrxID) *</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. 8A7B6C5D4E" 
                                    value={trxId} 
                                    onChange={e => setTrxId(e.target.value.toUpperCase())} 
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-lg font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600 uppercase" 
                                />
                            </div>
                        </div>
                    </>
                )}
            </main>

            {/* FIXED BOTTOM ACTION BAR */}
            <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 shadow-sm">
                <div className="max-w-3xl mx-auto w-full">
                    {step === 1 ? (
                        <button onClick={() => setStep(2)} className="w-full py-4 bg-blue-600 active:bg-blue-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 touch-manipulation shadow-sm transition-colors">
                            Next: Make Payment <ArrowRight size={22} strokeWidth={3} />
                        </button>
                    ) : (
                        <button onClick={handleConfirm} disabled={!isValidPayment} className="w-full py-4 bg-green-600 active:bg-green-700 disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 touch-manipulation shadow-sm transition-colors">
                            <CheckCircle size={22} strokeWidth={3} /> Confirm Subscription
                        </button>
                    )}
                </div>
            </div>

            <BottomBreadcrumb currentPage={`Premium > ${step === 1 ? 'Select Plan' : 'Payment'}`} />
        </div>
    );
}