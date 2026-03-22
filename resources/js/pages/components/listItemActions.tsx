// resources/js/pages/components/listItemActions.tsx
import { X } from 'lucide-react';

interface ActionItem {
    label: string;
    onClick: () => void;
    type?: 'primary' | 'danger' | 'normal';
    icon?: React.ElementType;
}

interface ListItemActionsProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    actions: ActionItem[];
}

export default function ListItemActions({ isOpen, onClose, title, actions }: ListItemActionsProps) {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/20 z-40 transition-opacity"
                onClick={onClose}
            />
            
            {/* Action Menu (Positioned directly above the 14px (56px) bottom bar) */}
            <div className="fixed bottom-14 left-0 right-0 bg-white rounded-t-xl z-50 shadow-[0_-4px_15px_rgba(0,0,0,0.1)] flex flex-col max-w-3xl mx-auto pb-2 border-t border-gray-200 animate-in slide-in-from-bottom-4 duration-200">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <span className="font-bold text-gray-500 text-sm uppercase tracking-wider">
                        Options: {title}
                    </span>
                    <button onClick={onClose} className="p-1 text-gray-400 active:text-gray-700 rounded-full bg-gray-50 active:bg-gray-200">
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>
                
                <div className="p-2 flex flex-col gap-1">
                    {actions.map((action, idx) => {
                        const Icon = action.icon;
                        const isDanger = action.type === 'danger';
                        const isPrimary = action.type === 'primary';
                        
                        return (
                            <button
                                key={idx}
                                onClick={() => { action.onClick(); onClose(); }}
                                className={`flex items-center gap-3 w-full p-3 rounded-lg text-left font-bold text-base touch-manipulation
                                    ${isDanger ? 'text-red-600 active:bg-red-50' : 
                                      isPrimary ? 'text-blue-600 active:bg-blue-50' : 
                                      'text-gray-800 active:bg-gray-100'}`}
                            >
                                {Icon && <Icon size={20} strokeWidth={2.5} />}
                                {action.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
}