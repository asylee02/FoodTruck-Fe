import React, { useEffect, useState } from 'react';

export default function Serach({mapRef, setCurrentAdress, setCurrentLocation,setMyLocation}) {
    const [searchData, setSearchData] = useState();
    const [dataList, setDataList]= useState();
    const {kakao} =window;
    useEffect(()=>{
        const ps = new kakao.maps.services.Places();
    
        ps.keywordSearch(searchData, (data,status,_pagination)=>{
          if(status === kakao.maps.services.Status.OK){
            const datas=[]
            data.forEach((item)=>{
              const itemInfo ={address : item.address_name, name: item.place_name, location: {x:item.x, y:item.y}}
              datas.push(itemInfo)
            })
            setDataList(datas)
          }
        })
      },[searchData])

      function handleSearch(item){
        const map = mapRef.current
        const lat = Number(item.location.y)
        const lng = Number(item.location.x)
        setCurrentLocation({lat: lat,lng: lng})
        setCurrentAdress(item.address)
        setMyLocation({lat: lat,lng: lng})
        map.setLevel(2)
        document.querySelector('#searchBox').style.display='none';
      }

    return (
        <header id='searchBox' className='absolute top-0 z-10 h-full'>
        <div className="w-screen h-xxs bg-background flex items-center">
            <p className='text-3xl font-bold text-white ml-3'>FoodTruck</p>
        </div>

            <div className='w-screen flex justify-center mt-10'>
              <input 
              className="z-3 border-2 border-black w-4/5 h-12 rounded-full pl-5" 
              type="text"
              placeholder="자신의 위치를 입력해주세요" 
              onChange={(e)=>{setSearchData(e.target.value)}}/>
            </div>
        { searchData ?
        <div className="w-screen h-96 overflow-auto z-3">
          <ul className="bg-white border-2 border-black bg-opacity-70 flex flex-col items-center">
            { dataList?
              dataList.map((item, index)=>{
                return <li key={index} className="h-16 border-b-2 border  w-10/12 flex flex-col justify-center items-start hover:bg-black hover:bg-opacity-20" onClick={()=>{handleSearch(item)}}>
                  <p>{item.name}</p>
                  <p>{item.address}</p>
                </li>
              })
              :
              <li>검색 결과가 없습니다</li>
            }
          </ul>
        </div>
          : <></>
        }
      </header>
    );
}

