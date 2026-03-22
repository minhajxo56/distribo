// resources/js/pages/inventory/components/inventoryList.tsx
import { AlertTriangle, XCircle, PackageCheck } from 'lucide-react';

interface InventoryItem {
    id: string;
    name: string;
    code: string;
    stock: number;
    unit: string;
    status: 'In Stock' | 'Low' | 'Out of Stock';
}

interface InventoryListProps {
    items: InventoryItem[];
    onRowClick: (item: InventoryItem) => void;
}

export default function InventoryList({ items, onRowClick }: InventoryListProps) {
    return (
        <div className="p-3 pb-24 flex flex-col gap-2"> 
            {items.map((item) => {
                const isOut = item.status === 'Out of Stock';
                const isLow = item.status === 'Low';
                const isGood = item.status === 'In Stock';
                
                return (
                    <div 
                        key={item.id}
                        onClick={() => onRowClick(item)}
                        className={`bg-white border rounded-xl p-3 shadow-sm transition-colors touch-manipulation flex items-center justify-between
                            ${isOut ? 'border-red-300 active:bg-red-50' : 
                              isLow ? 'border-orange-300 active:bg-orange-50' : 
                              'border-gray-200 active:bg-blue-50 active:border-blue-300'}`}
                    >
                        <div className="flex-1 pr-2">
                            <h3 className="text-base font-bold text-gray-900 leading-none mb-1">
                                {item.name}
                            </h3>
                            <p className="text-xs font-bold text-gray-500 mb-2">
                                SKU: {item.code}
                            </p>
                            
                            <div className="flex items-center gap-1.5">
                                {isOut && <XCircle size={14} className="text-red-600" strokeWidth={3} />}
                                {isLow && <AlertTriangle size={14} className="text-orange-500" strokeWidth={3} />}
                                {isGood && <PackageCheck size={14} className="text-green-600" strokeWidth={3} />}
                                
                                <span className={`text-xs font-bold uppercase tracking-wider
                                    ${isOut ? 'text-red-700' : isLow ? 'text-orange-700' : 'text-green-700'}`}
                                >
                                    {item.status}
                                </span>
                            </div>
                        </div>
                        
                        <div className={`flex flex-col items-center justify-center p-3 rounded-lg min-w-[80px]
                            ${isOut ? 'bg-red-50 text-red-700' : isLow ? 'bg-orange-50 text-orange-700' : 'bg-green-50 text-green-700'}`}
                        >
                            <span className="text-2xl font-black leading-none">{item.stock}</span>
                            <span className="text-xs font-bold mt-1 uppercase">{item.unit}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}