// resources/js/pages/partners/components/partnerList.tsx
import { Store, Truck, Users, Phone } from 'lucide-react';

interface Partner {
    id: string;
    name: string;
    phone: string;
    type: 'Vendor' | 'Shop' | 'Distributor';
    status: 'Active' | 'Inactive';
    code: string;
}

export default function PartnerList({ partners, onRowClick }: { partners: Partner[], onRowClick: (p: Partner) => void }) {
    
    const getIcon = (type: string) => {
        if (type === 'Shop') return <Store size={24} strokeWidth={2.5} />;
        if (type === 'Vendor') return <Truck size={24} strokeWidth={2.5} />;
        return <Users size={24} strokeWidth={2.5} />;
    };

    return (
        <div className="p-3 pb-24 flex flex-col gap-3"> 
            {partners.map((partner) => {
                const isActive = partner.status === 'Active';
                
                return (
                    <div 
                        key={partner.id}
                        onClick={() => onRowClick(partner)}
                        className={`bg-white border rounded-xl p-4 shadow-sm transition-colors touch-manipulation flex items-center gap-4
                            ${isActive ? 'border-gray-200 active:bg-indigo-50 active:border-indigo-300' : 'border-gray-200 opacity-75 bg-gray-50'}`}
                    >
                        <div className={`p-3 rounded-full shrink-0 ${isActive ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-500'}`}>
                            {getIcon(partner.type)}
                        </div>
                        
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="text-base font-bold text-gray-900 leading-none">{partner.name}</h3>
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                    {partner.status}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1 mt-2">
                                <p className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
                                    <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">{partner.type}</span> 
                                    • {partner.code}
                                </p>
                                <p className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
                                    <Phone size={14} className="text-gray-400" /> {partner.phone}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}