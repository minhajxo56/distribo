// resources/js/pages/components/bottomBreadcrumb.tsx
import { Link } from '@inertiajs/react';
import { Home, ChevronRight } from 'lucide-react';

interface BottomBreadcrumbProps {
    currentPage: string;
}

export default function BottomBreadcrumb({ currentPage }: BottomBreadcrumbProps) {
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-gray-200 px-4 flex items-center z-30 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] pb-safe">
            <div className="flex items-center gap-2 max-w-3xl mx-auto w-full">
                <Link 
                    href="/dashboard" 
                    className="p-2 -ml-2 text-gray-500 active:text-blue-600 active:bg-blue-50 rounded-lg transition-colors touch-manipulation"
                >
                    <Home size={22} strokeWidth={2.5} />
                </Link>
                
                <ChevronRight size={18} className="text-gray-400 shrink-0" strokeWidth={2.5} />
                
                <span className="text-sm font-bold text-gray-900 truncate">
                    {currentPage}
                </span>
            </div>
        </nav>
    );
}