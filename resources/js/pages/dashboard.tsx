// resources/js/pages/dashboard.tsx
import { Head, Link } from '@inertiajs/react';
import { 
    ShoppingCart, 
    TrendingUp, 
    Package, 
    Truck, 
    Receipt, 
    Users,
    Box,
    AlertCircle
} from 'lucide-react';

export default function Dashboard() {
    // Standardize date and day formatting
    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'short' }); // Shortened to save space
    const dateFormatted = today.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }); // Removed year for compactness

    // Grid Modules Data - Updated to use Laravel's route() helper mapping to web.php named routes
    const modules = [
        { name: 'Order', icon: ShoppingCart, href: route('orders.index'), color: 'text-blue-600' },
        { name: 'Sales', icon: TrendingUp, href: route('sales.index'), color: 'text-green-600' },
        { name: 'Stock', icon: Package, href: route('inventory.index'), color: 'text-indigo-600' },
        { name: 'Delivery', icon: Truck, href: route('delivery.index'), color: 'text-orange-600' },
        { name: 'Expense', icon: Receipt, href: route('expenses.index'), color: 'text-red-600' },
        { name: 'Employee', icon: Users, href: route('employees.index'), color: 'text-teal-600' },
    ];

    // Example Notice (In a real app, pass this via props)
    const importantNotice = "Pending deliveries: 12 items require your attention today.";

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Head title="Dashboard - Distribo" />

            {/* COMPACT TOP BAR: h-12 (48px) stays touch-friendly but saves space */}
            <header className="bg-white border-b border-gray-200 px-3 h-12 flex items-center justify-between shrink-0 sticky top-0 z-10 shadow-sm">
                {/* Left: Compact Logo & Brand */}
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 text-white p-1 rounded-md">
                        <Box size={18} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-lg font-bold text-gray-900 tracking-tight">Distribo</h1>
                </div>

                {/* Right: Single-line compact Date */}
                <div className="text-right bg-gray-100 px-2 py-1 rounded-md">
                    <p className="text-xs font-bold text-gray-800">
                        {dayName}, {dateFormatted}
                    </p>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-3 w-full max-w-3xl mx-auto">
                
                {/* STATUS / NOTICE SYSTEM: High contrast, prominent, clear language */}
                {importantNotice && (
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-3 mb-4 rounded-r-md flex items-start gap-2 shadow-sm">
                        <AlertCircle size={18} className="text-orange-600 shrink-0 mt-0.5" />
                        <p className="text-sm font-semibold text-orange-900 leading-tight">
                            {importantNotice}
                        </p>
                    </div>
                )}

                {/* GRID SECTION */}
                <div>
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 pl-1">
                        Quick Actions
                    </h2>
                    
                    {/* 3x3 Grid pattern */}
                    <div className="grid grid-cols-3 gap-3">
                        {modules.map((mod) => {
                            const Icon = mod.icon;
                            return (
                                <Link
                                    key={mod.name}
                                    href={mod.href}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 flex flex-col items-center justify-center aspect-square active:bg-gray-100 active:scale-95 transition-transform duration-75 touch-manipulation"
                                >
                                    <div className={`mb-2 p-2.5 rounded-full bg-gray-50 ${mod.color}`}>
                                        <Icon size={24} strokeWidth={2.5} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-800 text-center leading-none">
                                        {mod.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
function route(name: string, params?: Record<string, any>): string {
    const routes: Record<string, string> = {
        'orders.index': '/orders',
        'sales.index': '/sales',
        'inventory.index': '/inventory',
        'delivery.index': '/delivery',
        'expenses.index': '/expenses',
        'employees.index': '/employees',
    };

    let url = routes[name] || '/';
    
    if (params) {
        const query = new URLSearchParams(params).toString();
        url += query ? `?${query}` : '';
    }
    
    return url;
}
