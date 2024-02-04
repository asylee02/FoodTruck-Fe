import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Progress({state}) {
    const navigate = useNavigate();
    return (
        <div className='w-full h-8 relative border-b-2 border-line flex mt-2 mb-6'>
            <div className='text-xs'>가게 정보 입력</div>
            <div onClick={()=>{navigate('/register/info')}} className={` ${state=== 1 ? 'bg-progress' : 'bg-white'} rounded-full border-2 border-line  w-7 h-7 absolute -bottom-4 left-7  z-10 flex justify-center items-center `}>1</div>          
            <div className='mr-5 text-xs absolute left-1/2 -translate-x-1/2 '>메뉴 입력(선택)</div>
            
            <div onClick={()=>{navigate('/register/menu')}} className={`${state=== 2 ? 'bg-progress' : 'bg-white'} rounded-full border-2 border-line w-7 h-7 absolute -bottom-4 left-1/2 -translate-x-1/2  z-10 flex justify-center items-center  `}>2</div>     
            <div className='text-xs absolute right-0 '>사진 인증(선택)</div>

            <div onClick={()=>{navigate('/register/mark')}} className={`${state=== 3 ? 'bg-progress' : 'bg-white'} rounded-full border-2 border-line bg-background w-7 h-7 absolute -bottom-4 right-7 z-10 flex justify-center items-center`}>3</div>          
        </div>
    );
}

