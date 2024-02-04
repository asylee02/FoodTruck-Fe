import React from 'react';

export default function AccountInput({name,setName, account, setAccount}) {


    const handleChange1 = (e) =>{
        setName(e.target.value)
    }
    const handleChange2 = (e) =>{
        setAccount(e.target.value)
    }

    return (
        <form action="" className='my-4'>
        <label htmlFor="" className='font-bold'>계좌번호</label>
        <div className='flex w-full justify-between'>
            <input type="text" className='w-1/4 border-b-1 border-black' defaultValue={`${name || ''}`} placeholder={`은행명`}  onBlur={(e)=>handleChange1(e)} />
            
            <input type="text" className=' w-3/5 border-b-1 border-black' defaultValue={`${account || ''}`} placeholder={`계좌번호를 입력해주세요`}  onBlur={(e)=>handleChange2(e)} />

        </div>

        </form>
    );
}

