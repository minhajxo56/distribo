// resources/js/pages/components/calculatorUtility.tsx
import { useState, useEffect, useCallback } from 'react';

interface CalculatorUtilityProps {
    onClose?: () => void;
    onUseResult?: (result: string) => void;
    isStandalone?: boolean;
}

export default function CalculatorUtility({ onClose, onUseResult, isStandalone = false }: CalculatorUtilityProps) {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('0');

    // Evaluate safely
    const evaluate = useCallback((expr: string) => {
        try {
            if (!expr) return '0';
            const sanitized = expr.replace(/×/g, '*').replace(/÷/g, '/');
            const evalResult = eval(sanitized);
            if (!isFinite(evalResult) || Number.isNaN(evalResult)) return 'Error';
            return parseFloat(evalResult.toFixed(8)).toString();
        } catch {
            return 'Error';
        }
    }, []);

    const handleInput = (val: string) => {
        if (result === 'Error') setResult('0');
        setExpression(prev => prev + val);
    };

    const handleClear = () => {
        setExpression('');
        setResult('0');
    };

    const handleBackspace = () => {
        setExpression(prev => prev.slice(0, -1));
    };

    const handleEquals = () => {
        const res = evaluate(expression);
        setResult(res);
        setExpression('');
    };

    const buttons = [
        ['C', '⌫', '%', '÷'],
        ['7', '8', '9', '×'],
        ['4', '5', '6', '−'],
        ['1', '2', '3', '+'],
        ['00', '0', '.', '=']
    ];

    const handleButtonClick = (val: string) => {
        switch(val) {
            case 'C': handleClear(); break;
            case '⌫': handleBackspace(); break;
            case '=': handleEquals(); break;
            default: handleInput(val); break;
        }
    };

    return (
        <div className={`flex flex-col w-full max-w-xs mx-auto font-sans ${isStandalone ? 'h-full' : 'fixed inset-0 z-50 bg-gray-900/60 flex items-center justify-center'}`}>
            
            <div className="bg-gray-800 text-white rounded-xl shadow-lg w-full">
                {/* Display */}
                <div className="px-4 py-6 text-right text-4xl font-light min-h-[80px] break-all">
                    <div className="text-gray-400 text-lg">{expression}</div>
                    <div>{result}</div>
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-4 gap-2 p-2 bg-gray-700 rounded-b-xl">
                    {buttons.flat().map((btn, idx) => {
                        const isOp = ['+', '−', '×', '÷', '='].includes(btn);
                        const bg = btn === '=' ? 'bg-blue-600 text-white' :
                                   isOp ? 'bg-gray-500 text-white' :
                                   btn === 'C' ? 'bg-red-500 text-white' : 'bg-gray-300 text-black';
                        return (
                            <button
                                key={idx}
                                onClick={() => handleButtonClick(btn)}
                                className={`py-4 text-2xl font-medium rounded-lg ${bg} active:scale-95 transition-transform`}
                            >
                                {btn}
                            </button>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}