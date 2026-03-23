// resources/js/pages/settings/index.tsx
import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Globe, Moon, Sun, CheckCircle, Settings as SettingsIcon, Save } from 'lucide-react';

import TopIndexBar from '../components/topIndexBar';
import BottomBreadcrumb from '../components/bottomBreadcrumb';

export default function SettingsIndex() {
    // Load initial states (simulating persistence/loading from DB or LocalStorage)
    const [language, setLanguage] = useState<'English' | 'Bangla'>('English');
    const [theme, setTheme] = useState<'Light' | 'Dark'>('Light');
    const [isSaving, setIsSaving] = useState(false);

    // Simulate saving preferences
    const handleSaveSettings = () => {
        setIsSaving(true);
        const payload = { language, theme };
        console.log("Settings Saved Globally:", payload);
        
        // Simulate API delay and success feedback
        setTimeout(() => {
            setIsSaving(false);
            alert("Settings saved successfully! (In production, this triggers a toast)");
        }, 600);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
            <Head title="Settings - Distribo" />

            <TopIndexBar 
                title="System Settings" 
                actionLabel="" 
                onActionClick={() => {}} 
                isFilterActive={false}
            />

            <main className="flex-1 w-full max-w-3xl mx-auto flex flex-col gap-6 p-4 pb-32">
                
                {/* 1. LANGUAGE SETTINGS */}
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <Globe size={20} className="text-gray-500" />
                        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Language Preference</h2>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        {/* English Option */}
                        <button
                            onClick={() => setLanguage('English')}
                            className={`w-full p-4 rounded-xl border-2 flex items-center justify-between touch-manipulation transition-colors ${
                                language === 'English' 
                                    ? 'bg-blue-50 border-blue-600' 
                                    : 'bg-white border-gray-200 active:bg-gray-100'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">🇬🇧</span>
                                <span className={`text-lg font-bold ${language === 'English' ? 'text-blue-900' : 'text-gray-900'}`}>
                                    English
                                </span>
                            </div>
                            {language === 'English' && <CheckCircle size={24} className="text-blue-600" strokeWidth={2.5} />}
                        </button>

                        {/* Bangla Option */}
                        <button
                            onClick={() => setLanguage('Bangla')}
                            className={`w-full p-4 rounded-xl border-2 flex items-center justify-between touch-manipulation transition-colors ${
                                language === 'Bangla' 
                                    ? 'bg-green-50 border-green-600' 
                                    : 'bg-white border-gray-200 active:bg-gray-100'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">🇧🇩</span>
                                <div className="text-left">
                                    <span className={`block text-lg font-bold ${language === 'Bangla' ? 'text-green-900' : 'text-gray-900'}`}>
                                        বাংলা
                                    </span>
                                    <span className="text-sm font-bold text-gray-500">Bangla</span>
                                </div>
                            </div>
                            {language === 'Bangla' && <CheckCircle size={24} className="text-green-600" strokeWidth={2.5} />}
                        </button>
                    </div>
                </section>

                {/* 2. THEME SETTINGS */}
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <SettingsIcon size={20} className="text-gray-500" />
                        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Appearance (Theme)</h2>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        {/* Light Mode */}
                        <button
                            onClick={() => setTheme('Light')}
                            className={`w-full p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 touch-manipulation transition-colors ${
                                theme === 'Light' 
                                    ? 'bg-blue-50 border-blue-600 shadow-sm' 
                                    : 'bg-white border-gray-200 active:bg-gray-100'
                            }`}
                        >
                            <Sun size={32} className={theme === 'Light' ? 'text-blue-600' : 'text-gray-400'} strokeWidth={2} />
                            <span className={`text-base font-bold ${theme === 'Light' ? 'text-blue-900' : 'text-gray-700'}`}>
                                Light Mode
                            </span>
                        </button>

                        {/* Dark Mode */}
                        <button
                            onClick={() => setTheme('Dark')}
                            className={`w-full p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 touch-manipulation transition-colors ${
                                theme === 'Dark' 
                                    ? 'bg-gray-900 border-gray-900 shadow-sm' 
                                    : 'bg-white border-gray-200 active:bg-gray-100'
                            }`}
                        >
                            <Moon size={32} className={theme === 'Dark' ? 'text-white' : 'text-gray-400'} strokeWidth={2} />
                            <span className={`text-base font-bold ${theme === 'Dark' ? 'text-white' : 'text-gray-700'}`}>
                                Dark Mode
                            </span>
                        </button>
                    </div>
                </section>

                {/* 3. SYSTEM DEFAULTS (Read-Only Info for standard users) */}
                <section className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-700 mb-2">System Information</h3>
                    <div className="flex flex-col gap-2 border-t border-gray-100 pt-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-gray-500 uppercase">System Default Language</span>
                            <span className="text-sm font-bold text-gray-900">English</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-gray-500 uppercase">App Version</span>
                            <span className="text-sm font-bold text-gray-900">v1.0.0</span>
                        </div>
                    </div>
                </section>

            </main>

            {/* FIXED BOTTOM ACTION BAR */}
            <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">
                <div className="max-w-3xl mx-auto w-full">
                    <button 
                        onClick={handleSaveSettings}
                        disabled={isSaving}
                        className="w-full py-4 bg-blue-600 active:bg-blue-700 disabled:bg-gray-400 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 touch-manipulation shadow-sm transition-colors"
                    >
                        {isSaving ? (
                            <span className="animate-pulse">Saving Preferences...</span>
                        ) : (
                            <>
                                <Save size={22} strokeWidth={3} />
                                Apply & Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>

            <BottomBreadcrumb currentPage="Settings" />
        </div>
    );
}