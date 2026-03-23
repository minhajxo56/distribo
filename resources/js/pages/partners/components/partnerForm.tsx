// resources/js/pages/partners/components/partnerForm.tsx
import { useState } from 'react';
import { ChevronLeft, CheckCircle, Store, User, Phone, MapPin, Mail, StickyNote } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';

export default function PartnerForm({ isEdit = false, initialData, onClose }: any) {
    const [name, setName] = useState(initialData?.name || '');
    const [phone, setPhone] = useState(initialData?.phone || '');
    const [email, setEmail] = useState(initialData?.email || '');
    const [address, setAddress] = useState(initialData?.address || '');
    const [type, setType] = useState(initialData?.type || 'Shop');
    const [notes, setNotes] = useState(initialData?.notes || '');
    const [status, setStatus] = useState(initialData?.status || 'Active');

    // Strict validation: Name, Phone, and Type are mandatory
    const isValid = name.trim() !== '' && phone.trim() !== '' && type !== '';

    const handleSave = () => {
        console.log("Partner Saved", { name, phone, email, address, type, notes, status });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full touch-manipulation">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">{isEdit ? 'Edit Partner' : 'Add Partner'}</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-32 w-full max-w-3xl mx-auto p-4 flex flex-col gap-4">
                
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-indigo-50 px-4 py-3 border-b border-indigo-100 flex items-center gap-2">
                        <Store size={18} className="text-indigo-700" />
                        <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-wider">Business Identity</h3>
                    </div>
                    <div className="p-4 flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><User size={16}/> Business / Partner Name *</label>
                            <input type="text" placeholder="e.g. Hasan Builders" value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-600" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Partner Type *</label>
                            <div className="flex gap-2">
                                {['Shop', 'Vendor', 'Distributor'].map(t => (
                                    <button 
                                        key={t} onClick={() => setType(t)} 
                                        className={`flex-1 py-3 border-2 rounded-lg font-bold text-sm touch-manipulation transition-colors ${type === t ? 'bg-indigo-50 border-indigo-600 text-indigo-700' : 'bg-white border-gray-200 text-gray-600 active:bg-gray-50'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col gap-4">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2">Contact Information</h3>
                    
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><Phone size={16}/> Phone Number *</label>
                        <input type="tel" placeholder="01XXXXXXXXX" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><Mail size={16}/> Email (Optional)</label>
                        <input type="email" placeholder="contact@example.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><MapPin size={16}/> Full Address</label>
                        <textarea rows={2} placeholder="Street, Area, City..." value={address} onChange={e => setAddress(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-600 resize-none" />
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><StickyNote size={16}/> Internal Notes (Optional)</label>
                        <textarea rows={2} placeholder="Credit limits, special terms..." value={notes} onChange={e => setNotes(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-600 resize-none" />
                    </div>

                    {isEdit && (
                        <div className="pt-2 border-t border-gray-100">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Partner Status</label>
                            <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                                {['Active', 'Inactive'].map((s) => (
                                    <button key={s} onClick={() => setStatus(s)} className={`flex-1 py-3 text-sm font-bold rounded-md transition-colors ${status === s ? (s === 'Active' ? 'bg-white text-green-700 shadow-sm border border-gray-200/50' : 'bg-white text-red-700 shadow-sm border border-gray-200/50') : 'text-gray-600 active:bg-gray-200'}`}>
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </main>

            <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 shadow-sm">
                <div className="max-w-3xl mx-auto w-full">
                    <button onClick={handleSave} disabled={!isValid} className="w-full py-4 bg-indigo-600 active:bg-indigo-700 disabled:bg-gray-300 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors touch-manipulation">
                        <CheckCircle size={22} strokeWidth={3} /> Save Partner
                    </button>
                </div>
            </div>
            <BottomBreadcrumb currentPage={`Partners > ${isEdit ? 'Edit' : 'Add'} Partner`} />
        </div>
    );
}