// resources/js/pages/calendar/components/agendaForm.tsx
import { useState } from 'react';
import { ChevronLeft, CheckCircle, Calendar as CalendarIcon, Clock, AlignLeft, Bell, RefreshCw, CheckSquare, StickyNote } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';

interface AgendaFormProps {
    type: 'Event' | 'Task' | 'Note';
    onClose: () => void;
}

export default function AgendaForm({ type, onClose }: AgendaFormProps) {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    
    // Event specific
    const [eventType, setEventType] = useState('Meeting');
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('10:00');
    
    // Shared optional
    const [description, setDescription] = useState('');
    const [reminder, setReminder] = useState('10 min before');
    const [isRecurring, setIsRecurring] = useState(false);
    const [recurringFreq, setRecurringFreq] = useState('Weekly');

    const isValid = title.trim() !== '' && date !== '';

    const handleSave = () => {
        console.log(`Saved ${type}`, { title, date, startTime, endTime, eventType, description, reminder, isRecurring });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full touch-manipulation">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">Create {type}</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-32 w-full max-w-3xl mx-auto p-4 flex flex-col gap-4">
                
                {/* Core Details */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                            {type === 'Task' ? <CheckSquare size={16}/> : type === 'Note' ? <StickyNote size={16}/> : <CalendarIcon size={16}/>} 
                            {type} Title *
                        </label>
                        <input type="text" placeholder={`Enter ${type.toLowerCase()} title...`} value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-lg font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-600" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className={type !== 'Event' ? 'col-span-2' : ''}>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><CalendarIcon size={16}/> Date *</label>
                            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-600" />
                        </div>
                        {type === 'Event' && (
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Category</label>
                                <select value={eventType} onChange={e => setEventType(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-600">
                                    <option>Meeting</option>
                                    <option>Delivery</option>
                                    <option>Training</option>
                                    <option>Personal</option>
                                </select>
                            </div>
                        )}
                    </div>

                    {type === 'Event' && (
                        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><Clock size={16}/> Start Time</label>
                                <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><Clock size={16}/> End Time</label>
                                <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-600" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Details & Reminders */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Additional Options</h3>
                    </div>
                    <div className="p-4 flex flex-col gap-4">
                        
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><AlignLeft size={16}/> {type === 'Note' ? 'Note Content' : 'Description'} (Optional)</label>
                            <textarea rows={3} placeholder="Add more details..." value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none resize-none focus:ring-2 focus:ring-indigo-600" />
                        </div>

                        {type !== 'Note' && (
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5"><Bell size={16}/> Reminder</label>
                                <select value={reminder} onChange={e => setReminder(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-600">
                                    <option>None</option>
                                    <option>At time of event</option>
                                    <option>10 min before</option>
                                    <option>1 hour before</option>
                                    <option>1 day before</option>
                                </select>
                            </div>
                        )}

                        {type === 'Event' && (
                            <div className="pt-2 border-t border-gray-100">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5"><RefreshCw size={16}/> Recurring Event</label>
                                    <button onClick={() => setIsRecurring(!isRecurring)} className={`w-14 h-8 rounded-full transition-colors flex items-center px-1 ${isRecurring ? 'bg-indigo-600 justify-end' : 'bg-gray-300 justify-start'}`}>
                                        <div className="w-6 h-6 bg-white rounded-full shadow-sm"></div>
                                    </button>
                                </div>
                                {isRecurring && (
                                    <select value={recurringFreq} onChange={e => setRecurringFreq(e.target.value)} className="w-full bg-indigo-50 border border-indigo-200 text-indigo-900 text-sm font-bold rounded-lg px-3 py-3 outline-none">
                                        <option>Daily</option>
                                        <option>Weekly</option>
                                        <option>Monthly</option>
                                    </select>
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </main>

            <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 shadow-sm">
                <div className="max-w-3xl mx-auto w-full">
                    <button onClick={handleSave} disabled={!isValid} className="w-full py-4 bg-indigo-600 active:bg-indigo-700 disabled:bg-gray-300 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors touch-manipulation">
                        <CheckCircle size={22} strokeWidth={3} /> Save {type}
                    </button>
                </div>
            </div>
            <BottomBreadcrumb currentPage={`Calendar > Add ${type}`} />
        </div>
    );
}