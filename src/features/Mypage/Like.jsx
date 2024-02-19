import React from 'react'
import {CategoryImg} from '../../utils/categoryImg'
import { Link } from 'react-router-dom'

export default function Like({data}) {
  return (
    <Link to={`/foodtruck/${data.storeno}`} className='mt-5 w-10/12'>
        <p className='text-gray-400'>{data.date}</p>
        <div className='border-1 h-16 rounded-2xl border-black p-2'>
            <div className='flex'>
            <div className='w-5 h-5 ml-6 mr-2'>
                {CategoryImg(data.category)}
            </div>
            <p>{data.storename}</p>
            </div>
        <hr className='border-1 w-full'/>
        <p className='text-sm ml-6'>{`위치 : ${data.location}`}</p>
        </div>
    </Link>
  )
}
