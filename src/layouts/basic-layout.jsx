import { Outlet } from 'react-router-dom';
import Footer from './Footer';

function BasicLayout() {
  return (
    <div className='h-dvh'>
        <Outlet className='h-xxl'/>
        <Footer className='h-xxs'/>
    </div>
  );
}

export default BasicLayout;



