// resources/js/pages/account/index.tsx
import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { User, Shield, FileText, Lock, Settings, History, ChevronRight } from 'lucide-react';

import TopIndexBar from '../components/topIndexBar';
import BottomBreadcrumb from '../components/bottomBreadcrumb';

import EditProfileForm from './components/editProfileForm';
import ChangePasswordForm from './components/changePasswordForm';
import DocumentManager from './components/documentManager';

export default function MyAccountIndex() {
    // Dummy User Data
    const userProfile = {
        name: 'Karim Business Owner',
        phone: '01711223344',
        email: 'karim@business.com',
        address: 'Mirpur 10, Dhaka',
        status: 'Active',
    };

    // UI States
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showDocuments, setShowDocuments] = useState(false);

    // Dummy Activity History
    const activities = [
        { desc: 'Password changed successfully', date: 'Yesterday, 10:45 AM' },
        { desc: 'Uploaded Trade_License.pdf', date: '15 Feb 2026' },
        { desc: 'Logged in from new device', date: '10 Feb 2026' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
            <Head title="My Account - Distribo" />

            <TopIndexBar 
                title="My Account" 
                actionLabel="" 
                onActionClick={() => {}} 
                isFilterActive={false}
            />

            <main className="flex-1 w-full max-w-3xl mx-auto flex flex-col gap-5 p-4 pb-24">
                
                {/* PROFILE SUMMARY CARD */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                        <User size={32} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-xl font-black text-gray-900 leading-tight">{userProfile.name}</h2>
                            {userProfile.status === 'Active' && (
                                <Shield size={16} className="text-green-500 fill-green-100" />
                            )}
                        </div>
                        <p className="text-sm font-bold text-gray-500">{userProfile.phone}</p>
                        <span className="inline-block mt-2 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                            Account {userProfile.status}
                        </span>
                    </div>
                </div>

                {/* ACTION MENU LIST */}
                <div className="flex flex-col gap-2">
                    <button 
                        onClick={() => setShowEditProfile(true)}
                        className="w-full bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex items-center justify-between active:bg-gray-50 touch-manipulation transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2.5 rounded-lg text-gray-700"><User size={20} /></div>
                            <span className="font-bold text-gray-900 text-base">Edit Personal Info</span>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                    </button>

                    <button 
                        onClick={() => setShowDocuments(true)}
                        className="w-full bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex items-center justify-between active:bg-gray-50 touch-manipulation transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2.5 rounded-lg text-gray-700"><FileText size={20} /></div>
                            <span className="font-bold text-gray-900 text-base">Manage Documents</span>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                    </button>

                    <button 
                        onClick={() => setShowPassword(true)}
                        className="w-full bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex items-center justify-between active:bg-gray-50 touch-manipulation transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2.5 rounded-lg text-gray-700"><Lock size={20} /></div>
                            <span className="font-bold text-gray-900 text-base">Change Password</span>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                    </button>
                </div>

                {/* RECENT ACTIVITY */}
                <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 pl-1 flex items-center gap-1.5">
                        <History size={16}/> Recent Activity
                    </h3>
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        {activities.map((act, i) => (
                            <div key={i} className={`p-4 flex justify-between items-center ${i !== activities.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                <p className="font-bold text-gray-900 text-sm">{act.desc}</p>
                                <p className="text-xs font-bold text-gray-500 ml-2 text-right">{act.date}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </main>

            <BottomBreadcrumb currentPage="My Account" />

            {/* FULL SCREEN OVERLAYS */}
            {showEditProfile && <EditProfileForm user={userProfile} onClose={() => setShowEditProfile(false)} />}
            {showPassword && <ChangePasswordForm onClose={() => setShowPassword(false)} />}
            {showDocuments && <DocumentManager onClose={() => setShowDocuments(false)} />}
        </div>
    );
}