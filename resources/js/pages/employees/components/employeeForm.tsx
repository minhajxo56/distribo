// resources/js/pages/employees/components/employeeForm.tsx
import { useState } from 'react';
import { ChevronLeft, CheckCircle, Upload, User, Briefcase, DollarSign } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';

export default function EmployeeForm({ isEdit = false, initialData, onClose }: any) {
    const [name, setName] = useState(initialData?.name || '');
    const [phone, setPhone] = useState(initialData?.phone || '');
    const [address, setAddress] = useState(initialData?.address || '');
    
    const [role, setRole] = useState(initialData?.role || 'Staff');
    const [joinDate, setJoinDate] = useState(initialData?.joinDate || new Date().toISOString().split('T')[0]);
    const [salary, setSalary] = useState(initialData?.salary?.toString() || '');
    
    const [status, setStatus] = useState(initialData?.status || 'Active');

    const isValid = name.trim() !== '' && phone.trim() !== '' && role !== '';

    const handleSave = () => {
        console.log("Employee Saved", { name, phone, address, role, joinDate, salary: Number(salary), status });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-bottom-4 duration-200">
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">{isEdit ? 'Edit Employee' : 'Add Employee'}</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-32 w-full max-w-3xl mx-auto p-4 flex flex-col gap-4">
                
                {/* Personal Info */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-4">
                    <h3 className="text-sm font-bold text-teal-700 flex items-center gap-2 uppercase tracking-wider border-b border-gray-100 pb-2"><User size={18}/> Personal Details</h3>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
                        <input type="text" placeholder="e.g. Rahim Uddin" value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-teal-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number</label>
                        <input type="tel" placeholder="01XXXXXXXXX" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-teal-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Home Address</label>
                        <textarea rows={2} placeholder="Full address..." value={address} onChange={e => setAddress(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-teal-600 resize-none" />
                    </div>
                </div>

                {/* Job Info */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-4">
                    <h3 className="text-sm font-bold text-teal-700 flex items-center gap-2 uppercase tracking-wider border-b border-gray-100 pb-2"><Briefcase size={18}/> Job Details</h3>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Role / Position</label>
                            <select value={role} onChange={e => setRole(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-teal-600">
                                <option value="Manager">Manager</option>
                                <option value="Staff">Staff</option>
                                <option value="Delivery Person">Delivery Person</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Joining Date</label>
                            <input type="date" value={joinDate} onChange={e => setJoinDate(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-teal-600" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Monthly Basic Salary (৳)</label>
                        <input type="text" inputMode="numeric" placeholder="0" value={salary} onChange={e => setSalary(e.target.value.replace(/\D/g, ''))} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-lg font-black rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-teal-600" />
                    </div>
                </div>

                {isEdit && (
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Employee Status</label>
                        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                            {['Active', 'Inactive'].map((s) => (
                                <button key={s} onClick={() => setStatus(s)} className={`flex-1 py-3 text-sm font-bold rounded-md transition-colors ${status === s ? (s === 'Active' ? 'bg-white text-green-700 shadow-sm border border-gray-200/50' : 'bg-white text-red-700 shadow-sm border border-gray-200/50') : 'text-gray-600 active:bg-gray-200'}`}>
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 shadow-sm">
                <div className="max-w-3xl mx-auto w-full">
                    <button onClick={handleSave} disabled={!isValid} className="w-full py-4 bg-teal-600 active:bg-teal-700 disabled:bg-gray-300 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors">
                        <CheckCircle size={22} strokeWidth={3} /> Save Employee
                    </button>
                </div>
            </div>
            <BottomBreadcrumb currentPage={`Employees > ${isEdit ? 'Edit' : 'Add'} Profile`} />
        </div>
    );
}