import React from 'react'
import { Link } from 'react-router-dom';

export default function Review({data}) {
  const time = new Date(data.reviewtime) 
  const month = time.getMonth()+1;
  const day = time.getDate();

  return (
    <Link to={`/foodtruck/${data.storeno}`} className='mt-5 w-10/12'>
        <p className='text-gray-400'>{`${month}/${day}`}</p>
        <div className='border-1 h-auto rounded-2xl border-black p-3'>
            <p className='font-bold'>{data.storename || '아직 데이터가 안들어옴'}</p>
            <hr className='border-1'/>
            <div>
                <span className='text-yellow-400 '>★</span>
                <span className=''>{`${data.rating}점`}</span>
                <p>{data.storecontent}</p>
            </div>
        </div>
    </Link>
  )
}
