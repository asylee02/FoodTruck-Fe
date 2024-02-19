import React, { useEffect, useState } from 'react'
import SimpleUI from '../../features/Mypage/Register'
import Header from '../../layouts/header'
import { myPageRegister } from '../../apis/axios';

export default function MyRegister() {
  const [data,setData] = useState();


  useEffect(()=>{
    myPageRegister('12345678')
      .then((res)=>{
        setData(res.data.store)
      })
  },[])

  console.log(data)
  return (
    <div className='h-full'>
      <Header title={'나의 제보'}/>
      <div className='h-xxl flex flex-col items-center overflow-y-auto'>
        {data && data.map((item,index)=>{
          return <SimpleUI data={item} index={index}/>
        })}
      </div>
    </div>
  )
}
