import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import { TruckContextProvider } from '../context/TruckContext';
import withAuth from '../hocs/WithAuth';

function ResigterLayout() {
    const user = JSON.parse(localStorage.getItem('userId'));
    const userId = user?.id;

    return (
        <TruckContextProvider>
        <div className='h-dvh'>
            <Header  title={'가게 등록'}/>
            <Outlet />
        </div>
        </TruckContextProvider>
    );
}

export default withAuth(ResigterLayout)
