import React, { useEffect, useState } from 'react'
import CurrencyDropdown from './Dropdown';
import { HiArrowsRightLeft } from 'react-icons/hi2';

const CurrencyConverrter = () => {
    const[currencies, setCurrencies] = useState([]);
    const[amount, setAmount] = useState(1);

    const[fromCurrency, setFromCurrency] = useState("USD");
    const[toCurrency, setToCurrency] = useState("INR");

    const[convertedAmount, setConvertedAmount] = useState(null);
    const[converting, setConverting] = useState(false);

    const[favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || ["INR", "USD"]);

//   currencies ->  https://api.frankfurter.app/currencies
    const fetchCurrencies = async () =>{
        try{
            const res = await fetch("https://api.frankfurter.app/currencies");
            const data = await res.json();

            setCurrencies(Object.keys(data));
        }
        catch(error){
            console.error("Error Fetching", error);
        }
    };

    useEffect(()=>{
        fetchCurrencies();
    },[]);

    console.log(currencies);

    const ConvertCurrency = async () => {
        if(!amount) return;

        setConverting(true);
        //conversion logic
        try{
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
            const data =await res.json();

            setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
        }
        catch(error){
            console.error("Error Fecthing", error);
        }
        finally{setConverting(false)};
    };

    const handleFavorites = (currency) => {
        // add to favorites
        let updatedFavorites = [...favorites];

        if(favorites.includes(currency)){
            updatedFavorites = updatedFavorites.filter((fav) => fav !== currency);
        }
        else{
            updatedFavorites.push(currency);
        }

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    };

    const swapCurrency = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }

//   currencies ->  https://api.frankfurter.app/latest?amount=1&from=USD&to=INR
  return (
    <div className='max-w-xl mx-auto my-10 p-5 rounded-lg shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]'>
        

      <h2 className='mb-5 text-2xl font-extrabold text-gray-100 flex justify-center '>
        CURRENCY CONVERTER</h2>

        <div className='grid grid-col-1 sm:grid-cols-3 gap-4 items-end'>
            <CurrencyDropdown 
            favorites={favorites}
                currencies={currencies}
                title='From:'
                currency={fromCurrency}
                setCurrency={setFromCurrency}
                handleFavorites={handleFavorites}/>

                {/* Swap currency button */}
            <div className='flex justify-center -mb-5 sm:mb-0'>
                <button onClick={swapCurrency} className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'>
                    <HiArrowsRightLeft  className='text-xl text-gray-700'/>
                </button>
            </div>

            <CurrencyDropdown
                favorites={favorites}
                currencies={currencies}
                title='To:'
                currency={toCurrency}
                setCurrency={setToCurrency}
                handleFavorites={handleFavorites}/>
        </div>

        <div>
            <label htmlFor="amount" className='block mt-1 text-sm font-medium text-gray-200'>
                Amount:
            </label>
            
            <input 
            value={amount}
            onChange={(e) => setAmount(e.target.value)} 
            type="number" 
            className='w-full p-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1'/>
        </div>

        <div className='flex justify-end mt-6'>
            <button onClick={ConvertCurrency} className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]
            ${converting? "animate-pulse" : ""} `}>
                Convert
                </button>
        </div>

        {convertedAmount && 
        <div className='mt-4 text-lg font-medium text-right text-green-700'>
            Converted Amount: <span className='text-yellow-100'> {convertedAmount} </span>
        </div>}

    </div>
  )
}

export default CurrencyConverrter
