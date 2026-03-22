// resources/js/pages/employees/components/attendanceView.tsx
import { useState } from 'react';
import { CheckCircle, Calendar } from 'lucide-react';

const DUMMY_EMPLOYEES = [
    { id: 'EMP-001', name: 'Karim Mia', role: 'Delivery Person' },
    { id: 'EMP-002', name: 'Rahim Uddin', role: 'Manager' },
    { id: 'EMP-003', name: 'Selim Reza', role: 'Staff' },
];

export default function AttendanceView() {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendance, setAttendance] = useState<Record<string, string>>({});

    const markAttendance = (empId: string, status: string) => {
        setAttendance({ ...attendance, [empId]: status });
    };

    const handleSave = () => {
        console.log("Attendance Saved for", date, attendance);
    };

    return (
        <div className="flex flex-col gap-4 pb-24">
            {/* Date Selector */}
            <div className="bg-white p-3 border-b border-gray-200 shadow-sm flex items-center justify-between sticky top-0 z-10">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Calendar size={18} className="text-teal-600" /> Attendance Date
                </label>
                <input 
                    type="date" 
                    value={date} 
                    onChange={e => setDate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-600"
                />
            </div>

            {/* Employee List */}
            <div className="px-3 flex flex-col gap-3">
                {DUMMY_EMPLOYEES.map(emp => (
                    <div key={emp.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <div className="mb-3">
                            <h3 className="font-bold text-gray-900 text-base">{emp.name}</h3>
                            <p className="text-xs font-bold text-gray-500">{emp.role} • {emp.id}</p>
                        </div>
                        
                        {/* Segmented Buttons for Attendance */}
                        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                            {['Present', 'Absent', 'Late'].map((status) => {
                                const isSelected = attendance[emp.id] === status;
                                const activeColor = status === 'Present' ? 'text-green-700' : status === 'Absent' ? 'text-red-700' : 'text-orange-700';
                                
                                return (
                                    <button
                                        key={status}
                                        onClick={() => markAttendance(emp.id, status)}
                                        className={`flex-1 py-3 text-sm font-bold rounded-md transition-colors touch-manipulation ${
                                            isSelected ? `bg-white ${activeColor} shadow-sm border border-gray-200/50` : 'text-gray-500 active:bg-gray-200'
                                        }`}
                                    >
                                        {status}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Fixed Bottom Save Button */}
            <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-gray-200 z-30 shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">
                <div className="max-w-3xl mx-auto w-full">
                    <button 
                        onClick={handleSave} 
                        disabled={Object.keys(attendance).length === 0}
                        className="w-full py-4 bg-teal-600 active:bg-teal-700 disabled:bg-gray-300 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 touch-manipulation transition-colors"
                    >
                        <CheckCircle size={22} strokeWidth={3} /> Save Attendance Record
                    </button>
                </div>
            </div>
        </div>
    );
}