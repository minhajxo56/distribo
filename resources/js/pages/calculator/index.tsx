// resources/js/pages/calculator/index.tsx
import { Head } from '@inertiajs/react';
import TopIndexBar from '../components/topIndexBar';
import BottomBreadcrumb from '../components/bottomBreadcrumb';
import CalculatorUtility from '../components/calculatorUtility';

export default function CalculatorIndex() {
    return (
        <div className="h-screen bg-gray-900 flex flex-col font-sans relative overflow-hidden">
            <Head title="Calculator - Distribo" />

            {/* Dark mode top bar to match the calculator display */}
            <header className="bg-gray-900 border-b border-gray-800 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20 text-white">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold tracking-tight">System Calculator</h1>
                </div>
            </header>

            <main className="flex-1 w-full max-w-md mx-auto flex flex-col relative z-0">
                {/* Passing isStandalone=true hides the modal background and close button, 
                  rendering it perfectly flush inside the container.
                */}
                <CalculatorUtility isStandalone={true} />
            </main>

            <div className="bg-gray-900 border-t border-gray-800">
                <BottomBreadcrumb currentPage="Utilities > Calculator" />
            </div>
        </div>
    );
}