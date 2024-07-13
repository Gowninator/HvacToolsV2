'use client';
import React, { useState } from 'react';

// Definer konstanterne for Drejeskive
const Drejeskive = {
  cnst_A: 0.01205,
  cnst_B: -1.194,
  cnst_C: 1.8,
  cnst_D: 2827,
  cnst_E: -4.794
};

const MyComponent: React.FC = () => {
  const [selection1, setSelection1] = useState<string | null>(null); // Ø eller AxB
  const [selection2, setSelection2] = useState<string | null>(null); // V, Q eller DP
  const [inputs, setInputs] = useState<{ A?: string; B?: string; CIR?: string; V?: string; Q?: string; DP?: string }>({});

  const handleSelection1 = (value: string) => {
    setSelection1(value);
    setSelection2(null); // Nulstil valg af V, Q eller DP når Ø eller AxB vælges
    setInputs({}); // Nulstil inputfelter
  };

  const handleSelection2 = (value: string) => {
    setSelection2(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [id]: value }));
  };

  const calculateResults = () => {
    const { A, B, CIR, V, Q, DP } = inputs;

    let resultV = '';
    let resultQ = '';
    let resultDP = '';

    if (selection1 && selection2) {
      switch (selection1) {
        case 'CIR':
          switch (selection2) {
            case 'V':
              resultDP = (Drejeskive.cnst_A * Math.pow(parseFloat(CIR!) / 1000, Drejeskive.cnst_B) * Math.pow(parseFloat(V!), Drejeskive.cnst_C)).toFixed(2);
              resultQ = (Drejeskive.cnst_D * Math.pow(parseFloat(CIR!) / 1000, 2) * parseFloat(V!)).toFixed(0);
              break;
            case 'Q':
              resultV = (parseFloat(Q!) / (Drejeskive.cnst_D * Math.pow(parseFloat(CIR!) / 1000, 2))).toFixed(2);
              resultDP = (Drejeskive.cnst_A * Math.pow(parseFloat(CIR!) / 1000, Drejeskive.cnst_E) * Math.pow(parseFloat(Q!) / Drejeskive.cnst_D, Drejeskive.cnst_C)).toFixed(2);
              break;
            case 'DP':
              resultV = (parseFloat(DP!) / (Drejeskive.cnst_A * Math.pow(parseFloat(CIR!) / 1000, Drejeskive.cnst_B))).toFixed(2);
              resultQ = (Drejeskive.cnst_D * Math.pow(parseFloat(CIR!) / 1000, 2 - Drejeskive.cnst_B / Drejeskive.cnst_C) * Math.pow(parseFloat(DP!) / Drejeskive.cnst_A, 1 / Drejeskive.cnst_C)).toFixed(0);
              break;
            default:
              break;
          }
          break;
        case 'AxB':
          switch (selection2) {
            case 'V':
              const CIR_AxB_V = 1.3 * Math.pow(parseFloat(A!) * parseFloat(B!), 0.625) / Math.pow(parseFloat(A!) + parseFloat(B!), 0.25);
              resultDP = (Drejeskive.cnst_A * Math.pow(CIR_AxB_V / 1000, Drejeskive.cnst_B) * Math.pow(parseFloat(V!), Drejeskive.cnst_C)).toFixed(2);
              resultQ = (parseFloat(A!) * parseFloat(B!) * parseFloat(V!) * 0.0036).toFixed(0);
              break;
            case 'Q':
              const CIR_AxB_Q = 1.3 * Math.pow(parseFloat(A!) * parseFloat(B!), 0.625) / Math.pow(parseFloat(A!) + parseFloat(B!), 0.25);
              resultV = (parseFloat(Q!) / (parseFloat(A!) * parseFloat(B!) * 0.0036)).toFixed(2);
              resultDP = (Drejeskive.cnst_A * Math.pow(CIR_AxB_Q / 1000, Drejeskive.cnst_B) * Math.pow(parseFloat(Q!) / Drejeskive.cnst_D, Drejeskive.cnst_C)).toFixed(2);
              break;
            case 'DP':
              const CIR_AxB_DP = 1.3 * Math.pow(parseFloat(A!) * parseFloat(B!), 0.625) / Math.pow(parseFloat(A!) + parseFloat(B!), 0.25);
              resultV = (parseFloat(DP!) / (Drejeskive.cnst_A * Math.pow(CIR_AxB_DP / 1000, Drejeskive.cnst_B))).toFixed(2);
              resultQ = (parseFloat(A!) * parseFloat(B!) * parseFloat(V!) * 0.0036).toFixed(0);
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    }

    return { resultV, resultQ, resultDP };
  };

  const handleCalculate = () => {
    const results = calculateResults();
    console.log(results); // Skriv resultaterne til konsollen eller gør noget andet med dem
  };

  return (
    <div>
      <div>
        <button onClick={() => handleSelection1('CIR')}>Ø</button>
        <button onClick={() => handleSelection1('AxB')}>A x B</button>
      </div>
      {selection1 && (
        <div>
          <button onClick={() => handleSelection2('V')}>V</button>
          <button onClick={() => handleSelection2('Q')}>Q</button>
          <button onClick={() => handleSelection2('DP')}>DP</button>
        </div>
      )}
      {selection1 && selection2 && (
        <div>
          <label htmlFor="A" style={{ display: selection1 === 'AxB' ? 'inline-block' : 'none' }}>A:</label>
          <input id="A" type="text" value={inputs.A} onChange={handleChange} style={{ display: selection1 === 'AxB' ? 'inline-block' : 'none' }} />
          <label htmlFor="B" style={{ display: selection1 === 'AxB' ? 'inline-block' : 'none' }}>B:</label>
          <input id="B" type="text" value={inputs.B} onChange={handleChange} style={{ display: selection1 === 'AxB' ? 'inline-block' : 'none' }} />
          <label htmlFor="CIR" style={{ display: selection1 === 'CIR' ? 'inline-block' : 'none' }}>CIR:</label>
          <input id="CIR" type="text" value={inputs.CIR} onChange={handleChange} style={{ display: selection1 === 'CIR' ? 'inline-block' : 'none' }} />
          <label htmlFor="V" style={{ display: selection2 === 'V' ? 'inline-block' : 'none' }}>V:</label>
          <input id="V" type="text" value={inputs.V} onChange={handleChange} style={{ display: selection2 === 'V' ? 'inline-block' : 'none' }} />
          <label htmlFor="Q" style={{ display: selection2 === 'Q' ? 'inline-block' : 'none' }}>Q:</label>
          <input id="Q" type="text" value={inputs.Q} onChange={handleChange} style={{ display: selection2 === 'Q' ? 'inline-block' : 'none' }} />
          <label htmlFor="DP" style={{ display: selection2 === 'DP' ? 'inline-block' : 'none' }}>DP:</label>
          <input id="DP" type="text" value={inputs.DP} onChange={handleChange} style={{ display: selection2 === 'DP' ? 'inline-block' : 'none' }} />
          <button onClick={handleCalculate} style={{ display: 'inline-block' }}>Beregn</button>
        </div>
      )}
      {selection1 && selection2 && (
        <div>
          <p>Resultat V: {calculateResults().resultV}</p>
          <p>Resultat Q: {calculateResults().resultQ}</p>
          <p>Resultat DP: {calculateResults().resultDP}</p>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
