import React, { useState } from 'react';
import { Equal, Delete, Plus, Minus, X, Divide, RefreshCcw } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setIsNewNumber(true);
  };

  const calculate = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(Number(result.toFixed(8))));
      setEquation('');
      setIsNewNumber(true);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
      setIsNewNumber(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setIsNewNumber(true);
  };

  const deleteLastDigit = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setIsNewNumber(true);
    }
  };

  const Button = ({ children, onClick, className = '' }: any) => (
    <button
      onClick={onClick}
      className={`h-16 transition-all duration-200 rounded-xl text-lg font-medium 
      hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-800/50 p-6 rounded-2xl backdrop-blur-xl shadow-2xl w-full max-w-xs">
        <div className="mb-4">
          <div className="text-gray-400 text-right h-6 text-sm">{equation}</div>
          <div className="text-white text-right text-4xl font-light tracking-wider h-12 overflow-hidden">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          <Button onClick={clear} className="bg-red-500/20 text-red-500 hover:bg-red-500/30">
            <RefreshCcw size={20} className="mx-auto" />
          </Button>
          <Button onClick={deleteLastDigit} className="bg-orange-500/20 text-orange-500 hover:bg-orange-500/30">
            <Delete size={20} className="mx-auto" />
          </Button>
          <Button onClick={() => handleOperator('/')} className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30">
            <Divide size={20} className="mx-auto" />
          </Button>
          <Button onClick={() => handleOperator('*')} className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30">
            <X size={20} className="mx-auto" />
          </Button>

          {[7, 8, 9].map(num => (
            <Button 
              key={num} 
              onClick={() => handleNumber(num.toString())}
              className="bg-gray-700/50 text-white hover:bg-gray-700/70"
            >
              {num}
            </Button>
          ))}
          <Button onClick={() => handleOperator('-')} className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30">
            <Minus size={20} className="mx-auto" />
          </Button>

          {[4, 5, 6].map(num => (
            <Button 
              key={num} 
              onClick={() => handleNumber(num.toString())}
              className="bg-gray-700/50 text-white hover:bg-gray-700/70"
            >
              {num}
            </Button>
          ))}
          <Button onClick={() => handleOperator('+')} className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30">
            <Plus size={20} className="mx-auto" />
          </Button>

          {[1, 2, 3].map(num => (
            <Button 
              key={num} 
              onClick={() => handleNumber(num.toString())}
              className="bg-gray-700/50 text-white hover:bg-gray-700/70"
            >
              {num}
            </Button>
          ))}
          <Button 
            onClick={calculate} 
            className="bg-green-500 text-white hover:bg-green-600 row-span-2"
          >
            <Equal size={20} className="mx-auto" />
          </Button>

          <Button 
            onClick={() => handleNumber('0')} 
            className="bg-gray-700/50 text-white hover:bg-gray-700/70 col-span-2"
          >
            0
          </Button>
          <Button 
            onClick={() => handleNumber('.')} 
            className="bg-gray-700/50 text-white hover:bg-gray-700/70"
          >
            .
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;