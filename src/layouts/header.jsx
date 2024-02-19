import React from 'react';
import { CgChevronLeft } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

export default function Header({title}) {
    const navigate = useNavigate();
    return (
        <div className='w-screen h-xxs flex justify-between items-center px-10 border-b-1 '>
            <button onClick={()=>{navigate(-1)}} className='text-3xl'><CgChevronLeft/></button>
            <div className='text-xl font-bold'>{title}</div>
            <div className='w-9'> </div>
        </div>
    );
}

