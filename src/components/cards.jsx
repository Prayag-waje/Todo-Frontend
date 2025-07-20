import React from 'react'

function Card({values, index, handleClick}) {

  const {name, profession, friend, image} = values;

  return (
    <div className='w-62 bg-zinc-100 rounded-lg overflow-hidden shadow-2xl'>
      <div className='w-full h-42 bg-sky-200'>
        <img src={image} alt="" />
      </div>
      <div className='w-full p-3 '>
        <h3 className='text-xl'>{name}</h3>
        <h3 className='text-xs text-zinc-800'>{profession}</h3>
        <button onClick={()=>handleClick(index)} className={`mt-3 px-3 py-1 text-xs text-white ${friend === true ? "bg-red-500":"bg-blue-500"} font-semibold rounded`}>{friend === true? "Remove":"Add Friends"}</button>
      </div>
    </div>
  )
}

export default Card
