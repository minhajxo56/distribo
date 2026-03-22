// resources/js/pages/orders/components/orderListTable.tsx
import { CheckCircle, Clock } from 'lucide-react';

interface Order {
    id: string;
    customer: string;
    amount: string;
    status: 'Pending' | 'Paid';
    date: string;
}

interface OrderListTableProps {
    orders: Order[];
    onRowClick: (order: Order) => void;
}

export default function OrderListTable({ orders, onRowClick }: OrderListTableProps) {
    return (
        <div className="p-3 pb-20 flex flex-col gap-2"> {/* pb-20 prevents bottom-nav overlap */}
            {orders.map((order) => {
                const isPaid = order.status === 'Paid';
                
                return (
                    <div 
                        key={order.id}
                        onClick={() => onRowClick(order)}
                        className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm active:bg-blue-50 active:border-blue-300 transition-colors touch-manipulation"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-base font-bold text-gray-900 leading-none mb-1">
                                    {order.customer}
                                </h3>
                                <p className="text-xs font-bold text-gray-500">
                                    Order #{order.id} • {order.date}
                                </p>
                            </div>
                            <span className="text-base font-bold text-gray-900">
                                ৳{order.amount}
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-gray-100">
                            {isPaid ? (
                                <CheckCircle size={14} className="text-green-600" strokeWidth={3} />
                            ) : (
                                <Clock size={14} className="text-orange-500" strokeWidth={3} />
                            )}
                            <span className={`text-xs font-bold ${isPaid ? 'text-green-700' : 'text-orange-700'}`}>
                                {order.status}
                            </span>
                        </div>
                    </div>
                );
            })}
            
            {/* Quick simple lazy-load/pagination indicator */}
            <button className="w-full py-3 mt-2 text-sm font-bold text-blue-600 bg-blue-50 rounded-lg active:bg-blue-100">
                Load More
            </button>
        </div>
    );
}