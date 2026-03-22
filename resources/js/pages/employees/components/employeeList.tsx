// resources/js/pages/employees/components/employeeList.tsx
import { UserCircle, Phone, Briefcase } from 'lucide-react';

interface Employee {
    id: string;
    name: string;
    phone: string;
    role: string;
    status: 'Active' | 'Inactive';
    salary: number;
}

export default function EmployeeList({ employees, onRowClick }: { employees: Employee[], onRowClick: (e: Employee) => void }) {
    return (
        <div className="p-3 pb-24 flex flex-col gap-3"> 
            {employees.map((emp) => {
                const isActive = emp.status === 'Active';
                
                return (
                    <div 
                        key={emp.id}
                        onClick={() => onRowClick(emp)}
                        className={`bg-white border rounded-xl p-4 shadow-sm transition-colors touch-manipulation flex items-center gap-4
                            ${isActive ? 'border-gray-200 active:bg-teal-50 active:border-teal-300' : 'border-gray-200 opacity-75 bg-gray-50'}`}
                    >
                        <div className={`p-3 rounded-full shrink-0 ${isActive ? 'bg-teal-100 text-teal-600' : 'bg-gray-200 text-gray-500'}`}>
                            <UserCircle size={28} strokeWidth={2.5} />
                        </div>
                        
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="text-base font-bold text-gray-900 leading-none">{emp.name}</h3>
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                    {emp.status}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1 mt-2">
                                <p className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
                                    <Briefcase size={14} className="text-gray-400" /> {emp.role}
                                </p>
                                <p className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
                                    <Phone size={14} className="text-gray-400" /> {emp.phone}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}