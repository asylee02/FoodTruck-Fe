import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './pages/Main';
import Register from './pages/Register/Register';
import MyPage from './pages/Mypage/MyPage';
import MyLike from './pages/Mypage/MyLike';
import MyRegister from './pages/Mypage/MyRegister';
import MyReview from './pages/Mypage/MyReview';
import TruckInfo from './pages/TruckInfo';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AccountBook from './pages/AccountBook';
import Search from './pages/Search';
import BasicLayout from './layouts/basic-layout';
import ResigterLayout from './layouts/register-layout';
import InfoRegister from './pages/Register/InfoRegister';
import MenuRegister from './pages/Register/MenuRegister';
import MarkRegister from './pages/Register/MarkRegister';
import MyLocation from './pages/Mypage/MyLocation';
import MyPageLayout from './layouts/mypage-layout';
import ReigsterLocation from './pages/Register/RegisterLocation';
import LoginHandle from './pages/LoginHandle';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      { index: true, element: <Main/> },
      { path: '/', element: <Main /> },
      { path: '/search/:location', element: <Search /> },

      { path: 'foodTruck/:storeno', element: <TruckInfo /> },

      { path: 'accountBook', element: <AccountBook /> },
      { path: '/auth/kakao/callback', element: <LoginHandle /> },
      { path: '/login', element: <Login /> },
    ],
  },
  {
    path: '/register',
    element: <ResigterLayout/>,
    children:[
      {index: true, element: <Register/>},
      {path: 'info', element: <InfoRegister/>},
      {path: 'menu', element: <MenuRegister/>},
      {path: 'mark', element: <MarkRegister/>}
    ]
  },
  {
    path: '/mypage',
    element: <MyPageLayout/>,
    children: [
      {index: true, element: <MyPage/>},
      {path: 'myFavorite', element: <MyLike/>},
      {path: 'myRegister', element: <MyRegister/>},
      {path: 'myReview', element: <MyReview/>},
      {path: 'myLocation', element: <MyLocation/>},
      {path: 'myLocation/register/:type', element: <ReigsterLocation/>}
    ]
  }
  
]);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);