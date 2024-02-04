import React, { useEffect, useState } from 'react';
import CategoryButton from '../../components/CategoryButton';
import Alert from '../../components/Alert';

export default function MenuPlus({num}) {
    const [description, setDescription] = useState();
    const [menuName, setMenuName]= useState();
    const [price, setPrice]=useState();
    const [alert,setAlert] = useState(false);
    const [isOpen, setIsOpen]= useState(true);

    const handleRegister=()=>{
        if( menuName && price){
            setIsOpen(false);
            const prev =JSON.parse(localStorage.getItem('menu'))
            console.log(prev)
            prev[num]={description:description, menuName:menuName, price:price}
            localStorage.setItem('menu', JSON.stringify(prev))
        }
        else{
            setAlert(true);
            <Alert alert={alert} setAlert={setAlert} content={['입력되지 않은 칸이 있습니다','모두 입력해주세요']}/>
        }
    }



    return (
        <>
            <div onClick={()=>{setIsOpen(true)}} className={`menu relative flex justify- h-10 items-center w-full`}>
                <input onChange={(e)=>setMenuName(e.target.value)} type="text" className='w-1/3 text-center z-10' placeholder='메뉴명'/>
                <input onChange={(e)=>setPrice(e.target.value)} type='number' className='w-1/3 text-center z-10' placeholder='가격'/>
                <input onChange={(e)=>setDescription(e.target.value)} type='text' className='w-1/3 text-center z-10 overflow-x-auto' placeholder='ex)2개에 천원'/>
            </div>
            <div className='w-full flex justify-center'>
            <button onClick={()=>handleRegister()} className={`${isOpen ? 'block' : 'hidden'} w-1/3 border-1 rounded-xl`}>등록</button>
            </div>
        </>
    );
}

