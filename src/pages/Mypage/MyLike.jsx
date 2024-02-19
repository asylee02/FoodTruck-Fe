import React, { useEffect, useState } from 'react'
import Like from '../../features/Mypage/Like';
import SimpleUI from '../../features/Mypage/Register'
import Header from '../../layouts/header'
import { myPageLike } from '../../apis/axios';

export default function MyRegister() {
  const [data,setData] = useState();

  useEffect(()=>{
    myPageLike('123')
      .then((res)=>{
        setData(res.data.like)
        console.log(res.data.like)
      })
  },[])

  console.log(data)
  return (
    <div className='h-full'>
      <Header title={'좋아요 누른 가게'}/>
      <div className='h-xxl flex flex-col items-center overflow-y-auto'>
        {data && data.map((item, index)=>{
          if(item.storename){
            return <Like data={item} index={index}/>
        }
        })}
      </div>
    </div>
  )
}
