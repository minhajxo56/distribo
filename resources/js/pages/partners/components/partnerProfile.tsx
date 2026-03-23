// resources/js/pages/partners/components/partnerProfile.tsx
import { ChevronLeft, Edit, Store, Phone, MapPin, Mail, ShoppingCart, Banknote } from 'lucide-react';

export default function PartnerProfile({ partner, onClose, onEdit }: any) {
    // Dummy recent transactions
    const recentActivity = [
        { id: 'ORD-1042', type: 'Sales Order', amount: 45000, date: '12 Mar 2026', status: 'Delivered' },
        { id: 'PAY-883', type: 'Payment Received', amount: 20000, date: '10 Mar 2026', status: 'Completed' },
    ];

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            <header className="bg-indigo-600 px-3 h-14 flex items-center justify-between shrink-0 shadow-md z-20 text-white">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-indigo-100 active:bg-indigo-700 rounded-full">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold tracking-tight">Partner Profile</h1>
                </div>
                <button onClick={onEdit} className="p-2 text-indigo-100 active:bg-indigo-700 rounded-full">
                    <Edit size={20} strokeWidth={2.5} />
                </button>
            </header>

            <div className="bg-indigo-600 px-4 pb-6 pt-4 text-white shrink-0 shadow-sm rounded-b-3xl">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/50">
                        <Store size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black leading-tight">{partner.name}</h2>
                        <p className="text-indigo-200 font-bold">{partner.type} • {partner.code}</p>
                        <span className={`inline-block mt-2 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${partner.status === 'Active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                            {partner.status}
                        </span>
                    </div>
                </div>
            </div>

            <main className="flex-1 overflow-y-auto w-full max-w-3xl mx-auto p-4 flex flex-col gap-4 -mt-2">
                
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col gap-4">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2">Contact Details</h3>
                    <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-lg text-gray-600"><Phone size={18}/></div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Phone Number</p>
                            <p className="font-bold text-gray-900 text-base">{partner.phone}</p>
                        </div>
                    </div>
                    {partner.email && (
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2 rounded-lg text-gray-600"><Mail size={18}/></div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase">Email</p>
                                <p className="font-bold text-gray-900 text-base">{partner.email}</p>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-lg text-gray-600"><MapPin size={18}/></div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Address</p>
                            <p className="font-bold text-gray-900 text-base">{partner.address || 'Address not provided'}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Recent Activity</h3>
                    </div>
                    <div className="flex flex-col">
                        {recentActivity.map((activity, idx) => (
                            <div key={activity.id} className={`flex items-center justify-between p-4 ${idx !== recentActivity.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-lg ${activity.type === 'Sales Order' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                                        {activity.type === 'Sales Order' ? <ShoppingCart size={20}/> : <Banknote size={20}/>}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">{activity.type}</p>
                                        <p className="text-xs font-bold text-gray-500">{activity.id} • {activity.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-gray-900">৳{activity.amount.toLocaleString()}</p>
                                    <p className="text-[10px] font-bold uppercase text-gray-500">{activity.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}