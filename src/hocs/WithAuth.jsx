import React, { useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import LoginAlert from '../components/LoginAlert';

const withAuth = (Component) => (props) => {
  const user = JSON.parse(localStorage.getItem('userId'));
  const userId = user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) { // user정보가 없는가?
        navigate('/login',{replace:true}) // replace를 통해, history 쌓이지 않음
    }
  }, [userId]);

  if (userId) { // user 정보가 있는가?
    console.log('로그인이 되어있음');
    return <Component {...props} />;
  }
};

export default withAuth;
