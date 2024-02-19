
import React, { useEffect } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Login } from '../apis/axios';

export default function LoginHandle() {
    const location = useLocation();
    const navigate = useNavigate();


        useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');
        Login(code)
        .then((res)=>{
          console.log('성공')
          localStorage.setItem('userId',JSON.stringify(res.data))
          navigate('/')
        })
        .catch((error)=>console.error(error))
      }, []);

      
  return (
    <div className='flex flex-col items-center h-3/5 justify-center'>
      <p className='text-4xl'>로그인 중입니다</p> 
    </div>
  )
}
