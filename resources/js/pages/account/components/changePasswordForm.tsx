// resources/js/pages/account/components/changePasswordForm.tsx
import { useState } from 'react';
import { ChevronLeft, Lock, CheckCircle, AlertTriangle } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';

export default function ChangePasswordForm({ onClose }: any) {
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const passwordsMatch = newPass === confirmPass;
    const isLengthValid = newPass.length >= 6;
    const isValid = currentPass !== '' && newPass !== '' && passwordsMatch && isLengthValid;

    const handleSave = () => {
        console.log("Password Changed Successfully");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-right-4 duration-200">
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full touch-manipulation">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">Change Password</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-32 w-full max-w-3xl mx-auto p-4 flex flex-col gap-4">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><Lock size={16}/> Current Password</label>
                        <input type="password" value={currentPass} onChange={e => setCurrentPass(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600" />
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">New Password (Min 6 chars)</label>
                        <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Confirm New Password</label>
                        <input type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} className={`w-full bg-gray-50 border text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 ${!passwordsMatch && confirmPass !== '' ? 'border-red-500 focus:ring-red-600' : 'border-gray-300 focus:ring-blue-600'}`} />
                        {!passwordsMatch && confirmPass !== '' && (
                            <p className="text-xs font-bold text-red-600 mt-1 flex items-center gap-1"><AlertTriangle size={12}/> Passwords do not match</p>
                        )}
                    </div>
                </div>
            </main>

            <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 shadow-sm">
                <div className="max-w-3xl mx-auto w-full">
                    <button onClick={handleSave} disabled={!isValid} className="w-full py-4 bg-gray-900 active:bg-black disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors touch-manipulation">
                        <CheckCircle size={22} strokeWidth={3} /> Update Password
                    </button>
                </div>
            </div>
            <BottomBreadcrumb currentPage="My Account > Change Password" />
        </div>
    );
}