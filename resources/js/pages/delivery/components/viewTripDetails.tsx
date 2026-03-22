// resources/js/pages/delivery/components/viewTripDetails.tsx
import { ChevronLeft, Truck, User, MapPin, CheckCircle, XCircle, Clock, StickyNote } from 'lucide-react';

interface StopDetails { id: string; customer: string; address: string; status: 'Pending' | 'Delivered' | 'Failed'; reason?: string; }

export default function ViewTripDetails({ tripData, onClose }: any) {
    // Dummy detail data based on the passed tripData
    const stops: StopDetails[] = [
        { id: 'SA-5012', customer: 'Hasan Builders', address: 'Mirpur 10, Block C', status: 'Delivered' },
        { id: 'SA-5013', customer: 'Rahim Store', address: 'Dhanmondi 27', status: 'Failed', reason: 'Customer Unavailable' },
        { id: 'SA-5014', customer: 'Al-Amin Traders', address: 'Mirpur 1', status: 'Pending' },
    ];

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full touch-manipulation">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">Trip Summary</h1>
                </div>
                <div className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                    tripData?.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                    tripData?.status === 'In Transit' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                }`}>
                    {tripData?.status || 'Unknown'}
                </div>
            </header>

            <main className="flex-1 overflow-y-auto w-full max-w-3xl mx-auto p-4 flex flex-col gap-4">
                
                {/* Driver & Vehicle Info */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <div className="bg-blue-50 text-blue-600 p-2 rounded-lg shrink-0"><User size={20} /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Driver</p>
                            <p className="font-bold text-gray-900 text-base leading-tight">{tripData?.driver || 'Unassigned'}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 border-l border-gray-100 pl-4">
                        <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg shrink-0"><Truck size={20} /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Vehicle</p>
                            <p className="font-bold text-gray-900 text-base leading-tight">{tripData?.vehicle || 'Unassigned'}</p>
                        </div>
                    </div>
                </div>

                {/* Stops Timeline */}
                <div>
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 pl-1">Route & Stops</h2>
                    <div className="flex flex-col gap-3">
                        {stops.map((stop, index) => {
                            const isDelivered = stop.status === 'Delivered';
                            const isFailed = stop.status === 'Failed';
                            const isPending = stop.status === 'Pending';

                            return (
                                <div key={stop.id} className={`bg-white border rounded-xl p-4 shadow-sm flex items-start gap-3 ${
                                    isDelivered ? 'border-green-300' : isFailed ? 'border-orange-300' : 'border-gray-200'
                                }`}>
                                    <div className="mt-1">
                                        {isDelivered && <CheckCircle size={24} className="text-green-600" />}
                                        {isFailed && <XCircle size={24} className="text-orange-500" />}
                                        {isPending && <Clock size={24} className="text-gray-400" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Stop {index + 1}</p>
                                        <h3 className="font-bold text-gray-900 text-base">{stop.customer}</h3>
                                        <div className="flex items-center gap-1 text-sm font-bold text-gray-500 mt-1">
                                            <MapPin size={14} /> {stop.address}
                                        </div>
                                        
                                        {isFailed && (
                                            <div className="mt-2 bg-orange-50 text-orange-800 p-2 rounded-lg text-sm font-bold border border-orange-200 flex items-start gap-2">
                                                <StickyNote size={16} className="shrink-0 mt-0.5" />
                                                <span>Return Reason: {stop.reason}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-bold text-gray-900">{stop.id}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}