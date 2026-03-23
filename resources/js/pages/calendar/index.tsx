// resources/js/pages/calendar/index.tsx
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Plus, Calendar as CalendarIcon, Clock, CheckSquare, StickyNote, Bell, Settings } from 'lucide-react';

import TopIndexBar from '../components/topIndexBar';
import BottomBreadcrumb from '../components/bottomBreadcrumb';
import ListItemActions from '../components/listItemActions';

import CalendarFilter from './components/calendarFilter';
import AgendaForm from './components/agendaForm';
import CalendarSettings from './components/calendarSettings';

export default function CalendarIndex() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    // UI Navigation
    const [activeDate, setActiveDate] = useState(23); // Simulating today is 23
    
    // FAB and Modals
    const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);
    const [formType, setFormType] = useState<'Event' | 'Task' | 'Note' | null>(null);
    const [showSettings, setShowSettings] = useState(false);

    // Dummy Agenda Items for Selected Date
    const [agenda] = useState([
        { id: '1', type: 'Event', title: 'Sales Team Sync', time: '10:00 AM - 11:00 AM', category: 'Meeting', isCompleted: false },
        { id: '2', type: 'Task', title: 'Verify Bank Deposit', time: 'Due Today', isCompleted: true },
        { id: '3', type: 'Event', title: 'Supplier Delivery (Cement)', time: '02:30 PM', category: 'Delivery', isCompleted: false },
        { id: '4', type: 'Note', title: 'Warehouse AC maintenance scheduled for tomorrow.', time: '', isCompleted: false },
    ]);

    const isAnyModalOpen = formType !== null || showSettings;

    const fabActions = [
        { label: 'New Event', icon: CalendarIcon, onClick: () => { setIsFabMenuOpen(false); setFormType('Event'); }, type: 'primary' as const },
        { label: 'New Task', icon: CheckSquare, onClick: () => { setIsFabMenuOpen(false); setFormType('Task'); } },
        { label: 'New Note', icon: StickyNote, onClick: () => { setIsFabMenuOpen(false); setFormType('Note'); } },
        { label: 'Working Days & Holidays', icon: Settings, onClick: () => { setIsFabMenuOpen(false); setShowSettings(true); } },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
            <Head title="Calendar - Distribo" />

            <TopIndexBar 
                title="Calendar & Agenda" 
                actionLabel="Filter" 
                onActionClick={() => setIsFilterOpen(!isFilterOpen)} 
                isFilterActive={isFilterOpen}
            />

            <main className="flex-1 w-full max-w-3xl mx-auto flex flex-col relative z-0">
                {isFilterOpen && (
                    <div className="animate-in slide-in-from-top-2 duration-200 z-20">
                        <CalendarFilter />
                    </div>
                )}
                
                {/* HORIZONTAL WEEK STRIP */}
                <div className="bg-white border-b border-gray-200 py-3 shadow-sm sticky top-14 z-10">
                    <div className="px-4 flex justify-between items-center mb-3">
                        <h2 className="text-base font-black text-gray-900">March 2026</h2>
                        <button className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">Today</button>
                    </div>
                    <div className="flex overflow-x-auto hide-scrollbar px-3 gap-2">
                        {/* Simulating a week view */}
                        {[21, 22, 23, 24, 25, 26, 27].map((date) => {
                            const isToday = date === 23;
                            const isSelected = date === activeDate;
                            const dayName = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'][date - 21];

                            return (
                                <button
                                    key={date}
                                    onClick={() => setActiveDate(date)}
                                    className={`flex flex-col items-center min-w-[60px] p-2 rounded-xl transition-colors touch-manipulation border-2 ${
                                        isSelected ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 
                                        isToday ? 'bg-indigo-50 border-indigo-200 text-indigo-900' : 
                                        'bg-white border-transparent text-gray-600 active:bg-gray-100'
                                    }`}
                                >
                                    <span className={`text-xs font-bold uppercase ${isSelected ? 'text-indigo-200' : 'text-gray-400'}`}>{dayName}</span>
                                    <span className="text-xl font-black mt-1">{date}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* DAILY AGENDA LIST */}
                <div className="p-4 flex flex-col gap-3 pb-24">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider pl-1 mb-1">
                        Agenda for Mar {activeDate}
                    </h3>

                    {agenda.map(item => (
                        <div key={item.id} className={`bg-white border rounded-xl p-4 shadow-sm flex gap-3 transition-colors touch-manipulation active:bg-gray-50
                            ${item.type === 'Task' ? 'border-green-200' : item.type === 'Note' ? 'border-yellow-200 bg-yellow-50/30' : 'border-gray-200'}
                        `}>
                            {/* Icon Indicator */}
                            <div className="mt-1 shrink-0">
                                {item.type === 'Task' && (
                                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${item.isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 bg-white'}`}>
                                        {item.isCompleted && <CheckSquare size={16}/>}
                                    </div>
                                )}
                                {item.type === 'Event' && <div className="w-3 h-3 bg-indigo-500 rounded-full mt-1.5 shadow-sm"></div>}
                                {item.type === 'Note' && <StickyNote size={20} className="text-yellow-600"/>}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h4 className={`text-base font-bold leading-tight mb-1 ${item.isCompleted ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                                    {item.title}
                                </h4>
                                
                                {item.time && (
                                    <p className={`text-sm font-bold flex items-center gap-1.5 ${item.isCompleted ? 'text-gray-400' : 'text-indigo-600'}`}>
                                        <Clock size={14}/> {item.time}
                                    </p>
                                )}
                                
                                {item.category && (
                                    <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
                                        {item.category}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* EXTENDED FAB */}
            {!isAnyModalOpen && (
                <button
                    onClick={() => setIsFabMenuOpen(true)}
                    className="fixed bottom-20 right-4 bg-indigo-600 active:bg-indigo-700 text-white px-5 py-3.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.25)] z-30 touch-manipulation transition-transform active:scale-95 flex items-center gap-2 font-bold text-base"
                >
                    <Plus size={22} strokeWidth={3} />
                    Add to Calendar
                </button>
            )}

            <ListItemActions isOpen={isFabMenuOpen} onClose={() => setIsFabMenuOpen(false)} title="Calendar Actions" actions={fabActions} />

            <BottomBreadcrumb currentPage="Calendar" />

            {/* FULL SCREEN MODALS */}
            {formType && <AgendaForm type={formType} onClose={() => setFormType(null)} />}
            {showSettings && <CalendarSettings onClose={() => setShowSettings(false)} />}
        </div>
    );
}