import React from 'react'
import { FaGear,FaPen  } from "react-icons/fa6";
import MyButton from '../../features/Mypage/MyButton';
import { TbSpeakerphone } from "react-icons/tb";
import { MdOutlineRateReview } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import withAuth from '../../hocs/WithAuth';
import { FaUser } from "react-icons/fa";


function MyPage() {
  const URL = process.env.REACT_APP_KAKAO_URL;
  const userId = JSON.parse(localStorage.getItem('userId'));
  return (
    <div className='h-xxl w-screen'>
      <header className='flex justify-between h-xxs border-1 items-center text-xl w-full'>
        <div className='w-1/3'></div>
        <div className='w-1/3 flex justify-center font-semibold'>마이 페이지</div>
        <div className='w-1/3 flex justify-center'><FaGear /></div>
      </header>
      <div className='h-xxl '>
        <div className='h-2/5 border-1 flex flex-col items-center'>
            <div className='h-3/5 aspect-square rounded-full mt-8'>
                <FaUser className='w-full h-full bg-gray-300 rounded-full '/>
            </div>
            <div className='flex mt-4 items-center justify-center w-screen'>
              {
                userId
                ? <p className='text-xl font-semibold w-auto border-b-1 border-stone-400' >{userId.nickname}</p>
                : <a className='text-xl font-semibold w-auto border-b-1 border-stone-400' href={URL} >로그인이 필요합니다</a>
              }
            </div>
        </div>

        <div className='h-3/5 border-1 grid grid-cols-2 grid-rows-2 justify-items-center items-center'>
            <MyButton content={'나의 제보'} icon={<TbSpeakerphone className='text-5xl'/>} link={'myRegister'}/>
            <MyButton content={'내가 쓴 리뷰'} icon={<MdOutlineRateReview  className='text-5xl'/>} link={'myReview'}/>
            <MyButton content={'장소 즐겨찾기'} icon={<MdLocationPin className='text-5xl'/>} link={'myLocation'}/>
            <MyButton content={'좋아요 누른 가게'} icon={<AiOutlineLike className='text-5xl'/>} link={'myFavorite'}/>
            </div>
      </div>
    </div>
  )
}

export default withAuth(MyPage)