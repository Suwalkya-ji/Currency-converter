import React from 'react'
import "./App.css";
import CurrencyConverrter from './components/CurrencyConverrter';

function App() {
  return (
    <div className=' min-h-screen bg-gray-950 flex flex-col items-center justify-center'>

      <div className='container'>
         <CurrencyConverrter/>
      </div>
        
    </div>
  )
}

export default App
