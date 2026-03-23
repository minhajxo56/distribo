// resources/js/pages/account/components/editProfileForm.tsx
import { useState } from 'react';
import { ChevronLeft, CheckCircle, User, Phone, Mail, MapPin } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';

export default function EditProfileForm({ user, onClose }: any) {
    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [email, setEmail] = useState(user?.email || '');
    const [address, setAddress] = useState(user?.address || '');

    const isValid = name.trim() !== '' && phone.trim() !== '';

    const handleSave = () => {
        console.log("Profile Updated", { name, phone, email, address });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-right-4 duration-200">
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full touch-manipulation">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">Edit Profile</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-32 w-full max-w-3xl mx-auto p-4 flex flex-col gap-4">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><User size={16}/> Full Name *</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><Phone size={16}/> Phone Number *</label>
                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><Mail size={16}/> Email Address (Optional)</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><MapPin size={16}/> Business Address</label>
                        <textarea rows={2} value={address} onChange={e => setAddress(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600 resize-none" />
                    </div>
                </div>
            </main>

            <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 shadow-sm">
                <div className="max-w-3xl mx-auto w-full">
                    <button onClick={handleSave} disabled={!isValid} className="w-full py-4 bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors touch-manipulation">
                        <CheckCircle size={22} strokeWidth={3} /> Save Changes
                    </button>
                </div>
            </div>
            <BottomBreadcrumb currentPage="My Account > Edit Profile" />
        </div>
    );
}