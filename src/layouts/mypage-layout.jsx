import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import { TruckContextProvider } from '../context/TruckContext';
import Footer from './Footer';
import withAuth from '../hocs/WithAuth';

function MyPageLayout() {
    return (
        <TruckContextProvider>
        <div className='h-dvh'>
            <div className='h-xxl'>
            <Outlet/>
            </div>
            <Footer/>
        </div>
        </TruckContextProvider>
    );
}


export default withAuth(MyPageLayout)