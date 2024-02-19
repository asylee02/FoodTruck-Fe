import React from 'react'
import Header from '../layouts/header'

export default function Login() {
  return (
    <div className='h-xxl'>
        <Header title={"로그인"}/>
        <div className='h-xxl relative'>
            <div className='absolute bottom-1/2 right-1/2 translate-x-1/2 flex flex-col items-center'>
                <div className='text-3xl font-bold text-background'>FoodTruck</div>
                <div className='text-xl font-bold mb-10'>로그인이 필요한 기능입니다</div>
                <div className='w-screen aspect-[2/1] rounded-2xl border-2 border-background flex justify-center items-center'>
                    <a href={process.env.REACT_APP_KAKAO_URL}>
                    <img src={`${process.env.PUBLIC_URL}/assets/kakao_login.png`} alt="" />
                    </a>
                </div>
            </div>
        </div>
    </div>
  )
}
