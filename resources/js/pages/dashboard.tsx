import { Head, Link } from '@inertiajs/react';
import { ShoppingCart, TrendingUp, Package, Truck, Receipt, Users, Box, AlertCircle, Wallet, LifeBuoy, Settings, Handshake, Crown, User, Calendar, Calculator } from 'lucide-react';
import { route } from 'ziggy-js';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function Dashboard() {
    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'short' });
    const dateFormatted = today.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });

    const coreModules = [
        { name: 'Order', icon: ShoppingCart, href: route('orders.index'), color: 'text-blue-600', bg: 'bg-blue-50' },
        { name: 'Sales', icon: TrendingUp, href: route('sales.index'), color: 'text-green-600', bg: 'bg-green-50' },
        { name: 'Stock', icon: Package, href: route('inventory.index'), color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { name: 'Delivery', icon: Truck, href: route('delivery.index'), color: 'text-orange-600', bg: 'bg-orange-50' },
        { name: 'Expense', icon: Receipt, href: route('expenses.index'), color: 'text-red-600', bg: 'bg-red-50' },
        { name: 'Employee', icon: Users, href: route('employees.index'), color: 'text-teal-600', bg: 'bg-teal-50' },
        { name: 'Accounting', icon: Wallet, href: route('accounting.index'), color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];

    const additionalModules = [
        { name: 'Support', icon: LifeBuoy, href: route('support.index'), color: 'text-rose-600', bg: 'bg-rose-50' },
        { name: 'Settings', icon: Settings, href: route('settings.index'), color: 'text-slate-600', bg: 'bg-slate-50' },
        { name: 'Partners', icon: Handshake, href: route('partners.index'), color: 'text-purple-600', bg: 'bg-purple-50' },
        { name: 'Premium', icon: Crown, href: route('premium.index'), color: 'text-yellow-600', bg: 'bg-yellow-50' },
        { name: 'My Account', icon: User, href: route('account.index'), color: 'text-cyan-600', bg: 'bg-cyan-50' },
        { name: 'Calendar', icon: Calendar, href: route('calendar.index'), color: 'text-sky-600', bg: 'bg-sky-50' },
        { name: 'Calculator', icon: Calculator, href: route('calculator.index'), color: 'text-fuchsia-600', bg: 'bg-fuchsia-50' },
    ];

    const quickAccess = coreModules.slice(0, 4);
    const importantNotice = "Pending deliveries: 12 items require your attention today.";

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            <Head title="Dashboard - Distribo" />

            <header className="bg-card border-b border-border px-4 h-14 flex items-center justify-between shrink-0 sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
                        <Box size={20} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-xl font-bold text-foreground tracking-tight">Distribo</h1>
                </div>

                <Badge variant="secondary" className="font-bold py-1 px-2">
                    {dayName}, {dateFormatted}
                </Badge>
            </header>

            <main className="flex-1 p-4 w-full max-w-4xl mx-auto space-y-8">
                
                {importantNotice && (
                    <Alert className="bg-orange-50 border-orange-200 text-orange-900 shadow-sm">
                        <AlertCircle className="h-4 w-4 stroke-orange-600" />
                        <AlertTitle className="text-orange-800 font-semibold">Important Notice</AlertTitle>
                        <AlertDescription className="text-sm font-medium">
                            {importantNotice}
                        </AlertDescription>
                    </Alert>
                )}

                <section>
                    <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 pl-1">
                        Quick Access
                    </h2>
                    <div className="grid grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                        {quickAccess.map((mod) => {
                            const Icon = mod.icon;
                            return (
                                <Link key={`quick-${mod.name}`} href={mod.href} className="flex flex-col items-center gap-2.5 group">
                                    <Card className="w-full aspect-square flex items-center justify-center transition-all border-border shadow-sm group-hover:shadow-md group-hover:-translate-y-0.5 group-active:scale-95 group-active:translate-y-0 touch-manipulation rounded-2xl">
                                        <CardContent className="p-0 flex items-center justify-center">
                                            <div className={`p-3.5 rounded-full ${mod.bg} ${mod.color}`}>
                                                <Icon className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={2.5} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <span className="text-xs sm:text-sm font-medium text-foreground text-center leading-tight">
                                        {mod.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                <Separator />

                <section>
                    <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 pl-1">
                        Essentials
                    </h2>
                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4 sm:gap-6">
                        {coreModules.map((mod) => {
                            const Icon = mod.icon;
                            return (
                                <Link key={`core-${mod.name}`} href={mod.href} className="flex flex-col items-center gap-2.5 group">
                                    <Card className="w-full aspect-square flex items-center justify-center transition-all border-border shadow-sm group-hover:shadow-md group-hover:-translate-y-0.5 group-active:scale-95 group-active:translate-y-0 touch-manipulation rounded-2xl">
                                        <CardContent className="p-0 flex items-center justify-center">
                                            <div className={`p-3 rounded-full ${mod.bg} ${mod.color}`}>
                                                <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <span className="text-xs sm:text-sm font-medium text-foreground text-center leading-tight">
                                        {mod.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                <Separator />

                <section>
                    <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 pl-1">
                        More Options
                    </h2>
                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4 sm:gap-6">
                        {additionalModules.map((mod) => {
                            const Icon = mod.icon;
                            return (
                                <Link key={`add-${mod.name}`} href={mod.href} className="flex flex-col items-center gap-2.5 group">
                                    <Card className="w-full aspect-square flex items-center justify-center transition-all border-border shadow-sm group-hover:shadow-md group-hover:-translate-y-0.5 group-active:scale-95 group-active:translate-y-0 touch-manipulation rounded-2xl">
                                        <CardContent className="p-0 flex items-center justify-center">
                                            <div className={`p-3 rounded-full ${mod.bg} ${mod.color}`}>
                                                <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <span className="text-xs sm:text-sm font-medium text-foreground text-center leading-tight">
                                        {mod.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </main>
        </div>
    );
}