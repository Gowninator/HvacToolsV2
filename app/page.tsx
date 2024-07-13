import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Velkommen til HVAC Tools</h1>
      <div className='introtekst'>
      HVAC Tools er designet til at forenkle dit arbejde inden for VVS og ventilation. 
        <p></p>
        Her finder du en række brugervenlige beregningsprogrammer, designet til at lette din dagligdag og optimere dine projekter.
        <p></p>
        Vi er stadig i gang med at udvikle og finpudse vores hjemmeside, så hold øje med nye værktøjer og opdateringer. Vores mål er at tilbyde pålidelige og effektive løsninger, der gør dit arbejde nemmere og mere effektivt.
        <p></p>
        Tak fordi du besøger HVAC Tools – vi glæder os til at blive din go-to ressource for alt inden for VVS og ventilation.
      
      </div> 

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Link href="/side1">
            <button className='FPKnap'>Simpel køl</button> 
          </Link>
          <Link href="/side2">
            <button className='FPKnap'>CO2-koncentration</button> 
          </Link>
          <Link href="/">
            <button className='FPKnap'>Vent dim. <p></p>(Under udvikling)</button> 
          </Link>
          <Link href="/">
            <button className='FPKnap'>Under udvikling</button> 
          </Link>
          <Link href="/">
            <button className='FPKnap'>Under udvikling</button> 
          </Link>

        </div>
    </div>
  );
}

export default Home;
