import React, { useEffect, useState } from 'react'
import Location from '../../features/Mypage/Location'
import Header from '../../layouts/header'
import { myPageLocation } from '../../apis/axios';

export default function MyLocation() {
  const [data,setData] = useState(); 

  useEffect(()=>{
    myPageLocation()
    .then((res)=>{
      console.log(res.data.favorite)
      setData(res.data.favorite)
    })
  },[])
  return (
    <div className='h-full'>
        <Header title={'장소 즐겨찾기'}/>
        <div className='h-xxl flex flex-col items-center mt-8'>
          {data && data.map((item,index)=>{
            return <Location data={item} index={index}/>
          })}
        </div>
    </div>
  )
}
