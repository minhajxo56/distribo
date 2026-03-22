// resources/js/pages/delivery/components/createTripForm.tsx
import { useState } from 'react';
import { ChevronLeft, CheckCircle, Truck, User, Search, Check } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';

const PENDING_ORDERS = [
    { id: 'SA-5012', customer: 'Hasan Builders', location: 'Mirpur 10', items: 2 },
    { id: 'SA-5013', customer: 'Rahim Store', location: 'Dhanmondi', items: 5 },
    { id: 'SA-5014', customer: 'Al-Amin Traders', location: 'Mirpur 1', items: 1 },
];

export default function CreateTripForm({ onClose }: any) {
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
    const [driver, setDriver] = useState('');
    const [vehicle, setVehicle] = useState('');

    const toggleOrder = (id: string) => {
        if (selectedOrders.includes(id)) {
            setSelectedOrders(selectedOrders.filter(o => o !== id));
        } else {
            setSelectedOrders([...selectedOrders, id]);
        }
    };

    const handleCreate = () => {
        console.log("Trip Created", { driver, vehicle, selectedOrders });
        onClose();
    };

    const isValid = driver && vehicle && selectedOrders.length > 0;

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Create Delivery Trip</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-32 w-full max-w-3xl mx-auto p-4 flex flex-col gap-5">
                {/* Driver & Vehicle */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><User size={16}/> Assign Driver</label>
                        <select value={driver} onChange={e => setDriver(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600">
                            <option value="">Select Driver...</option>
                            <option value="Karim">Karim Mia</option>
                            <option value="Rahim">Rahim Uddin</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><Truck size={16}/> Assign Vehicle</label>
                        <select value={vehicle} onChange={e => setVehicle(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600">
                            <option value="">Select Vehicle...</option>
                            <option value="Van-01">Pickup Van 01 (Dhaka-Metro-11)</option>
                            <option value="Truck-02">3-Ton Truck 02</option>
                        </select>
                    </div>
                </div>

                {/* Orders Selection */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-gray-700">Select Orders for Route</label>
                        <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-md">{selectedOrders.length} Selected</span>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        {PENDING_ORDERS.map(order => {
                            const isSelected = selectedOrders.includes(order.id);
                            return (
                                <button
                                    key={order.id}
                                    onClick={() => toggleOrder(order.id)}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-colors touch-manipulation flex items-center gap-3 shadow-sm ${
                                        isSelected ? 'bg-blue-50 border-blue-600' : 'bg-white border-gray-200 active:bg-gray-50'
                                    }`}
                                >
                                    <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 border-2 ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'}`}>
                                        {isSelected && <Check size={16} strokeWidth={3} />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-base">{order.customer} <span className="text-gray-500 font-normal text-sm">({order.id})</span></h3>
                                        <p className="text-sm font-bold text-gray-500">{order.location} • {order.items} items</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </main>

            <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 shadow-sm">
                <div className="max-w-3xl mx-auto w-full">
                    <button onClick={handleCreate} disabled={!isValid} className="w-full py-4 bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors">
                        <CheckCircle size={22} strokeWidth={3} /> Create Trip
                    </button>
                </div>
            </div>
            <BottomBreadcrumb currentPage="Delivery > Create Trip" />
        </div>
    );
}