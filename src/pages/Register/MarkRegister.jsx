import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import Progress from '../../features/Register/Progress'
import RegisterMap from '../../features/Register/RegisterMap'
import { useNavigate } from 'react-router-dom';
import EXIF from 'exif-js';
import { infoRegister, menuRegister } from '../../apis/axios';
import { distance } from '../../utils/haversine';
import Alert from '../../components/Alert';

export default function MarkRegister() {
    const navigate = useNavigate();
    const [alert,setAlert] = useState(false);
    const [alert2,setAlert2] = useState(false);
    const [alert3,setAlert3] = useState(false);
    const [confirm,setConfirm] = useState(0)
    const location = JSON.parse(localStorage.getItem('location'))
    const menu =  JSON.parse(localStorage.getItem('menu'))
    const info =  JSON.parse(localStorage.getItem('infoRegister'))

    const user = JSON.parse(localStorage.getItem('userId'))



    const handleChange=(e)=>{
      const img =e.target.files[0]

      if(img){
        EXIF.getData(img, function() {
          const tags = EXIF.getAllTags(img)
          
          if(tags.GPSLatitude){
            const lat = tags.GPSLatitude;
            const lng = tags.GPSLongitude;
            const latitude = lat[0] + lat[1] / 60 + lat[2] / 3600;
            const longitude = lng[0] + lng[1] / 60 + lng[2] / 3600;
            if(distance(latitude,longitude,location.lat,location.lng)>100){
              console.log('100미터 이상');
              setAlert(true)
            }
            else{
              console.log('100미터 이하');
              setAlert2(true)
              setConfirm(1)
            }
        }
        else{
          setAlert3(true)
        }
      });
      }
    }
    const handleSubmit=()=>{
      const infoData = {}

      const days = info.dayOfWeek;
      const storeWeek = days.join('');
      let payment =''
      console.log(storeWeek)

      if (info.payMent['cash']){payment+='/현금/'}
      if (info.payMent['card']){payment+='카드/'}
      if (info.payMent['account']){payment+='계좌/'}


      console.log(payment)
      infoData['storename'] = info.storeName
      infoData['storetime'] = `${info.startTime}-${info.endTime}`

      infoData['category'] = info.category
      infoData['storeweek'] = storeWeek
      infoData['contact'] = info.phoneNumber
      infoData['account'] = info.account

      infoData['payment'] = info.payMent

      infoData['latitude'] = location.lat
      infoData['longitude'] = location.lng
      infoData['location'] = info.storeAddress
      infoData['confirmed'] = confirm
      infoData['reportcount'] = 0



      infoRegister(infoData)
      .then((res)=>{
        const store_id = res.data.storeid
        createMenuData(store_id)
      })

      // register(ans)
      // .then((res)=>{console.log(res)})

      localStorage.removeItem('menu')
      localStorage.removeItem('location')
      localStorage.removeItem('infoRegister')
      navigate('/')

    }
    useEffect(()=>{
      console.log(info)
      console.log(location)
      console.log(menu)
      console.log(confirm)
    },[])

    const createMenuData = (store_id) =>{

      const menuData = {}
      menu.forEach((item)=>{
        menuData['itemname']=item.menuName
        menuData['iteminformation']=it
        menuData['itemname']=item.menuName
        menuData['itemname']=item.menuName
        menuData['storeid']=store_id
      })
      menuRegister(menuData)

    }


  return (
    <div className='w-screen h-xxl relative'>
    <div className='w-screen h-1/3'>
    <RegisterMap currentLocation={location}/>
    </div>
    <div className='w-screen h-2/3  px-7'>
    
      <div className='h-xxl overflow-auto flex flex-col items-center '>
        <Progress state={3}/>
        <div className='text-sm text-gray-400 my-4'>
          <p>가게 기준 100미터 이내에서 찍은 사진만 인증됩니다.</p>
          <p>인증된 가게는 인증마크가 발급됩니다.</p>
        </div>

        <p>사진 업로드 (선택)</p>
        <div className='w-11/12 border-1 h-2/5 bg-gray-300 flex justify-center items-center'>
          <label className='bg-white w-48 flex justify-center h-10 items-center rounded-xl border-1 border-background font-bold' htmlFor='inputFile'>사진 업로드</label>
          <input id='inputFile' type="file" onChange={handleChange} className='hidden'/>
        </div>
        <p className='mt-3 text-gray-400 text-sm'>{`현재 상태 : ${confirm ? '사진 인증됨' : '사진 인증 안됨'} `}</p>
      </div>
    <div className='h-xxs w-full flex '>
      <button className='w-full' onClick={handleSubmit}><Button context={'등록하기'}/></button>
    </div>
    </div>
    <Alert alert={alert} setAlert={setAlert} content={['입력하신 사진은 100m 외 사진입니다','다른 사진으로 부탁드립니다']}/>
    <Alert alert={alert2} setAlert={setAlert2} content={['인증이 완료되었습니다.',]}/>
    <Alert alert={alert3} setAlert={setAlert3} content={['입력하신 사진에 위치정보가 없습니다','다른 사진으로 부탁드립니다']}/>

</div>
  )
}


