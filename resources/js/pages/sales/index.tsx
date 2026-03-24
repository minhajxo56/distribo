// resources/js/pages/sales/index.tsx
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Edit, Trash2, CheckCircle, FileText, Plus } from 'lucide-react'; 

import TopIndexBar from '../components/topIndexBar';
import BottomBreadcrumb from '../components/bottomBreadcrumb';
import ListItemActions from '../components/listItemActions';

import SaleTableFilter from './components/saleTableFilter';
import SaleListTable from './components/saleListTable';
import SaleForm from './components/saleForm';

// Dummy Sales Data
const dummySales = [
    { id: '5012', customer: 'Hasan Builders', amount: '1,50,000', status: 'Due' as const, date: 'Today, 02:15 PM' },
    { id: '5011', customer: 'Walk-in Customer', amount: '3,200', status: 'Paid' as const, date: 'Today, 11:30 AM' },
    { id: '5010', customer: 'Al-Amin Traders', amount: '85,000', status: 'Paid' as const, date: 'Yesterday' },
];

export default function SalesIndex() {
    const [isFilterOpen, setIsFilterOpen] = useState(false); 
    const [isActionOpen, setIsActionOpen] = useState(false);
    const [selectedSale, setSelectedSale] = useState<any>(null);
    
    const [showSaleForm, setShowSaleForm] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleCreateSale = () => {
        setIsEditMode(false);
        setSelectedSale(null);
        setShowSaleForm(true);
    };

    const handleEditSale = () => {
        setIsEditMode(true);
        setIsActionOpen(false);
        setShowSaleForm(true);
    };

    const handleRowClick = (sale: any) => {
        setSelectedSale(sale);
        setIsActionOpen(true);
    };

    const actionItems = [
        { label: 'View Invoice', icon: FileText, onClick: () => console.log('View', selectedSale?.id), type: 'primary' as const },
        { label: 'Receive Due Payment', icon: CheckCircle, onClick: () => console.log('Pay', selectedSale?.id) },
        { label: 'Edit Sale', icon: Edit, onClick: handleEditSale },
        { label: 'Void Sale', icon: Trash2, onClick: () => console.log('Delete', selectedSale?.id), type: 'danger' as const },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
            <Head title="Sales - Distribo" />

            <TopIndexBar 
                title="Sales" 
                actionLabel="Filter" 
                onActionClick={() => setIsFilterOpen(!isFilterOpen)} 
                isFilterActive={isFilterOpen}
            />

            <main className="flex-1 w-full max-w-3xl mx-auto flex flex-col relative">
                {isFilterOpen && (
                    <div className="animate-in slide-in-from-top-2 duration-200">
                        <SaleTableFilter />
                    </div>
                )}
                
                <SaleListTable 
                    sales={dummySales} 
                    onRowClick={handleRowClick} 
                />
            </main>

            {!showSaleForm && (
                <button
                    onClick={handleCreateSale}
                    className="fixed bottom-20 right-4 bg-green-600 active:bg-green-700 text-white px-5 py-3.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.25)] z-30 touch-manipulation transition-transform active:scale-95 flex items-center gap-2 font-bold text-base"
                >
                    <Plus size={22} strokeWidth={3} />
                    Create Sale
                </button>
            )}

            <ListItemActions 
                isOpen={isActionOpen}
                onClose={() => setIsActionOpen(false)}
                title={selectedSale ? `Sale SA-${selectedSale.id}` : ''}
                actions={actionItems}
            />

            <BottomBreadcrumb currentPage="Sales" />

            {showSaleForm && (
                <SaleForm 
                    isEdit={isEditMode}
                    initialData={isEditMode ? selectedSale : null}
                    onClose={() => setShowSaleForm(false)} 
                />
            )}
        </div>
    );
}