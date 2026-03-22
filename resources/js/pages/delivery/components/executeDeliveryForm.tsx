// resources/js/pages/delivery/components/executeDeliveryForm.tsx
import { useState } from 'react';
import { ChevronLeft, CheckCircle, AlertCircle, Camera, PenTool, XCircle, Package } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';

interface Stop { id: string; customer: string; status: 'Pending' | 'Delivered' | 'Failed'; }

export default function ExecuteDeliveryForm({ tripData, onClose }: any) {
    const [stops, setStops] = useState<Stop[]>([
        { id: 'SA-5012', customer: 'Hasan Builders', status: 'Pending' },
        { id: 'SA-5013', customer: 'Rahim Store', status: 'Pending' },
    ]);
    const [activeStop, setActiveStop] = useState<string | null>(null);
    const [failReason, setFailReason] = useState('');

    const markStatus = (id: string, status: Stop['status']) => {
        setStops(stops.map(s => s.id === id ? { ...s, status } : s));
        setActiveStop(null); // Collapse panel
        setFailReason(''); // Reset reason
    };

    const isAllDone = stops.every(s => s.status !== 'Pending');

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">Active Trip: {tripData.id}</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-32 w-full max-w-3xl mx-auto p-4 flex flex-col gap-3">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-md shadow-sm mb-2">
                    <p className="text-sm font-bold text-blue-900">Select a stop to capture delivery status.</p>
                </div>

                {stops.map((stop, index) => {
                    const isPending = stop.status === 'Pending';
                    const isDelivered = stop.status === 'Delivered';
                    const isFailed = stop.status === 'Failed';
                    const isExpanded = activeStop === stop.id;

                    return (
                        <div key={stop.id} className={`bg-white border-2 rounded-xl shadow-sm overflow-hidden transition-colors ${
                            isDelivered ? 'border-green-500' : isFailed ? 'border-orange-500' : isExpanded ? 'border-blue-500' : 'border-gray-200'
                        }`}>
                            {/* Stop Header (Always Visible) */}
                            <button 
                                onClick={() => setActiveStop(isExpanded ? null : stop.id)}
                                className={`w-full text-left p-4 flex items-center justify-between touch-manipulation ${!isPending ? 'bg-gray-50' : 'active:bg-gray-50'}`}
                            >
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Stop {index + 1}</p>
                                    <h3 className="font-bold text-gray-900 text-lg">{stop.customer}</h3>
                                    <p className="text-sm font-bold text-gray-500">Order: {stop.id}</p>
                                </div>
                                <div>
                                    {isPending && <span className="text-blue-600 font-bold text-sm bg-blue-100 px-3 py-1 rounded-full">Process</span>}
                                    {isDelivered && <CheckCircle size={28} className="text-green-600" />}
                                    {isFailed && <XCircle size={28} className="text-orange-600" />}
                                </div>
                            </button>

                            {/* Execution Panel (Expanded) */}
                            {isExpanded && isPending && (
                                <div className="p-4 border-t border-gray-100 bg-white flex flex-col gap-4 animate-in fade-in">
                                    
                                    {/* Proof of Delivery (PoD) Options */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Proof of Delivery</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button className="py-3 border border-gray-300 rounded-lg flex items-center justify-center gap-2 text-sm font-bold text-gray-700 active:bg-gray-100">
                                                <Camera size={18}/> Take Photo
                                            </button>
                                            <button className="py-3 border border-gray-300 rounded-lg flex items-center justify-center gap-2 text-sm font-bold text-gray-700 active:bg-gray-100">
                                                <PenTool size={18}/> Get Signature
                                            </button>
                                        </div>
                                    </div>

                                    {/* Success/Fail Actions */}
                                    <div className="flex gap-2">
                                        <button onClick={() => markStatus(stop.id, 'Delivered')} className="flex-[2] py-4 bg-green-600 active:bg-green-700 text-white rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-sm">
                                            <CheckCircle size={20} strokeWidth={3}/> Full Delivery
                                        </button>
                                        <button onClick={() => setFailReason(failReason ? '' : 'prompt')} className="flex-1 py-4 bg-orange-100 active:bg-orange-200 text-orange-700 rounded-xl font-bold text-base flex items-center justify-center gap-2">
                                            <AlertCircle size={20} strokeWidth={3}/> Issue
                                        </button>
                                    </div>

                                    {/* Failure / Return Handling */}
                                    {failReason === 'prompt' && (
                                        <div className="mt-2 p-3 bg-orange-50 rounded-xl border border-orange-200">
                                            <label className="block text-sm font-bold text-orange-900 mb-2">Reason for Return / Failure</label>
                                            <select onChange={(e) => setFailReason(e.target.value)} className="w-full bg-white border border-orange-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 mb-2 outline-none">
                                                <option value="">Select Reason...</option>
                                                <option value="Customer Unavailable">Customer Unavailable</option>
                                                <option value="Damaged Goods">Customer Rejected (Damaged)</option>
                                                <option value="Partial Delivery">Partial Delivery (Keep some, return some)</option>
                                            </select>
                                            {failReason && failReason !== 'prompt' && (
                                                <button onClick={() => markStatus(stop.id, 'Failed')} className="w-full py-3 bg-orange-600 active:bg-orange-700 text-white rounded-lg font-bold text-sm">
                                                    Confirm Issue & Return to Inventory
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </main>

            <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 shadow-sm">
                <div className="max-w-3xl mx-auto w-full">
                    <button 
                        onClick={() => { console.log('Trip Completed'); onClose(); }}
                        disabled={!isAllDone}
                        className="w-full py-4 bg-gray-900 active:bg-black disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <Package size={22} strokeWidth={2.5} /> Finish Trip Route
                    </button>
                </div>
            </div>
            <BottomBreadcrumb currentPage="Delivery > Active Trip" />
        </div>
    );
}