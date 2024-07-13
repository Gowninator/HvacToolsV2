'use client';

import React, { useState, useRef } from 'react';
import './side2.css'; // Tilføj denne linje for at importere CSS-filen
import Link from 'next/link';

const Luftskifte: React.FC = () => {
  //Input konstanter------------------------------------------------------
  const [I_areal, setI_areal] = useState<number | null>(null);
  const [I_højde, setI_højde] = useState<number | null>(null);
  const [I_indBlæsTemp, setI_indBlæsTemp] = useState<number | null>(null);
  const [I_MaksTemp, setI_MaksTemp] = useState<number | null>(null);
  const [I_wattBelast, setI_wattBelast] = useState<number | null>(null);
  const [I_Ubrugt1, setI_Ubrugt1] = useState<number | null>(null);
  
  //Reslutat------------------------------------------------------
  const [result, setResult] = useState<number | null>(null);

  //Beregnigner------------------------------------------------------ 
  const handleCalculate = () => {
    if (I_areal && I_højde && I_indBlæsTemp && I_MaksTemp && I_wattBelast) {
      const deltaT = I_MaksTemp - I_indBlæsTemp;
      const c_p = 1005; // specifik varmekapacitet af luft i J/(kg·K)
      const luftDensitet = 1.2; // kg/m³

      const Q = I_wattBelast / (c_p * deltaT * luftDensitet); // m³/s
      setResult(Q * 3600); // omregning til m³/h
    }
  };


  //Piltaster------------------------------------------------------
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, currentIndex: number) => {
    const inputs = document.querySelectorAll<HTMLInputElement>('.input-field input');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % inputs.length;
      inputs[nextIndex].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + inputs.length) % inputs.length;
      inputs[prevIndex].focus();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'left', gap: '10px' }}>
        <Link href="/">
          <button className='HKnap'>Home</button> 
        </Link>
      </div>
      <p></p>
      <div id="luftskifte-container">
        <h1>Simpel køl</h1>
        <h2>Beregning af luftmængde med køl</h2>
        <div className="input-group">
          {/* _____________Inputfelt 1__________________ */}
          <div className="input-field">
            <label htmlFor="I_areal">indsæt tekst her  (m²): </label>
            <input
              id="I_areal"
              type="number"
              value={I_areal ?? ''}
              onChange={(e) => setI_areal(parseFloat(e.target.value))}
              onKeyDown={(e) => handleKeyDown(e, 0)}
            />
          </div>
          {/* _____________Inputfelt 2__________________ */}
          <div className="input-field">
            <label htmlFor="I_højde">indsæt tekst her (m): </label>
            <input
              id="I_højde"
              type="number"
              value={I_højde ?? ''}
              onChange={(e) => setI_højde(parseFloat(e.target.value))}
              onKeyDown={(e) => handleKeyDown(e, 1)}
            />
          </div>
          {/* _____________Inputfelt 3__________________ */}
          <div className="input-field">
            <label htmlFor="I_indBlæsTemp">indsæt tekst her (°C): </label>
            <input
              id="I_indBlæsTemp"
              type="number"
              value={I_indBlæsTemp ?? ''}
              onChange={(e) => setI_indBlæsTemp(parseFloat(e.target.value))}
              onKeyDown={(e) => handleKeyDown(e, 2)}
            />
          </div>
          {/* _____________Inputfelt 4__________________ */}
          <div className="input-field">
            <label htmlFor="I_MaksTemp">indsæt tekst her (°C): </label>
            <input
              id="I_MaksTemp"
              type="number"
              value={I_MaksTemp ?? ''}
              onChange={(e) => setI_MaksTemp(parseFloat(e.target.value))}
              onKeyDown={(e) => handleKeyDown(e, 3)}
            />
          </div>
          {/* _____________Inputfelt 5__________________ */}
          <div className="input-field">
            <label htmlFor="I_wattBelast">indsæt tekst her (W): </label>
            <input
              id="I_wattBelast"
              type="number"
              value={I_wattBelast ?? ''}
              onChange={(e) => setI_wattBelast(parseFloat(e.target.value))}
              onKeyDown={(e) => handleKeyDown(e, 4)}
            />
          </div>
          {/* _____________Inputfelt 6__________________ */}
          <div className="input-field">
            <label htmlFor="I_Ubrugt1">indsæt tekst her (W): </label>
            <input
              id="I_Ubrugt1"
              type="number"
              value={I_Ubrugt1 ?? ''}
              onChange={(e) => setI_Ubrugt1(parseFloat(e.target.value))}
              onKeyDown={(e) => handleKeyDown(e, 5)}
            />
          </div>

         {/* _____________Beregnknap__________________ */} 
          <button onClick={handleCalculate} className="calculate-button">Beregn luftmængde</button>
          {result !== null && (
            <div className="result">
              <h2>Nødvendige luftmængde: {result.toFixed(2)} m³/h</h2>
            </div>
          )}
        </div>  
      </div>
    </div>
  );
};

export default Luftskifte;
