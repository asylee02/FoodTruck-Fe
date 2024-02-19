import React from 'react';


export default function SimpleInfo({data}) {



    return (
        <div className='w-10/12 h-36 bg-progress rounded-2xl flex flex-col items-start px-8 py-2'>
            <div className=' flex items-center'>
            <img src={`${process.env.PUBLIC_URL}/assets/truck1.jpg`}alt="" className='w-10 h-10 rounded-full '/>
            <span className='font-semiboldtext-lg ml-3'>{data.storename}</span>
            </div>
            <hr className='w-11/12 border-gray-100 my-2'/>
            <div className='w-11/12 text-base mt-1'>
                <p>{`영업시간 : ${data.storetime}`}</p>
                <p className='whitespace-nowrap overflow-hidden overflow-ellipsis'>{`메뉴 : ${data.menu ? data.menu : '메뉴 정보가 없음'}`}</p>
            </div>
        </div>
    );
}

