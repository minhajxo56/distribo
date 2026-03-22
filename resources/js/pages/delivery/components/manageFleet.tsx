// resources/js/pages/delivery/components/manageFleet.tsx
import { useState } from 'react';
import { ChevronLeft, Truck, User, Plus, Phone, Hash, CheckCircle, X } from 'lucide-react';

export default function ManageFleet({ onClose }: any) {
    const [activeTab, setActiveTab] = useState<'drivers' | 'vehicles'>('drivers');
    const [isAdding, setIsAdding] = useState(false);
    
    // Add Form States
    const [newName, setNewName] = useState('');
    const [newDetail, setNewDetail] = useState(''); // Phone for driver, Plate for vehicle

    // Dummy Data
    const [drivers, setDrivers] = useState([
        { id: 1, name: 'Karim Mia', phone: '01711223344', status: 'On Trip' },
        { id: 2, name: 'Rahim Uddin', phone: '01822334455', status: 'Available' },
    ]);

    const [vehicles, setVehicles] = useState([
        { id: 1, name: 'Pickup Van 01', plate: 'Dhaka-Metro-11-2233', status: 'On Trip' },
        { id: 2, name: '3-Ton Truck 02', plate: 'Dhaka-Metro-14-5566', status: 'Available' },
    ]);

    const handleSave = () => {
        if (activeTab === 'drivers') {
            setDrivers([{ id: Date.now(), name: newName, phone: newDetail, status: 'Available' }, ...drivers]);
        } else {
            setVehicles([{ id: Date.now(), name: newName, plate: newDetail, status: 'Available' }, ...vehicles]);
        }
        setIsAdding(false);
        setNewName('');
        setNewDetail('');
    };

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full touch-manipulation">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">Fleet Management</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-32 w-full max-w-3xl mx-auto p-4 flex flex-col gap-4">
                
                {/* Tabs */}
                <div className="flex bg-gray-200 p-1 rounded-xl shadow-inner">
                    <button 
                        onClick={() => { setActiveTab('drivers'); setIsAdding(false); }}
                        className={`flex-1 py-3 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${activeTab === 'drivers' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 active:bg-gray-300'}`}
                    >
                        <User size={18} /> Delivery Persons
                    </button>
                    <button 
                        onClick={() => { setActiveTab('vehicles'); setIsAdding(false); }}
                        className={`flex-1 py-3 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${activeTab === 'vehicles' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 active:bg-gray-300'}`}
                    >
                        <Truck size={18} /> Vehicles
                    </button>
                </div>

                {/* Inline Add Form */}
                {isAdding ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm animate-in fade-in slide-in-from-top-2">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-blue-900">Add New {activeTab === 'drivers' ? 'Driver' : 'Vehicle'}</h3>
                            <button onClick={() => setIsAdding(false)} className="p-1 text-blue-600 bg-blue-100 rounded-full"><X size={18}/></button>
                        </div>
                        <div className="flex flex-col gap-3">
                            <input 
                                type="text" placeholder={activeTab === 'drivers' ? 'Driver Name' : 'Vehicle Name (e.g. Van-01)'}
                                value={newName} onChange={e => setNewName(e.target.value)}
                                className="w-full bg-white border border-gray-300 text-gray-900 font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <div className="flex items-center bg-white border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-600 overflow-hidden">
                                <div className="px-3 text-gray-400">{activeTab === 'drivers' ? <Phone size={18}/> : <Hash size={18}/>}</div>
                                <input 
                                    type="text" placeholder={activeTab === 'drivers' ? 'Phone Number' : 'License Plate Number'}
                                    value={newDetail} onChange={e => setNewDetail(e.target.value)}
                                    className="flex-1 w-full py-3 pr-3 border-none outline-none font-bold text-gray-900"
                                />
                            </div>
                            <button onClick={handleSave} disabled={!newName || !newDetail} className="w-full py-3 bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-bold flex justify-center items-center gap-2 mt-1">
                                <CheckCircle size={20} /> Save Entry
                            </button>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => setIsAdding(true)} className="w-full py-4 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:bg-gray-100">
                        <Plus size={18} strokeWidth={3} /> Add New {activeTab === 'drivers' ? 'Driver' : 'Vehicle'}
                    </button>
                )}

                {/* List View */}
                <div className="flex flex-col gap-3">
                    {activeTab === 'drivers' && drivers.map(driver => (
                        <div key={driver.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-100 p-2.5 rounded-full text-gray-600"><User size={20} /></div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-base">{driver.name}</h3>
                                    <p className="text-sm font-bold text-gray-500">{driver.phone}</p>
                                </div>
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${driver.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                {driver.status}
                            </span>
                        </div>
                    ))}

                    {activeTab === 'vehicles' && vehicles.map(vehicle => (
                        <div key={vehicle.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-100 p-2.5 rounded-full text-gray-600"><Truck size={20} /></div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-base">{vehicle.name}</h3>
                                    <p className="text-sm font-bold text-gray-500">{vehicle.plate}</p>
                                </div>
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${vehicle.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                {vehicle.status}
                            </span>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}