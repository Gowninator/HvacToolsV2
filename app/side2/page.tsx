'use client';

import React, { useState, useRef } from 'react';
import './Co2-kon.css'; // Tilføj denne linje for at importere CSS-filen
import Link from 'next/link';



const Luftskifte: React.FC = () => {
  //Input konstanter------------------------------------------------------
  const [I_Personer, setI_Personer] = useState<number | null>(null);
  const [I_MET, setI_MET] = useState<number | null>(null);
  const [I_StartPPM, setI_StartPPM] = useState<number | null>(null);
  const [I_Areal, setI_Areal] = useState<number | null>(null);
  const [I_Rumhøjde, setI_Rumhøjde] = useState<number | null>(null);
  const [I_Luftmængde, setI_Luftmængde] = useState<number | null>(null);
  //const [I_Ubrugt2, setI_Ubrugt2] = useState<number | null>(null);
  //const [I_Ubrugt3, setI_Ubrugt3] = useState<number | null>(null);


  //Reslutat------------------------------------------------------
  const [result, setResult] = useState<number | null>(null);

  //Beregnigner------------------------------------------------------ 
  //if sikre at der er tal i alle felt og at de ikker null
  const handleCalculate = () => {
    if (I_Areal && I_MET && I_StartPPM && I_Personer && I_Rumhøjde && I_Luftmængde) {
      
      const M_Co2 = (17*I_MET/1000); //[m3/h pr. per]
      const M_Volumen = (I_Areal*I_Rumhøjde);
      const M_LuftSkift = (I_Luftmængde/M_Volumen);
      const M_flow = (I_Luftmængde/3.6); //[m3/h --> l/s]
      const M_Tid = 1;
      const C_co2 = 400;

      const R_co2 = (
    
        (M_Co2*I_Personer/(M_LuftSkift*M_Volumen)*(1-(Math.exp(-M_LuftSkift*M_Tid)))+(I_StartPPM/1000000-C_co2/1000000)*
        Math.exp(-M_LuftSkift*M_Tid))*1000000+C_co2  

      
    ); // m³/s

      setResult(R_co2); // omregning til m³/h
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
        <h1>CO2-koncentration</h1>
        <h2>Beregningsmetode efter DS 447:2021 Anneks D: <br />
        Dynamisk beregning af koncentrationer af forureninger <br />
        </h2>
        <div className="input-group">
          {/* _____________Inputfelt 1__________________ */}
          <div className="input-field">
            <label htmlFor="I_Personer">Antal Voksne (stk): </label>
            <input
              id="I_Personer"
              type="number"
              value={I_Personer ?? ''}
              onChange={(e) => setI_Personer(parseFloat(e.target.value))}
              onKeyDown={(e) => handleKeyDown(e, 0)}
            />
          </div>
          {/* _____________Inputfelt 2__________________ */}
          <div className="input-field">
            <label htmlFor="I_MET">Aktivitetsniveau (MET): </label>
            <input
              id="I_MET"
              type="number"
              value={I_MET ?? ''}
              onChange={(e) => setI_MET(parseFloat(e.target.value))}
              onKeyDown={(e) => handleKeyDown(e, 1)}
            />
          </div>
          {/* _____________Inputfelt 3__________________ */}
          <div className="input-field">
            <label htmlFor="I_StartPPM">Begyndelseskoncentration (PPM): </label>
            <input
              id="I_StartPPM"
              type="number"
              value={I_StartPPM ?? ''}
              onChange={(e) => setI_StartPPM(parseFloat(e.target.value))}
              onKeyDown={(e) => handleKeyDown(e, 2)}
            />
          </div>
          {/* _____________Inputfelt 4__________________ */}
          <div className="input-field">
            <label htmlFor="I_Areal">Areal (m²): </label>
            <input
              id="I_Areal"
              type="number"
              value={I_Areal ?? ''}
              onChange={(e) => setI_Areal(parseFloat(e.target.value))}
              onKeyDown={(e) => handleKeyDown(e, 3)}
            />
          </div>
          {/* _____________Inputfelt 5__________________ */}
          <div className="input-field">
            <label htmlFor="I_Rumhøjde">Rumhøjde (m): </label>
            <input
              id="I_Rumhøjde"
              type="number"
              value={I_Rumhøjde ?? ''}
              onChange={(e) => setI_Rumhøjde(parseFloat(e.target.value))}
              onKeyDown={(e) => handleKeyDown(e, 4)}
            />
          </div>
          {/* _____________Inputfelt 6__________________ */}
          <div className="input-field">
            <label htmlFor="I_Luftmængde">Luftmængde(m³/h): </label>
            <input
              id="I_Luftmængde"
              type="number"
              value={I_Luftmængde ?? ''}
              onChange={(e) => setI_Luftmængde(parseFloat(e.target.value))}
              onKeyDown={(e) => handleKeyDown(e, 5)}
            />
          </div>

         {/* _____________Beregnknap__________________ */} 
          <button onClick={handleCalculate} className="calculate-button">Beregn luftmængde</button>
          {result !== null && (
            <div className="result">
              <h2>CO2-koncentration efter 1 time: {result.toFixed(0)} ppm</h2>
            </div>
          )}
        </div>  
      </div>
    </div>
  );
};

export default Luftskifte;
