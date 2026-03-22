// resources/js/pages/employees/index.tsx
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Plus, Users, UserCheck, CalendarCheck, Banknote, RefreshCcw } from 'lucide-react';

import TopIndexBar from '../components/topIndexBar';
import BottomBreadcrumb from '../components/bottomBreadcrumb';
import ListItemActions from '../components/listItemActions';

// Directory Components
import EmployeeFilter from './components/employeeFilter';
import EmployeeList from './components/employeeList';
import EmployeeForm from './components/employeeForm';
import EmployeeProfile from './components/employeeProfile';

// Sub-Modules
import AttendanceView from './components/attendanceView';
import PayrollView from './components/payrollView';
import ProcessPayrollForm from './components/processPayrollForm';

const dummyEmployees = [
    { id: 'EMP-001', name: 'Karim Mia', phone: '01711223344', role: 'Delivery Person', status: 'Active' as const, salary: 18000 },
    { id: 'EMP-002', name: 'Rahim Uddin', phone: '01822334455', role: 'Manager', status: 'Active' as const, salary: 35000 },
];

export default function EmployeesHub() {
    // Hub Navigation State
    const [activeTab, setActiveTab] = useState<'directory' | 'attendance' | 'payroll'>('directory');

    // Filter State (Only for Directory)
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    // Directory Action States
    const [isActionOpen, setIsActionOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    
    // Full Screen Flow States
    const [showEmployeeForm, setShowEmployeeForm] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Payroll Flow State
    const [showProcessPayroll, setShowProcessPayroll] = useState(false);
    const [selectedPayrollRecord, setSelectedPayrollRecord] = useState<any>(null);

    const isAnyModalOpen = showEmployeeForm || showProfile || showProcessPayroll;

    // Handlers
    const handleDirectoryRowClick = (employee: any) => {
        setSelectedEmployee(employee);
        setIsActionOpen(true);
    };

    const handlePayrollProcessClick = (record: any) => {
        setSelectedPayrollRecord(record);
        setShowProcessPayroll(true);
    };

    const itemActions = [
        { label: 'View Profile & History', icon: UserCheck, onClick: () => { setIsActionOpen(false); setShowProfile(true); }, type: 'primary' as const },
        { label: 'Edit Employee Details', icon: Users, onClick: () => { setIsActionOpen(false); setIsEditMode(true); setShowEmployeeForm(true); } },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
            <Head title="Employees & HR - Distribo" />

            <TopIndexBar 
                title="Human Resources" 
                actionLabel={activeTab === 'directory' ? "Filter" : ""} 
                onActionClick={activeTab === 'directory' ? () => setIsFilterOpen(!isFilterOpen) : () => {}} 
                isFilterActive={isFilterOpen}
            />

            {/* MODULE NAVIGATION HUB */}
            <div className="bg-white border-b border-gray-200 px-3 py-3 sticky top-14 z-20 shadow-sm">
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button onClick={() => setActiveTab('directory')} className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all touch-manipulation ${activeTab === 'directory' ? 'bg-white text-teal-700 shadow-sm' : 'text-gray-500 active:bg-gray-200'}`}>
                        <Users size={16}/> Directory
                    </button>
                    <button onClick={() => setActiveTab('attendance')} className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all touch-manipulation ${activeTab === 'attendance' ? 'bg-white text-teal-700 shadow-sm' : 'text-gray-500 active:bg-gray-200'}`}>
                        <CalendarCheck size={16}/> Attendance
                    </button>
                    <button onClick={() => setActiveTab('payroll')} className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all touch-manipulation ${activeTab === 'payroll' ? 'bg-white text-teal-700 shadow-sm' : 'text-gray-500 active:bg-gray-200'}`}>
                        <Banknote size={16}/> Payroll
                    </button>
                </div>
            </div>

            <main className="flex-1 w-full max-w-3xl mx-auto flex flex-col relative z-0">
                
                {/* 1. DIRECTORY SUB-MODULE */}
                {activeTab === 'directory' && (
                    <div className="animate-in fade-in">
                        {isFilterOpen && <EmployeeFilter />} {/* Note: Rename to EmployeeFilter logically */}
                        <EmployeeList employees={dummyEmployees} onRowClick={handleDirectoryRowClick} />
                    </div>
                )}

                {/* 2. ATTENDANCE SUB-MODULE */}
                {activeTab === 'attendance' && (
                    <div className="animate-in fade-in">
                        <AttendanceView />
                    </div>
                )}

                {/* 3. PAYROLL SUB-MODULE */}
                {activeTab === 'payroll' && (
                    <div className="animate-in fade-in">
                        <PayrollView onProcessPayment={handlePayrollProcessClick} />
                    </div>
                )}

            </main>

            {/* CONTEXTUAL FAB */}
            {!isAnyModalOpen && activeTab === 'directory' && (
                <button
                    onClick={() => { setIsEditMode(false); setSelectedEmployee(null); setShowEmployeeForm(true); }}
                    className="fixed bottom-20 right-4 bg-teal-600 active:bg-teal-700 text-white px-5 py-3.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.25)] z-30 touch-manipulation transition-transform active:scale-95 flex items-center gap-2 font-bold text-base"
                >
                    <Plus size={22} strokeWidth={3} /> Add Employee
                </button>
            )}

            {!isAnyModalOpen && activeTab === 'payroll' && (
                <button
                    onClick={() => console.log('Generate Payroll Triggered')}
                    className="fixed bottom-20 right-4 bg-teal-600 active:bg-teal-700 text-white px-5 py-3.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.25)] z-30 touch-manipulation transition-transform active:scale-95 flex items-center gap-2 font-bold text-base"
                >
                    <RefreshCcw size={22} strokeWidth={3} /> Generate Payroll
                </button>
            )}

            <ListItemActions isOpen={isActionOpen} onClose={() => setIsActionOpen(false)} title={selectedEmployee?.name || ''} actions={itemActions} />

            <BottomBreadcrumb currentPage={`Human Resources > ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`} />

            {/* FULL SCREEN FLOWS */}
            {showEmployeeForm && <EmployeeForm isEdit={isEditMode} initialData={isEditMode ? selectedEmployee : null} onClose={() => setShowEmployeeForm(false)} />}
            {showProfile && <EmployeeProfile employee={selectedEmployee} onClose={() => setShowProfile(false)} onEdit={() => { setShowProfile(false); setIsEditMode(true); setShowEmployeeForm(true); }} />}
            {showProcessPayroll && <ProcessPayrollForm record={selectedPayrollRecord} onClose={() => setShowProcessPayroll(false)} />}
        </div>
    );
}