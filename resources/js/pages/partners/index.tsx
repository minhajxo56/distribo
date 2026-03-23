// resources/js/pages/partners/index.tsx
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Plus, UserCheck, Edit, Trash2 } from 'lucide-react';

import TopIndexBar from '../components/topIndexBar';
import BottomBreadcrumb from '../components/bottomBreadcrumb';
import ListItemActions from '../components/listItemActions';

import PartnerFilter from './components/partnerFilter';
import PartnerList from './components/partnerList';
import PartnerForm from './components/partnerForm';
import PartnerProfile from './components/partnerProfile';

const dummyPartners = [
    { id: '1', code: 'PRT-101', name: 'Hasan Builders', phone: '01711223344', type: 'Shop' as const, status: 'Active' as const, address: 'Mirpur 10' },
    { id: '2', code: 'PRT-102', name: 'Premier Cement', phone: '01822334455', type: 'Vendor' as const, status: 'Active' as const, address: 'Gulshan' },
    { id: '3', code: 'PRT-103', name: 'Rahim Store', phone: '01933445566', type: 'Shop' as const, status: 'Inactive' as const, address: 'Dhanmondi' },
];

export default function PartnersIndex() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    // Bottom Action Sheets
    const [isActionOpen, setIsActionOpen] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState<any>(null);
    
    // Modals
    const [showPartnerForm, setShowPartnerForm] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const isAnyModalOpen = showPartnerForm || showProfile;

    const handleRowClick = (partner: any) => {
        setSelectedPartner(partner);
        setIsActionOpen(true);
    };

    const handleAddClick = () => {
        setIsEditMode(false);
        setSelectedPartner(null);
        setShowPartnerForm(true);
    };

    const handleEditClick = () => {
        setIsActionOpen(false);
        setShowProfile(false);
        setIsEditMode(true);
        setShowPartnerForm(true);
    };

    const actionItems = [
        { label: 'View Profile & History', icon: UserCheck, onClick: () => { setIsActionOpen(false); setShowProfile(true); }, type: 'primary' as const },
        { label: 'Edit Partner Details', icon: Edit, onClick: handleEditClick },
        { label: selectedPartner?.status === 'Active' ? 'Deactivate Partner' : 'Activate Partner', icon: Trash2, onClick: () => console.log('Toggle Status', selectedPartner?.id), type: 'danger' as const },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
            <Head title="Partners - Distribo" />

            <TopIndexBar 
                title="Business Partners" 
                actionLabel="Filter" 
                onActionClick={() => setIsFilterOpen(!isFilterOpen)} 
                isFilterActive={isFilterOpen}
            />

            <main className="flex-1 w-full max-w-3xl mx-auto flex flex-col relative z-0">
                {isFilterOpen && (
                    <div className="animate-in slide-in-from-top-2 duration-200 z-20">
                        <PartnerFilter />
                    </div>
                )}
                
                <div className="z-10">
                    <PartnerList partners={dummyPartners} onRowClick={handleRowClick} />
                </div>
            </main>

            {!isAnyModalOpen && (
                <button
                    onClick={handleAddClick}
                    className="fixed bottom-20 right-4 bg-indigo-600 active:bg-indigo-700 text-white px-5 py-3.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.25)] z-30 touch-manipulation transition-transform active:scale-95 flex items-center gap-2 font-bold text-base"
                >
                    <Plus size={22} strokeWidth={3} />
                    Add Partner
                </button>
            )}

            <ListItemActions 
                isOpen={isActionOpen} 
                onClose={() => setIsActionOpen(false)} 
                title={selectedPartner ? selectedPartner.name : ''} 
                actions={actionItems} 
            />

            <BottomBreadcrumb currentPage="Partners" />

            {/* FULL SCREEN MODALS */}
            {showPartnerForm && (
                <PartnerForm 
                    isEdit={isEditMode} 
                    initialData={isEditMode ? selectedPartner : null} 
                    onClose={() => setShowPartnerForm(false)} 
                />
            )}
            
            {showProfile && (
                <PartnerProfile 
                    partner={selectedPartner} 
                    onClose={() => setShowProfile(false)} 
                    onEdit={handleEditClick}
                />
            )}
        </div>
    );
}