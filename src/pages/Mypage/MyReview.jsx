import React, { useEffect, useState } from 'react'
import Review from '../../features/Mypage/Review'
import Header from '../../layouts/header'
import { myPageReview } from '../../apis/axios';

export default function MyReview() {
  const [data,setData] =useState();

  useEffect(()=>{
    myPageReview('123456789','review')
    .then((res)=>{
      console.log(res.data.review)
      setData(res.data.review)
    })
  },[])

  return (
    <div className='h-full'>
      <Header title={'나의 리뷰'}/>
      <div className='h-xxl flex flex-col items-center overflow-y-auto'>
        {data && data.map((item,index)=>{
          return <Review data={item} index={index}/> 
        })}
      </div>
    </div>
  )
}