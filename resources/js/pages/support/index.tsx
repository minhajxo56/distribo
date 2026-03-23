// resources/js/pages/support/index.tsx
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { PhoneCall, MessageSquare, Video, GraduationCap, Clock, CheckCircle, AlertCircle } from 'lucide-react';

import TopIndexBar from '../components/topIndexBar';
import BottomBreadcrumb from '../components/bottomBreadcrumb';
import SupportRequestForm from './components/supportRequestForm';

// Dummy Support History
const DUMMY_HISTORY = [
    { id: 'TKT-001', type: 'Message', topic: 'Printer not connecting', date: 'Today, 10:30 AM', status: 'In Progress' },
    { id: 'TRN-002', type: 'Training', topic: 'Inventory Module Onboarding', date: '25 Mar 2026', status: 'Scheduled' },
    { id: 'MET-003', type: 'Meeting', topic: 'Custom Feature Request', date: '18 Mar 2026', status: 'Completed' },
];

export default function SupportIndex() {
    const [activeForm, setActiveForm] = useState<'Message' | 'Training' | 'Meeting' | null>(null);

    const supportPhone = "01700112233"; // Your actual support number

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
            <Head title="Help & Support - Distribo" />

            <TopIndexBar 
                title="Help & Support" 
                actionLabel="" 
                onActionClick={() => {}} 
                isFilterActive={false}
            />

            <main className="flex-1 w-full max-w-3xl mx-auto flex flex-col gap-6 p-4 pb-24">
                
                {/* 2x2 QUICK ACTION GRID */}
                <div>
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 pl-1">How can we help?</h2>
                    <div className="grid grid-cols-2 gap-3">
                        
                        {/* 1. Direct Phone Call (Native tel: link styled as button) */}
                        <a 
                            href={`tel:${supportPhone}`}
                            className="bg-green-50 border-2 border-green-200 active:bg-green-100 rounded-xl p-4 flex flex-col items-center justify-center gap-2 touch-manipulation transition-colors shadow-sm"
                        >
                            <div className="bg-green-100 text-green-600 p-3 rounded-full">
                                <PhoneCall size={28} strokeWidth={2.5} />
                            </div>
                            <span className="font-bold text-green-900 text-center leading-tight">Call Support<br/><span className="text-xs font-normal text-green-700">Instant Help</span></span>
                        </a>

                        {/* 2. Message Form */}
                        <button 
                            onClick={() => setActiveForm('Message')}
                            className="bg-blue-50 border-2 border-blue-200 active:bg-blue-100 rounded-xl p-4 flex flex-col items-center justify-center gap-2 touch-manipulation transition-colors shadow-sm"
                        >
                            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                                <MessageSquare size={28} strokeWidth={2.5} />
                            </div>
                            <span className="font-bold text-blue-900 text-center leading-tight">Send Message<br/><span className="text-xs font-normal text-blue-700">Create Ticket</span></span>
                        </button>

                        {/* 3. Training Form */}
                        <button 
                            onClick={() => setActiveForm('Training')}
                            className="bg-purple-50 border-2 border-purple-200 active:bg-purple-100 rounded-xl p-4 flex flex-col items-center justify-center gap-2 touch-manipulation transition-colors shadow-sm"
                        >
                            <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
                                <GraduationCap size={28} strokeWidth={2.5} />
                            </div>
                            <span className="font-bold text-purple-900 text-center leading-tight">Request Training<br/><span className="text-xs font-normal text-purple-700">Learn the App</span></span>
                        </button>

                        {/* 4. Meeting Form */}
                        <button 
                            onClick={() => setActiveForm('Meeting')}
                            className="bg-orange-50 border-2 border-orange-200 active:bg-orange-100 rounded-xl p-4 flex flex-col items-center justify-center gap-2 touch-manipulation transition-colors shadow-sm"
                        >
                            <div className="bg-orange-100 text-orange-600 p-3 rounded-full">
                                <Video size={28} strokeWidth={2.5} />
                            </div>
                            <span className="font-bold text-orange-900 text-center leading-tight">Google Meet<br/><span className="text-xs font-normal text-orange-700">Book Session</span></span>
                        </button>

                    </div>
                </div>

                {/* SUPPORT HISTORY / TICKET TRACKING */}
                <div>
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 pl-1">Recent Support Requests</h2>
                    <div className="flex flex-col gap-3">
                        {DUMMY_HISTORY.map(item => {
                            const isCompleted = item.status === 'Completed' || item.status === 'Resolved' || item.status === 'Closed';
                            const isActionable = item.status === 'Scheduled' || item.status === 'In Progress';
                            
                            return (
                                <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1 pr-3">
                                            <div className="flex items-center gap-1.5 mb-1">
                                                {item.type === 'Message' && <MessageSquare size={14} className="text-blue-500"/>}
                                                {item.type === 'Training' && <GraduationCap size={14} className="text-purple-500"/>}
                                                {item.type === 'Meeting' && <Video size={14} className="text-orange-500"/>}
                                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{item.type} • {item.id}</span>
                                            </div>
                                            <h3 className="font-bold text-gray-900 text-base leading-tight">{item.topic}</h3>
                                            <p className="text-sm font-bold text-gray-500 mt-1">{item.date}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider
                                            ${isCompleted ? 'bg-green-100 text-green-700' : isActionable ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}
                                        `}>
                                            {isCompleted ? <CheckCircle size={14}/> : isActionable ? <Clock size={14}/> : <AlertCircle size={14}/>}
                                            {item.status}
                                        </div>
                                        
                                        {!isCompleted && (
                                            <button className="text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg active:bg-gray-200 transition-colors">
                                                View Details
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            <BottomBreadcrumb currentPage="Help & Support" />

            {/* Render dynamic form overlay */}
            {activeForm && (
                <SupportRequestForm 
                    type={activeForm} 
                    onClose={() => setActiveForm(null)} 
                />
            )}
        </div>
    );
}