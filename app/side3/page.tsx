'use client';

import { useState } from 'react';
import './side3.css'; // Import CSS file

const MyComponent = () => {
  const [selectedAorB, setSelectedAorB] = useState<string | null>(null);
  const [selectedCorDorF, setSelectedCorDorF] = useState<string | null>(null);
  const [valueAorB, setValueAorB] = useState<number | null>(null);
  const [valueCorDorF, setValueCorDorF] = useState<number | null>(null);
  const [result1, setResult1] = useState<number | null>(null);
  const [result2, setResult2] = useState<number | null>(null);

  const handleAorBClick = (value: string) => {
    setSelectedAorB(value);
    setValueAorB(null); // Clear the input value when a new constant is selected
  };

  const handleCorDorFClick = (value: string) => {
    setSelectedCorDorF(value);
    setValueCorDorF(null); // Clear the input value when a new constant is selected
  };

  const calculate = () => {
    if (selectedAorB && selectedCorDorF && valueAorB !== null && valueCorDorF !== null) {
      let calculation1 = 0;
      let calculation2 = 0;

      switch (selectedAorB + selectedCorDorF) {
        case 'AC':
          calculation1 = valueAorB * valueCorDorF * 2; // Example calculation
          calculation2 = valueAorB * valueCorDorF * 3; // Example calculation
          break;
        case 'AD':
          calculation1 = valueAorB * valueCorDorF * 4; // Example calculation
          calculation2 = valueAorB * valueCorDorF * 5; // Example calculation
          break;
        case 'AF':
          calculation1 = valueAorB * valueCorDorF * 6; // Example calculation
          calculation2 = valueAorB * valueCorDorF * 7; // Example calculation
          break;
        case 'BC':
          calculation1 = valueAorB * valueCorDorF * 8; // Example calculation
          calculation2 = valueAorB * valueCorDorF * 9; // Example calculation
          break;
        case 'BD':
          calculation1 = valueAorB * valueCorDorF * 10; // Example calculation
          calculation2 = valueAorB * valueCorDorF * 11; // Example calculation
          break;
        case 'BF':
          calculation1 = valueAorB * valueCorDorF * 12; // Example calculation
          calculation2 = valueAorB * valueCorDorF * 13; // Example calculation
          break;
        default:
          calculation1 = 0;
          calculation2 = 0;
          break;
      }

      setResult1(calculation1);
      setResult2(calculation2);
    }
  };

  return (
    <div className="container">
      <div>
        <button
          onClick={() => handleAorBClick('A')}
          style={{ backgroundColor: selectedAorB === 'A' ? 'green' : 'initial' }}
        >
          Knap A
        </button>
        <button
          onClick={() => handleAorBClick('B')}
          style={{ backgroundColor: selectedAorB === 'B' ? 'green' : 'initial' }}
        >
          Knap B
        </button>
      </div>

      <div>
        <button
          onClick={() => handleCorDorFClick('C')}
          style={{ backgroundColor: selectedCorDorF === 'C' ? 'green' : 'initial' }}
        >
          Knap C
        </button>
        <button
          onClick={() => handleCorDorFClick('D')}
          style={{ backgroundColor: selectedCorDorF === 'D' ? 'green' : 'initial' }}
        >
          Knap D
        </button>
        <button
          onClick={() => handleCorDorFClick('F')}
          style={{ backgroundColor: selectedCorDorF === 'F' ? 'green' : 'initial' }}
        >
          Knap F
        </button>
      </div>

      <div>
        <input 
          value={valueAorB !== null ? valueAorB : ''} 
          onChange={(e) => setValueAorB(parseFloat(e.target.value) || null)} 
          placeholder="A/B værdi" 
        />
        <input 
          value={valueCorDorF !== null ? valueCorDorF : ''} 
          onChange={(e) => setValueCorDorF(parseFloat(e.target.value) || null)} 
          placeholder="C/D/F værdi" 
        />
      </div>

      <button className="calculate" onClick={calculate}>Beregn</button>

      <div className="results">
        <p>Resultat 1: {result1 !== null ? result1 : ''}</p>
        <p>Resultat 2: {result2 !== null ? result2 : ''}</p>
      </div>
    </div>
  );
};

export default MyComponent;
