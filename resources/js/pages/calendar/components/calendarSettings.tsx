// resources/js/pages/calendar/components/calendarSettings.tsx
import { useState } from 'react';
import { ChevronLeft, CheckCircle, Clock, CalendarX } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';

export default function CalendarSettings({ onClose }: any) {
    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [workingDays, setWorkingDays] = useState(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']);
    const [startHour, setStartHour] = useState('09:00');
    const [endHour, setEndHour] = useState('18:00');

    const toggleDay = (day: string) => {
        if (workingDays.includes(day)) {
            setWorkingDays(workingDays.filter(d => d !== day));
        } else {
            setWorkingDays([...workingDays, day]);
        }
    };

    const handleSave = () => {
        console.log("Settings Saved", { workingDays, startHour, endHour });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">Working Calendar</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-32 w-full max-w-3xl mx-auto p-4 flex flex-col gap-4">
                
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5"><CalendarX size={18}/> Working Days</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {DAYS.map(day => {
                            const isActive = workingDays.includes(day);
                            return (
                                <button
                                    key={day}
                                    onClick={() => toggleDay(day)}
                                    className={`py-3 px-4 rounded-lg text-sm font-bold border-2 transition-colors touch-manipulation text-left ${
                                        isActive ? 'bg-indigo-50 border-indigo-600 text-indigo-700' : 'bg-white border-gray-200 text-gray-500 active:bg-gray-50'
                                    }`}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5"><Clock size={18}/> Standard Working Hours</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">Start Time</label>
                            <input type="time" value={startHour} onChange={e => setStartHour(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-600" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">End Time</label>
                            <input type="time" value={endHour} onChange={e => setEndHour(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-600" />
                        </div>
                    </div>
                </div>

                <button className="w-full py-4 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:bg-gray-100">
                    <CalendarX size={18} /> Add Manual Holiday
                </button>
            </main>

            <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 shadow-sm">
                <div className="max-w-3xl mx-auto w-full">
                    <button onClick={handleSave} className="w-full py-4 bg-gray-900 active:bg-black text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors">
                        <CheckCircle size={22} strokeWidth={3} /> Save Calendar Settings
                    </button>
                </div>
            </div>
        </div>
    );
}