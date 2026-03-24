// resources/js/pages/orders/components/orderListTable.tsx
import React from 'react';

export interface Order {
    id: string;
    brand: string;
    product: string;
    status: 'PENDING' | 'SHIPPED' | 'DELIVERED';
    date: string;
    delivery: string;
}

interface OrderListTableProps {
    orders: Order[];
    expandedOrderId: string | null;
    onRowClick: (orderId: string) => void;
    onAction: (action: string, order: Order) => void;
}

export default function OrderListTable({ orders, expandedOrderId, onRowClick, onAction }: OrderListTableProps) {
    return (
        <div className="p-4 pb-24 flex flex-col gap-4">
            {orders.map((order) => {
                const isExpanded = expandedOrderId === order.id;
                
                // Determine badge colors based on status
                let badgeStyle = 'bg-[#e2e8f0] text-[#475569]'; // Gray for Pending
                if (order.status === 'SHIPPED') {
                    badgeStyle = 'bg-indigo-100 text-indigo-700'; 
                } else if (order.status === 'DELIVERED') {
                    badgeStyle = 'bg-green-100 text-green-700';
                }

                return (
                    <div 
                        key={order.id}
                        className="bg-white border border-gray-100 rounded-xl p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all duration-200"
                    >
                        {/* Top Section: Always Visible (Clickable) */}
                        <div 
                            className="cursor-pointer touch-manipulation" 
                            onClick={() => onRowClick(order.id)}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="text-[17px] font-bold text-gray-800 tracking-tight">
                                    {order.product}
                                </h3>
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${badgeStyle}`}>
                                    {order.status}
                                </span>
                            </div>
                            <p className="text-[13px] text-gray-500 font-medium">
                                Order #{order.id} • {order.brand}
                            </p>
                        </div>
                        
                        {/* Expanded Details & Actions */}
                        {isExpanded && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                                <hr className="border-gray-100 my-4" />
                                
                                {/* Date & Delivery Details */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                                            Date & Time
                                        </span>
                                        <span className="block text-sm font-medium text-gray-800">
                                            {order.date}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                                            Delivery Estimate
                                        </span>
                                        <span className="block text-sm font-medium text-gray-800">
                                            {order.delivery}
                                        </span>
                                    </div>
                                </div>

                                <hr className="border-gray-100 my-4" />

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-2.5">
                                    {/* Row 1 */}
                                    <div className="flex gap-2.5">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); onAction('DETAILS', order); }}
                                            className="flex-1 bg-[#5f6368] hover:bg-gray-700 active:bg-gray-800 text-white py-2.5 rounded-md text-[11px] font-bold tracking-widest uppercase transition-colors"
                                        >
                                            Details
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); onAction('EDIT', order); }}
                                            className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-[#5f6368] py-2.5 rounded-md text-[11px] font-bold tracking-widest uppercase transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); onAction('DRAFT', order); }}
                                            className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-[#5f6368] py-2.5 rounded-md text-[11px] font-bold tracking-widest uppercase transition-colors"
                                        >
                                            Draft
                                        </button>
                                    </div>
                                    
                                    {/* Row 2 */}
                                    <div className="flex gap-2.5">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); onAction('CANCEL', order); }}
                                            className="flex-1 bg-white hover:bg-gray-50 text-[#5f6368] py-2.5 rounded-md text-[11px] font-bold tracking-widest uppercase transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); onAction('DELETE', order); }}
                                            className="flex-[1.5] bg-white border border-[#fca5a5] hover:bg-red-50 text-[#991b1b] py-2.5 rounded-md text-[11px] font-bold tracking-widest uppercase transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}