// resources/js/pages/delivery/components/deliveryList.tsx
import { Truck, CheckCircle, Clock, MapPin, AlertCircle } from 'lucide-react';

interface Trip {
    id: string;
    driver: string;
    vehicle: string;
    status: 'Pending' | 'In Transit' | 'Completed';
    totalOrders: number;
    completedOrders: number;
    failedOrders: number;
}

export default function DeliveryList({ trips, onRowClick }: { trips: Trip[], onRowClick: (t: Trip) => void }) {
    return (
        <div className="p-3 pb-24 flex flex-col gap-3"> 
            {trips.map((trip) => {
                const isCompleted = trip.status === 'Completed';
                const isInTransit = trip.status === 'In Transit';
                const progressPercentage = (trip.completedOrders / trip.totalOrders) * 100;
                
                return (
                    <div 
                        key={trip.id}
                        onClick={() => onRowClick(trip)}
                        className={`bg-white border rounded-xl p-4 shadow-sm transition-colors touch-manipulation flex flex-col gap-3
                            ${isInTransit ? 'border-blue-300 active:bg-blue-50' : 
                              isCompleted ? 'border-green-300 active:bg-green-50' : 
                              'border-gray-200 active:bg-gray-50'}`}
                    >
                        {/* Header: ID and Status */}
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                                <div className={`p-2 rounded-lg ${isInTransit ? 'bg-blue-100 text-blue-700' : isCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                    <Truck size={20} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 leading-none mb-1">Trip {trip.id}</h3>
                                    <span className={`text-xs font-bold uppercase tracking-wider ${isInTransit ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-500'}`}>
                                        {trip.status}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-900">{trip.driver}</p>
                                <p className="text-xs font-bold text-gray-500">{trip.vehicle}</p>
                            </div>
                        </div>

                        {/* Progress Bar (Only show if in transit or completed) */}
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex flex-col gap-2">
                            <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-gray-600 flex items-center gap-1"><MapPin size={14}/> {trip.totalOrders} Stops</span>
                                <span className={trip.failedOrders > 0 ? 'text-orange-600 flex items-center gap-1' : 'text-green-600'}>
                                    {trip.failedOrders > 0 && <AlertCircle size={14}/>}
                                    {trip.completedOrders} Delivered {trip.failedOrders > 0 && `• ${trip.failedOrders} Failed`}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden flex">
                                <div className="bg-green-500 h-2.5" style={{ width: `${progressPercentage}%` }}></div>
                                {trip.failedOrders > 0 && (
                                    <div className="bg-orange-500 h-2.5" style={{ width: `${(trip.failedOrders / trip.totalOrders) * 100}%` }}></div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}