// resources/js/pages/inventory/index.tsx
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Plus, PackagePlus, FileEdit, History, Search } from 'lucide-react';

// Reusable Shared Components
import TopIndexBar from '../components/topIndexBar';
import BottomBreadcrumb from '../components/bottomBreadcrumb';
import ListItemActions from '../components/listItemActions';

// Inventory Specific Components
import InventoryFilter from './components/inventoryFilter';
import InventoryList from './components/inventoryList';
import ReceiveOrderForm from './components/receiveOrderForm';
import ManualAddStockForm from './components/manualAddStockForm';

// Dummy Inventory Data
const dummyInventory = [
    { id: '1', name: 'Cement Bag (50kg)', code: 'CEM-50', stock: 120, unit: 'Bags', status: 'In Stock' as const },
    { id: '2', name: 'Steel Rod (500W)', code: 'STL-500', stock: 5, unit: 'Ton', status: 'Low' as const },
    { id: '3', name: 'White Paint (10L)', code: 'PNT-W10', stock: 0, unit: 'Pcs', status: 'Out of Stock' as const },
];

export default function InventoryIndex() {
    // UI States
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    // Bottom Action Sheet States
    const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);
    const [isItemActionOpen, setIsItemActionOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    
    // Full Screen Flow States
    const [showReceiveForm, setShowReceiveForm] = useState(false);
    const [showManualAddForm, setShowManualAddForm] = useState(false);

    // Helpers
    const isAnyFormOpen = showReceiveForm || showManualAddForm;

    // Handlers
    const handleRowClick = (item: any) => {
        setSelectedItem(item);
        setIsItemActionOpen(true);
    };

    // FAB Actions (How to add stock into the system)
    const fabActions = [
        { 
            label: 'Receive from Order', 
            icon: PackagePlus, 
            onClick: () => { setIsFabMenuOpen(false); setShowReceiveForm(true); }, 
            type: 'primary' as const 
        },
        { 
            label: 'Manual Add / Purchase', 
            icon: Plus, 
            onClick: () => { setIsFabMenuOpen(false); setShowManualAddForm(true); } 
        },
    ];

    // Specific Item Actions (Managing existing stock)
    const itemActions = [
        { label: 'Adjust Stock (+/-)', icon: FileEdit, onClick: () => console.log('Adjust', selectedItem?.id), type: 'primary' as const },
        { label: 'View Stock History', icon: History, onClick: () => console.log('History', selectedItem?.id) },
        { label: 'Edit Basic Details', icon: Search, onClick: () => console.log('Edit Info', selectedItem?.id) },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
            <Head title="Inventory - Distribo" />

            {/* TOP BAR: Toggles Filter */}
            <TopIndexBar 
                title="Inventory" 
                actionLabel="Filter" 
                onActionClick={() => setIsFilterOpen(!isFilterOpen)} 
                isFilterActive={isFilterOpen}
            />

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 w-full max-w-3xl mx-auto flex flex-col relative z-0">
                {/* FILTER: Conditionally rendered */}
                {isFilterOpen && (
                    <div className="animate-in slide-in-from-top-2 duration-200 relative z-20">
                        <InventoryFilter />
                    </div>
                )}
                
                {/* DATA LIST */}
                <div className="relative z-10">
                    <InventoryList 
                        items={dummyInventory} 
                        onRowClick={handleRowClick} 
                    />
                </div>
            </main>

            {/* EXTENDED FAB: Hidden if any full-screen form is active */}
            {!isAnyFormOpen && (
                <button
                    onClick={() => setIsFabMenuOpen(true)}
                    className="fixed bottom-20 right-4 bg-indigo-600 active:bg-indigo-700 text-white px-5 py-3.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.25)] z-30 touch-manipulation transition-transform active:scale-95 flex items-center gap-2 font-bold text-base"
                >
                    <Plus size={22} strokeWidth={3} />
                    Manage Stock
                </button>
            )}

            {/* BOTTOM ACTION SHEETS */}
            <ListItemActions 
                isOpen={isFabMenuOpen}
                onClose={() => setIsFabMenuOpen(false)}
                title="Update Inventory"
                actions={fabActions}
            />

            <ListItemActions 
                isOpen={isItemActionOpen}
                onClose={() => setIsItemActionOpen(false)}
                title={selectedItem ? selectedItem.name : ''}
                actions={itemActions}
            />

            {/* GLOBAL BREADCRUMB */}
            <BottomBreadcrumb currentPage="Inventory" />

            {/* FULL SCREEN FLOWS: Rendered at the highest z-index to cover the screen entirely */}
            {showReceiveForm && (
                <ReceiveOrderForm onClose={() => setShowReceiveForm(false)} />
            )}

            {showManualAddForm && (
                <ManualAddStockForm onClose={() => setShowManualAddForm(false)} />
            )}
        </div>
    );
}