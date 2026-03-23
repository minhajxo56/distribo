// resources/js/pages/premium/index.tsx
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { ShieldCheck, ArrowUpCircle, CheckCircle, Clock, FileText } from 'lucide-react';

import TopIndexBar from '../components/topIndexBar';
import BottomBreadcrumb from '../components/bottomBreadcrumb';
import SubscriptionFlow from './components/subscriptionFlow';

export default function PremiumIndex() {
    // Simulated DB State
    const [currentPlan, setCurrentPlan] = useState<'Free' | 'Pro'>('Pro'); // Toggle this to 'Free' to test the other view
    const [expiryDate, setExpiryDate] = useState('Oct 23, 2026');
    const [status, setStatus] = useState<'Active' | 'Expired'>('Active');
    
    const [showSubFlow, setShowSubFlow] = useState(false);

    // Dummy Billing History
    const billingHistory = [
        { id: 'SUB-992', date: '23 Mar 2026', plan: 'Pro - 6 Months', amount: 1314, method: 'bKash' },
        { id: 'SUB-910', date: '23 Sep 2025', plan: 'Pro - 6 Months', amount: 1314, method: 'Nagad' },
        { id: 'SUB-801', date: '23 Aug 2025', plan: 'Pro - 1 Month', amount: 249, method: 'Bank' },
    ];

    const isPro = currentPlan === 'Pro' && status === 'Active';

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
            <Head title="Premium Subscription - Distribo" />

            <TopIndexBar 
                title="Subscription Plan" 
                actionLabel="" 
                onActionClick={() => {}} 
                isFilterActive={false}
            />

            <main className="flex-1 w-full max-w-3xl mx-auto flex flex-col gap-4 p-4 pb-32">
                
                {/* 1. CURRENT STATUS CARD */}
                <div className={`border-2 rounded-2xl p-5 shadow-sm flex flex-col gap-4 transition-colors ${
                    isPro ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-200'
                }`}>
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-full ${isPro ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`}>
                                <ShieldCheck size={32} strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${isPro ? 'text-blue-100' : 'text-gray-500'}`}>
                                    Current Plan
                                </p>
                                <h2 className={`text-2xl font-black leading-none ${isPro ? 'text-white' : 'text-gray-900'}`}>
                                    Distribo {currentPlan}
                                </h2>
                            </div>
                        </div>
                        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border ${
                            isPro ? 'bg-green-500 border-green-400 text-white' : 'bg-gray-100 border-gray-200 text-gray-600'
                        }`}>
                            {status}
                        </span>
                    </div>

                    {isPro ? (
                        <div className="bg-white/10 p-3 rounded-xl border border-white/20 flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                                <Clock size={18} className="text-blue-200" />
                                <span className="font-bold text-blue-100 text-sm">Valid Until:</span>
                            </div>
                            <span className="font-black text-white text-lg">{expiryDate}</span>
                        </div>
                    ) : (
                        <p className="text-sm font-bold text-gray-500 mt-2">
                            You are currently on the free limited plan. Upgrade to unlock all features.
                        </p>
                    )}
                </div>

                {/* 2. PLAN FEATURES COMPARISON (Only show clearly if not Pro to drive upgrades) */}
                {!isPro && (
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Why Upgrade?</h3>
                        <div className="flex flex-col gap-2">
                            {['Unlimited Sales Orders & Invoices', 'Advanced Analytics & Reports', 'Multi-User & Employee Payroll', 'Priority Customer Support'].map((feat, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <CheckCircle size={18} className="text-green-600 shrink-0" strokeWidth={3} />
                                    <span className="text-sm font-bold text-gray-700">{feat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 3. BILLING HISTORY */}
                <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 pl-1">Billing History</h3>
                    <div className="flex flex-col gap-3">
                        {billingHistory.length > 0 ? billingHistory.map(bill => (
                            <div key={bill.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
                                <div className="flex items-start gap-3">
                                    <div className="bg-gray-100 p-2 rounded-lg text-gray-600 shrink-0">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-base leading-none mb-1">{bill.plan}</h4>
                                        <p className="text-xs font-bold text-gray-500">{bill.date} • {bill.method}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-gray-900 text-lg">৳{bill.amount}</p>
                                    <p className="text-[10px] font-bold text-green-600 uppercase">Paid</p>
                                </div>
                            </div>
                        )) : (
                            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
                                <p className="text-sm font-bold text-gray-500">No payment history found.</p>
                            </div>
                        )}
                    </div>
                </div>

            </main>

            {/* EXTENDED FAB: Action-First */}
            {!showSubFlow && (
                <button
                    onClick={() => setShowSubFlow(true)}
                    className={`fixed bottom-20 right-4 text-white px-5 py-3.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.25)] z-30 touch-manipulation transition-transform active:scale-95 flex items-center gap-2 font-bold text-base ${
                        isPro ? 'bg-gray-900 active:bg-black' : 'bg-blue-600 active:bg-blue-700'
                    }`}
                >
                    <ArrowUpCircle size={22} strokeWidth={3} />
                    {isPro ? 'Renew Subscription' : 'Upgrade to Pro'}
                </button>
            )}

            <BottomBreadcrumb currentPage="Premium Subscription" />

            {/* FULL SCREEN MODAL */}
            {showSubFlow && (
                <SubscriptionFlow 
                    currentPlan={currentPlan} 
                    onClose={() => setShowSubFlow(false)} 
                />
            )}
        </div>
    );
}