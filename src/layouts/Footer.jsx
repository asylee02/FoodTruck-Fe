import React from 'react'
import { Link } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { AiFillAccountBook } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

export default function Footer() {
  return (
    <div className='bg-white w-screen h-xxs'>
      <ul className='w-screen h-full flex items-center border-t-1 border-background'>
        <Link to='/' className='flex flex-col items-center w-1/4 border-x-1'>
          <p><IoMdHome className='text-3xl'/></p>
          <p className='font-bold text-xs'>메인</p>
          </Link>
        <Link to='/register' className='flex flex-col items-center w-1/4 border-x-1'>
          <p><MdLocationPin className='text-3xl'/></p>
          <p className='font-bold text-xs'>등록</p>
          </Link>
        <Link to='/accountBook' className='flex flex-col items-center w-1/4 border-x-1'>
          <p><AiFillAccountBook className='text-3xl'/></p>
          <p className='font-bold text-xs'>가계부</p>
          </Link>
        <Link to='/mypage' className='flex flex-col items-center w-1/4 border-x-1'>
          <p><FaUser className='text-3xl'/></p>
          <p className='font-bold text-xs'>마이 페이지</p>
          </Link>
      </ul>
    </div>
  )
}