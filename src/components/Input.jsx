import React from 'react';

export default function Input({init, label, setState, required}) {


    const handleChange = (e) =>{
        setState(e.target.value)
    }

    return (
        <form action="" className='my-4'>
        <label htmlFor="" className='font-bold'>{`${label} ${required ? '(필수)':''}`}</label>
        {
            required 
            ?<input type="text" className='w-full border-b-1 border-black' defaultValue={`${init || ''}`} placeholder={`${label}을 적어주세요`}  onBlur={(e)=>handleChange(e)} required />
            :<input type="text" className='w-full border-b-1 border-black' defaultValue={`${init || ''}`} placeholder={`${label}을 적어주세요`}  onBlur={(e)=>handleChange(e)} />
        }

        </form>
    );
}

