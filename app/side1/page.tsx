'use client';

import React, { useState, useRef } from 'react';
import './luftskifte.css'; // Tilføj denne linje for at importere CSS-filen
import Link from 'next/link';

const Luftskifte: React.FC = () => {
  const [areal, setAreal] = useState<number | null>(null);
  const [højde, setHøjde] = useState<number | null>(null);
  const [indblæsningTemp, setIndblæsningTemp] = useState<number | null>(null);
  const [maksTemp, setMaksTemp] = useState<number | null>(null);
  const [wattBelasting, setWattBelasting] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);

  const arealRef = useRef<HTMLInputElement>(null);
  const højdeRef = useRef<HTMLInputElement>(null);
  const indblæsningTempRef = useRef<HTMLInputElement>(null);
  const maksTempRef = useRef<HTMLInputElement>(null);
  const wattBelastingRef = useRef<HTMLInputElement>(null);

  const refs = [arealRef, højdeRef, indblæsningTempRef, maksTempRef, wattBelastingRef];

  const handleCalculate = () => {
    if (areal && højde && indblæsningTemp && maksTemp && wattBelasting) {
      const deltaT = maksTemp - indblæsningTemp;
      const c_p = 1005; // specifik varmekapacitet af luft i J/(kg·K)
      const luftDensitet = 1.2; // kg/m³

      const Q = wattBelasting / (c_p * deltaT * luftDensitet); // m³/s
      setResult(Q * 3600); // omregning til m³/h
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, refs: React.RefObject<HTMLInputElement>[], currentIndex: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % refs.length;
      refs[nextIndex].current?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + refs.length) % refs.length;
      refs[prevIndex].current?.focus();
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
          <div className="input-field">
            <label htmlFor="areal">Areal (m²): </label>
            <input
              id="areal"
              type="number"
              value={areal ?? ''}
              onChange={(e) => setAreal(parseFloat(e.target.value))}
              onKeyDown={(e) => handleKeyDown(e, refs, 0)}
              ref={arealRef}
            />
          </div>
          <div className="input-field">
            <label htmlFor="højde">Lofthøjde (m): </label>
            <input
              id="højde"
              type="number"
              value={højde ?? ''}
              onChange={(e) => setHøjde(parseFloat(e.target.value))}
              onKeyDown={(e) => handleKeyDown(e, refs, 1)}
              ref={højdeRef}
            />
          </div>
          <div className="input-field">
            <label htmlFor="indblæsningTemp">Indblæsningstemperatur (°C): </label>
            <input
              id="indblæsningTemp"
              type="number"
              value={indblæsningTemp ?? ''}
              onChange={(e) => setIndblæsningTemp(parseFloat(e.target.value))}
              onKeyDown={(e) => handleKeyDown(e, refs, 2)}
              ref={indblæsningTempRef}
            />
          </div>
          <div className="input-field">
            <label htmlFor="maksTemp">Maks temperatur (°C): </label>
            <input
              id="maksTemp"
              type="number"
              value={maksTemp ?? ''}
              onChange={(e) => setMaksTemp(parseFloat(e.target.value))}
              onKeyDown={(e) => handleKeyDown(e, refs, 3)}
              ref={maksTempRef}
            />
          </div>
          <div className="input-field">
            <label htmlFor="wattBelasting">Watt Belastning (W): </label>
            <input
              id="wattBelasting"
              type="number"
              value={wattBelasting ?? ''}
              onChange={(e) => setWattBelasting(parseFloat(e.target.value))}
              onKeyDown={(e) => handleKeyDown(e, refs, 4)}
              ref={wattBelastingRef}
            />
          </div>
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
