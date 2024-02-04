import React, { useEffect, useState } from 'react';
import { useTruckContext } from '../../context/TruckContext';
import { useLocation, useNavigate } from 'react-router-dom';
import RegisterMap from '../../features/Register/RegisterMap';
import Progress from '../../features/Register/Progress';
import Input from '../../components/Input';
import { geocoder } from '../../utils/geocoder';
import { getAddr } from '../../utils/adressName';
import DOWInput from '../../components/DOWInput';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import AccountInput from '../../features/Register/AccountInput';
import PayTypeInput from '../../features/Register/PayTypeInput';

export default function InfoRegister() {
    const navigate = useNavigate();
    const [storeName, setStoreName] = useState();
    const [storeAddress, setStoreAddress] =useState();
    const [dowData, setDoWData] =useState();
    const [startTime, setStartTime]=useState('시작 시간');
    const [endTime, setEndTime]=useState('마감 시간');
    const [phoneNumber, setPhoneNumber] = useState();
    const [account, setAccount] = useState();
    const [name, setName] = useState();
    const [alert,setAlert] = useState(false)
    const [payMent,setPayMent]=useState();
    const info = localStorage.getItem('infoRegister')
    
    useEffect(() => {
        const location =JSON.parse(localStorage.getItem('location'))
            getAddr(location.lat,location.lng)
            .then(setStoreAddress)
            .catch(console.log)

            if(info){
                const info = JSON.parse(localStorage.getItem('infoRegister'));
                
                setDoWData(info.dayOfWeek)
                setStoreName(info.storeName)
                setPhoneNumber(info.phoneNumber)
                setAccount(info.account)
                setName(info.name)
                setStartTime(info.startTime)
                setEndTime(info.endTime)
                setPayMent(info.payMent)
            }


    }, []);

    console.log(payMent)

    const handleSubmit = () =>{
        const data={
            storeName:storeName,
            storeAddress:storeAddress,
            dayOfWeek : dowData,
            phoneNumber: phoneNumber,
            account : account,
            name:name,
            startTime : startTime,
            endTime : endTime,
            payMent : payMent
        }
        if(data.storeName){
            localStorage.setItem('infoRegister',JSON.stringify(data))
            console.log(data)
            navigate('/register/menu')
        }
        else{
            setAlert(true)
        }
    }

    return (
        <div className='w-screen h-xxl relative'>
            <div className='w-screen h-1/3'>
            <RegisterMap currentLocation={JSON.parse(localStorage.getItem('location'))}/>
            </div>
            <div className='w-screen px-7'>
            
                <Progress state={1}/>

                <Input init={storeName} label={'상호명'} setState={setStoreName} required={true}/>
                <div className='border-b-1 border-black '>
                    <div className='font-bold'>위치</div>
                    <div className='text-gray-500'>{storeAddress}</div>
                </div>

                <div className='font-bold mt-3 mb-1'>영업 요일</div>
                {console.log(dowData)}
                <DOWInput init={info && JSON.parse(localStorage.getItem('infoRegister')).dayOfWeek} state={dowData} setState={setDoWData}/>

                <div className='font-bold mt-3 mb-1'>
                <span>영업 시간 </span>
                <span className='text-sm text-gray-400 font-normal'>(00:00 형식으로 적어주세요)</span>
                </div>
                <div className='flex justify-evenly'>
                <input onChange={(e)=>{setStartTime(e.target.value)}} className='text-center w-1/3 border-1' type="time" placeholder='시작 시간' />
                <p className='text-2xl'>~</p>
                <input onChange={(e)=>{setEndTime(e.target.value)}}className='text-center w-1/3 border-1' type="time" placeholder='마감시간' />
                </div>

                <Input init={phoneNumber} label={'연락처'} setState={setPhoneNumber}/>

                <PayTypeInput init={payMent} setState={setPayMent}/>

                <AccountInput name={name} setName={setName}  account={account} setAccount={setAccount}/>
                
                <div className='w-full h-12' onClick={handleSubmit}>
                    <Button context={'다음으로'}/>
                </div>
            </div>
            <Alert alert={alert} setAlert={setAlert} content={['상호명이 입력되어있지 않습니다','입력해주시기 바랍니다']}/>
        </div>
    );
}

