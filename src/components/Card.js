// Card.js
import Dropdown from './Dropdown';

function Card({populate, refetch,titleData}) {
	return (
	 <div className="card-container">


	  <div className="w-full card-inner">

        <div className="p-4 c-card block bg-white rounded-lg overflow-hidden">
        <Dropdown className='dropdown'
          classProp="card-dropdown"
	      id="titles-dropdown"
	      changeTrigger={refetch}
	      data={populate} />

          <span className="inline-block px-2 py-1 leading-none bg-custom-orange-200 text-white rounded-full font-semibold uppercase tracking-wide text-xs">{titleData.episode === "pilot" ? "pilot" : "Episode " + titleData.episode}</span>
          <span className="inline-block px-2 py-1 leading-none bg-custom-red-200 text-white rounded-full font-semibold uppercase tracking-wide text-xs">{titleData.release_year}</span>
          <div className="mt-3 flex items-center">

          </div>
        </div>
      
      </div>
     </div>
        )
} 

export default Card;