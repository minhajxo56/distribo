// resources/js/pages/account/components/documentManager.tsx
import { useState } from 'react';
import { ChevronLeft, Upload, FileText, Trash2, CheckCircle } from 'lucide-react';
import BottomBreadcrumb from '../../components/bottomBreadcrumb';

export default function DocumentManager({ onClose }: any) {
    const [documents, setDocuments] = useState([
        { id: 1, name: 'National_ID_Front.jpg', type: 'ID Proof', date: '12 Jan 2026' },
        { id: 2, name: 'Trade_License_2026.pdf', type: 'Business Doc', date: '15 Feb 2026' },
    ]);

    const handleDelete = (id: number) => {
        setDocuments(documents.filter(doc => doc.id !== id));
    };

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans animate-in slide-in-from-right-4 duration-200">
            <header className="bg-white border-b border-gray-200 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full touch-manipulation">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">My Documents</h1>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-10 w-full max-w-3xl mx-auto p-4 flex flex-col gap-5">
                
                <button className="w-full py-6 border-2 border-dashed border-blue-300 bg-blue-50/50 text-blue-700 rounded-xl font-bold text-base flex flex-col items-center justify-center gap-2 active:bg-blue-100 touch-manipulation">
                    <Upload size={32} strokeWidth={2} />
                    <span>Tap to Upload New Document</span>
                    <span className="text-xs font-normal text-gray-500">PDF, JPG, PNG (Max 5MB)</span>
                </button>

                <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 pl-1">Uploaded Files</h3>
                    <div className="flex flex-col gap-3">
                        {documents.map(doc => (
                            <div key={doc.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
                                <div className="flex items-start gap-3">
                                    <div className="bg-gray-100 p-2.5 rounded-lg text-gray-600 shrink-0">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-base leading-tight mb-1 break-all pr-2">{doc.name}</h4>
                                        <p className="text-xs font-bold text-gray-500">{doc.type} • {doc.date}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleDelete(doc.id)} className="p-2 bg-red-50 text-red-600 rounded-lg active:bg-red-100 shrink-0 touch-manipulation">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
            <BottomBreadcrumb currentPage="My Account > Documents" />
        </div>
    );
}