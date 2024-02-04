import React, { useEffect, useState } from 'react';

export default function PayTypeInput({init, setState}) {
    const [payment,setPayment]=useState(({
        cash : false,
        card : false,
        account : false
    }))

    useEffect(()=>{
        setState(payment)
    },[payment])

    useEffect(()=>{
        if(init){
            init.forEach((item)=>{
                setPayment((prev)=>({
                ...prev,
                [item] : !prev[init]
            })) 
            })
        }
    },[])

    const handleClick=(type)=>{
        setPayment((prev)=>({
            ...prev,
            [type]: !payment[type]
        }))
    }

    return (
        <div>
            <label className='font-bold mb-1'>결제 방식</label>
            <div className='w-full flex justify-between'>
                <button onClick={()=>handleClick('cash')} className={`${payment.cash ? 'border-background' :'border-gray-400'} border-1 rounded-xl w-1/4 h-8 flex items-center justify-center`}>현금</button>
                <button onClick={()=>handleClick('card')} className={`${payment.card ? 'border-background' :'border-gray-400'} border-1 rounded-xl w-1/4 h-8 flex items-center justify-center`}>카드</button>
                <button onClick={()=>handleClick('account')} className={`${payment.account ? 'border-background' :'border-gray-400'} border-1 rounded-xl w-1/4 h-8 flex items-center justify-center`}>계좌이체</button>
            </div>
        </div>
    );
}

