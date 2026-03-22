// resources/js/pages/orders/index.tsx
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Edit, Trash2, CheckCircle, FileText, Plus } from 'lucide-react';

// Reusable UI Components
import TopIndexBar from '../components/topIndexBar';
import BottomBreadcrumb from '../components/bottomBreadcrumb';
import ListItemActions from '../components/listItemActions';

// Module-Specific Components
import OrderTableFilter from './components/orderTableFilter';
import OrderListTable from './components/orderListTable';
import OrderForm from './components/orderForm';

// Dummy Data
const dummyOrders = [
    { id: '1042', customer: 'Rahim Store', amount: '12,500', status: 'Pending' as const, date: 'Today, 10:30 AM' },
    { id: '1041', customer: 'Bhai Bhai Traders', amount: '8,200', status: 'Paid' as const, date: 'Yesterday' },
    { id: '1040', customer: 'Mayer Doa Enterprise', amount: '45,000', status: 'Paid' as const, date: 'Mar 18' },
];

export default function OrdersIndex() {
    // UI States
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isActionOpen, setIsActionOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    
    // Form Modal States
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Handlers
    const handleCreateOrder = () => {
        setIsEditMode(false);
        setSelectedOrder(null);
        setShowOrderForm(true);
    };

    const handleEditOrder = () => {
        setIsEditMode(true);
        setIsActionOpen(false); // Close the bottom sheet
        setShowOrderForm(true); // Open the form with selectedOrder data
    };

    const handleRowClick = (order: any) => {
        setSelectedOrder(order);
        setIsActionOpen(true);
    };

    // Actions configured for the popup bottom sheet menu
    const actionItems = [
        { label: 'View Details', icon: FileText, onClick: () => console.log('View', selectedOrder?.id), type: 'primary' as const },
        { label: 'Mark as Paid', icon: CheckCircle, onClick: () => console.log('Pay', selectedOrder?.id) },
        { label: 'Edit Order', icon: Edit, onClick: handleEditOrder },
        { label: 'Cancel Order', icon: Trash2, onClick: () => console.log('Delete', selectedOrder?.id), type: 'danger' as const },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
            <Head title="Orders - Distribo" />

            {/* TOP BAR: Toggles the filter section */}
            <TopIndexBar 
                title="Orders" 
                actionLabel="Filter" 
                onActionClick={() => setIsFilterOpen(!isFilterOpen)} 
                isFilterActive={isFilterOpen}
            />

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 w-full max-w-3xl mx-auto flex flex-col relative">
                
                {/* 1. FILTER: Conditionally rendered, slides in from top */}
                {isFilterOpen && (
                    <div className="animate-in slide-in-from-top-2 duration-200">
                        <OrderTableFilter />
                    </div>
                )}
                
                {/* 2. LIST: The actual order cards */}
                <OrderListTable 
                    orders={dummyOrders} 
                    onRowClick={handleRowClick} 
                />
            </main>

            {/* EXTENDED FLOATING ACTION BUTTON (FAB) */}
            {/* Hidden completely when the form is open to prevent background touches */}
            {!showOrderForm && (
                <button
                    onClick={handleCreateOrder}
                    className="fixed bottom-20 right-4 bg-blue-600 active:bg-blue-700 text-white px-5 py-3.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.25)] z-30 touch-manipulation transition-transform active:scale-95 flex items-center gap-2 font-bold text-base"
                >
                    <Plus size={22} strokeWidth={3} />
                    Create Order
                </button>
            )}

            {/* ACTION MENU: Bottom sheet for row taps */}
            <ListItemActions 
                isOpen={isActionOpen}
                onClose={() => setIsActionOpen(false)}
                title={selectedOrder ? `Order #${selectedOrder.id}` : ''}
                actions={actionItems}
            />

            {/* GLOBAL BREADCRUMB: Bottom navigation context */}
            <BottomBreadcrumb currentPage="Orders" />

            {/* FULL-SCREEN MODAL: Create / Edit Order Form */}
            {/* Rendered at the end so its z-50 completely covers everything else */}
            {showOrderForm && (
                <OrderForm 
                    isEdit={isEditMode}
                    initialData={isEditMode ? selectedOrder : null}
                    onClose={() => setShowOrderForm(false)} 
                />
            )}
        </div>
    );
}