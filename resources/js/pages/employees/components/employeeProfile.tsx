// resources/js/pages/employees/components/employeeProfile.tsx
import { useState } from 'react';
import { ChevronLeft, User, CalendarCheck, Banknote, Edit, PhoneCall, PlusCircle, FileText } from 'lucide-react';

export default function EmployeeProfile({ employee, onClose, onEdit }: any) {
    const [activeTab, setActiveTab] = useState<'profile' | 'attendance' | 'payroll'>('profile');

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            <header className="bg-teal-600 px-3 h-14 flex items-center justify-between shrink-0 shadow-md z-20 text-white">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-white/80 active:bg-teal-700 rounded-full">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold tracking-tight truncate">{employee.name}</h1>
                </div>
                <button onClick={onEdit} className="p-2 text-white/80 active:bg-teal-700 rounded-full">
                    <Edit size={20} strokeWidth={2.5} />
                </button>
            </header>

            {/* Header Summary */}
            <div className="bg-teal-600 px-4 pb-5 pt-2 text-white shrink-0 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/50">
                        <User size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black leading-tight">{employee.name}</h2>
                        <p className="text-teal-100 font-bold">{employee.role} • {employee.id}</p>
                        <span className={`inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${employee.status === 'Active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                            {employee.status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200 px-2 pt-2 flex overflow-x-auto hide-scrollbar shrink-0">
                <button onClick={() => setActiveTab('profile')} className={`flex-1 min-w-[100px] py-3 text-sm font-bold border-b-2 flex items-center justify-center gap-2 ${activeTab === 'profile' ? 'border-teal-600 text-teal-700' : 'border-transparent text-gray-500'}`}>
                    <User size={18}/> Profile
                </button>
                <button onClick={() => setActiveTab('attendance')} className={`flex-1 min-w-[100px] py-3 text-sm font-bold border-b-2 flex items-center justify-center gap-2 ${activeTab === 'attendance' ? 'border-teal-600 text-teal-700' : 'border-transparent text-gray-500'}`}>
                    <CalendarCheck size={18}/> Attendance
                </button>
                <button onClick={() => setActiveTab('payroll')} className={`flex-1 min-w-[100px] py-3 text-sm font-bold border-b-2 flex items-center justify-center gap-2 ${activeTab === 'payroll' ? 'border-teal-600 text-teal-700' : 'border-transparent text-gray-500'}`}>
                    <Banknote size={18}/> Payroll
                </button>
            </div>

            <main className="flex-1 overflow-y-auto pb-10 w-full max-w-3xl mx-auto p-4 flex flex-col gap-4">
                
                {/* PROFILE TAB */}
                {activeTab === 'profile' && (
                    <div className="flex flex-col gap-4 animate-in fade-in">
                        <button className="w-full py-4 bg-white border border-gray-200 rounded-xl shadow-sm font-bold text-gray-700 flex justify-center items-center gap-2 active:bg-gray-50">
                            <PhoneCall size={20} className="text-teal-600" /> Call {employee.phone}
                        </button>

                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col gap-3">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase">Home Address</p>
                                <p className="text-base font-bold text-gray-900">{employee.address || 'Mirpur 10, Dhaka'}</p>
                            </div>
                            <div className="border-t border-gray-100 pt-3">
                                <p className="text-xs font-bold text-gray-500 uppercase">Joining Date</p>
                                <p className="text-base font-bold text-gray-900">12 Jan 2024</p>
                            </div>
                            <div className="border-t border-gray-100 pt-3">
                                <p className="text-xs font-bold text-gray-500 uppercase">Basic Salary</p>
                                <p className="text-lg font-black text-gray-900">৳{employee.salary.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
                            <p className="text-xs font-bold text-gray-500 uppercase mb-2">Attached Documents</p>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <FileText size={24} className="text-gray-400" />
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-900">NID_Card_Copy.pdf</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ATTENDANCE TAB */}
                {activeTab === 'attendance' && (
                    <div className="flex flex-col gap-4 animate-in fade-in">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="bg-green-50 border border-green-200 p-3 rounded-xl text-center">
                                <p className="text-2xl font-black text-green-700">22</p>
                                <p className="text-[10px] font-bold text-green-800 uppercase">Present</p>
                            </div>
                            <div className="bg-red-50 border border-red-200 p-3 rounded-xl text-center">
                                <p className="text-2xl font-black text-red-700">2</p>
                                <p className="text-[10px] font-bold text-red-800 uppercase">Absent</p>
                            </div>
                            <div className="bg-orange-50 border border-orange-200 p-3 rounded-xl text-center">
                                <p className="text-2xl font-black text-orange-700">1</p>
                                <p className="text-[10px] font-bold text-orange-800 uppercase">Late</p>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
                            <h3 className="text-sm font-bold text-gray-900 mb-3">Mark Today's Attendance</h3>
                            <div className="flex gap-2">
                                <button className="flex-1 py-3 bg-green-100 text-green-700 font-bold rounded-lg active:bg-green-200">Present</button>
                                <button className="flex-1 py-3 bg-red-100 text-red-700 font-bold rounded-lg active:bg-red-200">Absent</button>
                                <button className="flex-1 py-3 bg-orange-100 text-orange-700 font-bold rounded-lg active:bg-orange-200">Late</button>
                            </div>
                        </div>
                        
                        {/* Attendance History List */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">Recent History</div>
                            {[
                                { date: 'Today, 22 Mar', status: 'Present', color: 'text-green-600' },
                                { date: 'Yesterday, 21 Mar', status: 'Late', color: 'text-orange-600' },
                                { date: '20 Mar 2026', status: 'Absent', color: 'text-red-600' },
                            ].map((row, i) => (
                                <div key={i} className="flex justify-between items-center p-3 border-b border-gray-100 last:border-0">
                                    <span className="font-bold text-gray-900 text-sm">{row.date}</span>
                                    <span className={`font-bold text-sm ${row.color}`}>{row.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* PAYROLL & ADVANCES TAB */}
                {activeTab === 'payroll' && (
                    <div className="flex flex-col gap-4 animate-in fade-in">
                        {/* Outstanding Advance / Loan Warning */}
                        <div className="bg-orange-50 border border-orange-300 p-4 rounded-xl flex justify-between items-center">
                            <div>
                                <p className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-1">Outstanding Advance Balance</p>
                                <p className="text-2xl font-black text-orange-900">৳5,000</p>
                            </div>
                            <button className="bg-white text-orange-700 px-3 py-2 rounded-lg font-bold text-sm shadow-sm border border-orange-200 active:bg-orange-100">
                                Deduct
                            </button>
                        </div>

                        <div className="flex gap-2">
                            <button className="flex-1 py-4 bg-teal-600 active:bg-teal-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm">
                                <Banknote size={18}/> Pay Salary
                            </button>
                            <button className="flex-1 py-4 bg-white border border-gray-300 active:bg-gray-100 text-gray-800 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm">
                                <PlusCircle size={18}/> Give Advance
                            </button>
                        </div>

                        {/* Payment History */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">Payroll History</div>
                            {[
                                { date: '01 Mar 2026', type: 'Feb Salary', amt: 25000, method: 'Bank' },
                                { date: '15 Feb 2026', type: 'Advance Loan', amt: 5000, method: 'Cash' },
                                { date: '01 Feb 2026', type: 'Jan Salary', amt: 25000, method: 'Bank' },
                            ].map((row, i) => (
                                <div key={i} className="flex justify-between items-center p-4 border-b border-gray-100 last:border-0">
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{row.type}</h4>
                                        <p className="text-xs font-bold text-gray-500">{row.date} • {row.method}</p>
                                    </div>
                                    <span className="font-black text-gray-900">৳{row.amt.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}