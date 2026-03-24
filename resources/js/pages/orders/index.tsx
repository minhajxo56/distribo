// resources/js/pages/orders/index.tsx
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

// Reusable UI Components
import TopIndexBar from './components/topIndexBar';
import BottomBreadcrumb from '../components/bottomBreadcrumb';

// Module-Specific Components
import OrderTableFilter from './components/orderTableFilter';
import OrderListTable, { Order } from './components/orderListTable';
import OrderForm from './components/orderForm';

// Updated Dummy Data to match the new screenshot
const dummyOrders: Order[] = [
    { 
        id: '8821', 
        brand: 'Stark Design Co.',
        product: 'Architect Chrono V2',
        status: 'PENDING', 
        date: 'Oct 24, 2023 · 14:32',
        delivery: 'Arriving Oct 27'
    },
    { 
        id: '8814', 
        brand: 'Curated Home',
        product: 'Artisan Leather Tote',
        status: 'SHIPPED', 
        date: 'Oct 18, 2023 · 11:15',
        delivery: 'Arriving Oct 19'
    },
];

export default function OrdersIndex() {
    // UI States
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    
    // Form Modal States
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Handlers
    const handleCreateOrder = () => {
        setIsEditMode(false);
        setSelectedOrder(null);
        setShowOrderForm(true);
    };

    // Toggles the accordion state of a card
    const handleRowClick = (orderId: string) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    // Central handler for the inline card actions
    const handleCardAction = (action: string, order: Order) => {
        switch (action) {
            case 'DETAILS':
                console.log('View Details for:', order.id);
                break;
            case 'EDIT':
                setSelectedOrder(order);
                setIsEditMode(true);
                setShowOrderForm(true);
                break;
            case 'DRAFT':
                console.log('Move to Draft:', order.id);
                break;
            case 'CANCEL':
                console.log('Cancel Order:', order.id);
                break;
            case 'DELETE':
                console.log('Delete Order:', order.id);
                break;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
            <Head title="Orders - Distribo" />

            {/* TOP BAR */}
            <TopIndexBar 
                title="Order" 
                onActionClick={() => setIsFilterOpen(!isFilterOpen)} 
                isFilterActive={isFilterOpen}
            />

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 w-full max-w-3xl mx-auto flex flex-col relative">
                
                {/* 1. FILTER */}
                {isFilterOpen && (
                    <div className="animate-in slide-in-from-top-2 duration-200">
                        <OrderTableFilter />
                    </div>
                )}
                
                {/* 2. LIST (Cards have internal action expansion now) */}
                <OrderListTable 
                    orders={dummyOrders} 
                    expandedOrderId={expandedOrderId}
                    onRowClick={handleRowClick} 
                    onAction={handleCardAction}
                />
            </main>

{!showOrderForm && (
                <div className="fixed bottom-16 right-4 flex items-center z-40 touch-manipulation transition-transform active:scale-[0.98]">
                    <div className="flex bg-white/95 backdrop-blur-md border border-gray-200 rounded-[14px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden">
                        
                        {/* Back / Navigation Control (Left Edge) */}
                        <button
                            onClick={() => window.history.back()} // Replace with your router back navigation
                            className="h-[42px] w-[42px] flex items-center justify-center text-slate-700 hover:bg-gray-50 active:bg-gray-100 transition-colors border-r border-gray-200"
                            aria-label="Back"
                        >
                            <ChevronLeft size={20} strokeWidth={2.5} />
                        </button>

                        {/* Create Action (Right Edge) */}
                        <button
                            onClick={handleCreateOrder}
                            className="h-[42px] pl-4 pr-3 flex items-center justify-center gap-1.5 font-bold text-[14px] text-blue-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                        >
                            Create
                            <ChevronRight size={18} strokeWidth={2.5} className="text-slate-600" />
                        </button>
                    </div>
                </div>
            )}

            {/* GLOBAL BREADCRUMB */}
            <BottomBreadcrumb currentPage="Orders" />

            {/* FULL-SCREEN MODAL */}
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