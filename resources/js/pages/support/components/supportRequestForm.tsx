// resources/js/pages/support/components/supportRequestForm.tsx
import { useState } from 'react';
import { ChevronLeft, CheckCircle, MessageSquare, Video, GraduationCap, Calendar, Clock, Users } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';

interface SupportFormProps {
    type: 'Message' | 'Training' | 'Meeting';
    onClose: () => void;
}

export default function SupportRequestForm({ type, onClose }: SupportFormProps) {
    // Shared State
    const [topic, setTopic] = useState('');
    
    // Message State
    const [message, setMessage] = useState('');
    
    // Scheduling State (Training & Meeting)
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [participants, setParticipants] = useState('');

    // Dynamic UI configuration based on request type
    const config = {
        Message: { title: 'Send a Message', icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-600', activeBg: 'active:bg-blue-700' },
        Training: { title: 'Request Training', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-600', activeBg: 'active:bg-purple-700' },
        Meeting: { title: 'Book Online Meeting', icon: Video, color: 'text-orange-600', bg: 'bg-orange-600', activeBg: 'active:bg-orange-700' },
    }[type];

    const Icon = config.icon;

    // Validation
    const isValid = type === 'Message' 
        ? topic.trim() !== '' && message.trim() !== ''
        : topic.trim() !== '' && date !== '' && time !== '';

    const handleSubmit = () => {
        const payload = type === 'Message' 
            ? { type, topic, message, status: 'Open' }
            : { type, topic, date, time, participants: Number(participants) || 1, status: 'Pending' };
            
        console.log(`${type} Request Submitted:`, payload);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full touch-manipulation">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">{config.title}</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-32 w-full max-w-3xl mx-auto p-4 flex flex-col gap-5">
                
                {/* Visual Header */}
                <div className="flex flex-col items-center justify-center py-6 text-center gap-3">
                    <div className={`p-4 rounded-full bg-white shadow-sm border border-gray-100 ${config.color}`}>
                        <Icon size={40} strokeWidth={2} />
                    </div>
                    <p className="text-sm font-bold text-gray-500 px-4">
                        {type === 'Message' && "Describe your issue and our support team will get back to you."}
                        {type === 'Training' && "Schedule an on-site or virtual training session for your staff."}
                        {type === 'Meeting' && "Book a Google Meet session with our support engineers."}
                    </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-4">
                    
                    {/* Common Field: Subject / Topic */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">
                            {type === 'Message' ? 'Subject / Issue' : 'Topic to Cover'}
                        </label>
                        <input 
                            type="text" 
                            placeholder={type === 'Message' ? "e.g. Cannot print invoice" : "e.g. How to use the Delivery module"}
                            value={topic} 
                            onChange={e => setTopic(e.target.value)} 
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-gray-400" 
                        />
                    </div>

                    {/* Specific to Messages */}
                    {type === 'Message' && (
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Detailed Message</label>
                            <textarea 
                                rows={5} 
                                placeholder="Explain the problem in detail..." 
                                value={message} 
                                onChange={e => setMessage(e.target.value)} 
                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none resize-none focus:ring-2 focus:ring-gray-400" 
                            />
                        </div>
                    )}

                    {/* Specific to Scheduling (Training / Meeting) */}
                    {(type === 'Training' || type === 'Meeting') && (
                        <>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><Calendar size={16}/> Preferred Date</label>
                                    <input 
                                        type="date" 
                                        value={date} 
                                        onChange={e => setDate(e.target.value)} 
                                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-gray-400" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><Clock size={16}/> Preferred Time</label>
                                    <input 
                                        type="time" 
                                        value={time} 
                                        onChange={e => setTime(e.target.value)} 
                                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-gray-400" 
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><Users size={16}/> Number of Participants (Optional)</label>
                                <input 
                                    type="text" 
                                    inputMode="numeric"
                                    placeholder="e.g. 3" 
                                    value={participants} 
                                    onChange={e => setParticipants(e.target.value.replace(/\D/g, ''))} 
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-gray-400" 
                                />
                            </div>
                        </>
                    )}
                </div>
            </main>

            <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 shadow-sm">
                <div className="max-w-3xl mx-auto w-full">
                    <button 
                        onClick={handleSubmit} 
                        disabled={!isValid} 
                        className={`w-full py-4 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors touch-manipulation shadow-sm ${
                            isValid ? `${config.bg} ${config.activeBg}` : 'bg-gray-300 text-gray-500'
                        }`}
                    >
                        <CheckCircle size={22} strokeWidth={3} /> Submit Request
                    </button>
                </div>
            </div>
            
            <BottomBreadcrumb currentPage={`Support > ${config.title}`} />
        </div>
    );
}