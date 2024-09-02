
import { HiStar, HiOutlineStar } from "react-icons/hi";
const CurrencyDropdown = ({
    currencies,
    currency,
    setCurrency,
    favorites,
    handleFavorites,
    title="", 
  }) => {

    const isFavroite = curr=>favorites.includes(curr);

  return (
    <div>
        <label htmlFor={title}
        className="block text-sm font-medium text-gray-200">
            {title}
        </label>

        <div className="mt-1 relative">
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}  className="w-full p-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-500">

                {favorites.map((currency) =>{
                     return( 
                        <option className="bg-gray-200" value={currency} key={currency}>
                           {currency}
                       </option>
                       );
                })}

                {/* render favorites */}
                <hr />

                {currencies
                .filter((c) => !favorites.includes(c))
                .map((currency) => {
                  return( 
                     <option value={currency} key={currency}>
                        {currency}
                    </option>
                    );
                })}
            </select>

            <button onClick={()=>handleFavorites(currency)}
             className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5">

                {isFavroite(currency) ? <HiStar /> : <HiOutlineStar /> }
            </button>
        </div>
    </div>
  )
}

export default CurrencyDropdown
