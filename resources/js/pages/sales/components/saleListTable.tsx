// resources/js/pages/sales/components/saleListTable.tsx
import { CheckCircle, Clock } from 'lucide-react';

interface Sale {
    id: string;
    customer: string;
    amount: string;
    status: 'Paid' | 'Due';
    date: string;
}

interface SaleListTableProps {
    sales: Sale[];
    onRowClick: (sale: Sale) => void;
}

export default function SaleListTable({ sales, onRowClick }: SaleListTableProps) {
    return (
        <div className="p-3 pb-24 flex flex-col gap-2"> 
            {sales.map((sale) => {
                const isPaid = sale.status === 'Paid';
                
                return (
                    <div 
                        key={sale.id}
                        onClick={() => onRowClick(sale)}
                        className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm active:bg-blue-50 active:border-blue-300 transition-colors touch-manipulation"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-base font-bold text-gray-900 leading-none mb-1">
                                    {sale.customer}
                                </h3>
                                <p className="text-xs font-bold text-gray-500">
                                    SA-{sale.id} • {sale.date}
                                </p>
                            </div>
                            <span className="text-base font-bold text-gray-900">
                                ৳{sale.amount}
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-gray-100">
                            {isPaid ? (
                                <CheckCircle size={14} className="text-green-600" strokeWidth={3} />
                            ) : (
                                <Clock size={14} className="text-orange-500" strokeWidth={3} />
                            )}
                            <span className={`text-xs font-bold ${isPaid ? 'text-green-700' : 'text-orange-700'}`}>
                                {sale.status}
                            </span>
                        </div>
                    </div>
                );
            })}
            
            <button className="w-full py-3 mt-2 text-sm font-bold text-blue-600 bg-blue-50 rounded-lg active:bg-blue-100">
                Load More
            </button>
        </div>
    );
}