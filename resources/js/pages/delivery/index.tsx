// resources/js/pages/delivery/index.tsx
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Plus, Play, FileText, Truck } from 'lucide-react';

import TopIndexBar from '../components/topIndexBar';
import BottomBreadcrumb from '../components/bottomBreadcrumb';
import ListItemActions from '../components/listItemActions';

import DeliveryFilter from './components/deliveryFilter';
import DeliveryList from './components/deliveryList';
import CreateTripForm from './components/createTripForm';
import ExecuteDeliveryForm from './components/executeDeliveryForm';
import ViewTripDetails from './components/viewTripDetails'; // NEW
import ManageFleet from './components/manageFleet';         // NEW

const dummyTrips = [
    { id: 'TRP-101', driver: 'Karim Mia', vehicle: 'Van-01', status: 'In Transit' as const, totalOrders: 5, completedOrders: 2, failedOrders: 0 },
    { id: 'TRP-102', driver: 'Rahim Uddin', vehicle: 'Truck-02', status: 'Pending' as const, totalOrders: 3, completedOrders: 0, failedOrders: 0 },
    { id: 'TRP-099', driver: 'Karim Mia', vehicle: 'Van-01', status: 'Completed' as const, totalOrders: 4, completedOrders: 3, failedOrders: 1 },
];

export default function DeliveryIndex() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    // Bottom Action Sheets
    const [isActionOpen, setIsActionOpen] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState<any>(null);
    
    // Modals
    const [showCreateTrip, setShowCreateTrip] = useState(false);
    const [showExecuteTrip, setShowExecuteTrip] = useState(false);
    const [showTripDetails, setShowTripDetails] = useState(false); // NEW
    const [showManageFleet, setShowManageFleet] = useState(false); // NEW

    const isAnyModalOpen = showCreateTrip || showExecuteTrip || showTripDetails || showManageFleet;

    const handleRowClick = (trip: any) => {
        setSelectedTrip(trip);
        setIsActionOpen(true);
    };

    const handleExecuteStart = () => {
        setIsActionOpen(false);
        setShowExecuteTrip(true);
    };

    const actionItems = [
        { 
            label: selectedTrip?.status === 'Pending' ? 'Start Route / Deliveries' : 'Continue Deliveries', 
            icon: Play, 
            onClick: handleExecuteStart, 
            type: 'primary' as const 
        },
        { 
            label: 'View Trip Summary', 
            icon: FileText, 
            onClick: () => { setIsActionOpen(false); setShowTripDetails(true); } 
        },
        { 
            label: 'Manage Fleet (Drivers/Vehicles)', 
            icon: Truck, 
            onClick: () => { setIsActionOpen(false); setShowManageFleet(true); } 
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
            <Head title="Delivery - Distribo" />

            <TopIndexBar 
                title="Delivery Trips" 
                actionLabel="Filter" 
                onActionClick={() => setIsFilterOpen(!isFilterOpen)} 
                isFilterActive={isFilterOpen}
            />

            <main className="flex-1 w-full max-w-3xl mx-auto flex flex-col relative">
                {isFilterOpen && (
                    <div className="animate-in slide-in-from-top-2 duration-200 z-20">
                        <DeliveryFilter />
                    </div>
                )}
                
                <div className="z-10">
                    <DeliveryList trips={dummyTrips} onRowClick={handleRowClick} />
                </div>
            </main>

            {!isAnyModalOpen && (
                <button
                    onClick={() => setShowCreateTrip(true)}
                    className="fixed bottom-20 right-4 bg-blue-600 active:bg-blue-700 text-white px-5 py-3.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.25)] z-30 touch-manipulation transition-transform active:scale-95 flex items-center gap-2 font-bold text-base"
                >
                    <Plus size={22} strokeWidth={3} />
                    Create Trip
                </button>
            )}

            <ListItemActions 
                isOpen={isActionOpen}
                onClose={() => setIsActionOpen(false)}
                title={selectedTrip ? `Trip ${selectedTrip.id}` : ''}
                actions={actionItems}
            />

            <BottomBreadcrumb currentPage="Delivery" />

            {/* FULL SCREEN MODALS */}
            {showCreateTrip && <CreateTripForm onClose={() => setShowCreateTrip(false)} />}
            {showExecuteTrip && <ExecuteDeliveryForm tripData={selectedTrip} onClose={() => setShowExecuteTrip(false)} />}
            {showTripDetails && <ViewTripDetails tripData={selectedTrip} onClose={() => setShowTripDetails(false)} />}
            {showManageFleet && <ManageFleet onClose={() => setShowManageFleet(false)} />}
        </div>
    );
}