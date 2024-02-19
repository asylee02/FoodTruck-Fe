import React, { useState } from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { FaRegStar,FaRegBuilding } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { getAddr } from '../../utils/adressName';

export default function Location({data}) {
  const navigate = useNavigate();
  const [addressName, setAddressName] = useState('');
  getAddr(data.favoriteLatitude, data.favoriteLongitude).then(res=>{
    setAddressName(res)
  })
  const handleIcon=(type)=>{
    switch (type){
      case 'home':
        return (
          <p className='flex '>
            <span><IoHomeOutline className='text-2xl'/> </span>
            <span className='ml-3 font-bold'>우리 집</span>
          </p>
        )
      case 'company':
        return (
          <p className='flex '>
            <span><FaRegBuilding className='text-2xl'/> </span>
            <span className='ml-3 font-bold'>직장</span>
          </p>
        )
      case 'etc':
        return (
          <p className='flex '>
            <span><FaRegStar className='text-2xl'/></span>
            <span className='ml-3 font-bold'>기타</span>
          </p>
        )
      default:

    }
  }


  const handleUpdate=()=>{
    console.log('수정')
    navigate(`register/:${data.location_code}`)
  }

  const handleDelete=()=>{
    console.log('삭제')
    
  }

  const handleAddress=()=>{
   if(data){
    return(
    <div>
      <p className='text-sm'>{`주소 : ${addressName}`}</p>
      <div className='flex justify-around mt-5 '>
        <button onClick={handleUpdate} className='border-1 border-black rounded-2xl w-36'>수정</button>
        <button onClick={handleDelete} className='border-1 border-black rounded-2xl w-36'>삭제</button>
      </div>
    </div>
    )
   }
   else{
    return(
    <div className='w-full flex justify-center mt-5'>
      <button className='border-1 border-black rounded-xl w-1/2 '>등록해주세요</button>
    </div>)
   }
  }

  return (
    <div className='h-1/5 w-5/6 mb-20 rounded-xl border-1 border-black p-5'>
      <div className='flex items-center'>
        <p>{handleIcon(data.location_code)}</p>
        <p className='ml-3 font-bold'>{data.name}</p>
      </div>
      <hr className='border-1 w-full my-2'/>
      {handleAddress()}
      
    </div>
  )
}
