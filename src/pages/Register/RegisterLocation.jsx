import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { geocoder } from '../../utils/geocoder';
import Button from '../../components/Button';
import { useTruckContext } from '../../context/TruckContext';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../layouts/header';
import { myPageUpdate } from '../../apis/axios';

export default function ReigsterLocation() {
  const navigate = useNavigate();
  const {type} = useParams();
  const [currentLocation, setCurrentLocation]=useState(
    { lat:37.56383445090615, lng:126.99059423964209}
  );

  const handleLocation = () =>{
    const lat = currentLocation.lat;
    const lng = currentLocation.lng;
    console.log(lat, lng, type)
    myPageUpdate('id', lat, lng, type)
    .then((res)=>{
      console.log(res)
    }) 
    navigate(-1)
}


  useEffect(()=>{
    //현재 위치 gps기반 설정
    geocoder(setCurrentLocation)
  },[])
  return (
    <div className='h-xxl'>
      <Header title={'내 즐겨찾는 장소'}/>
      <div className='h-xxl'>
        <Map
          center={currentLocation}
          style={{
            width : "100%",
            height: "100%" 
          }}
          level={3}
          onCenterChanged={(map)=>{
            setCurrentLocation({
              lat: map.getCenter().getLat(),
              lng: map.getCenter().getLng()
            })
          }}
        > 
        <MapMarker position={currentLocation}/>
        </Map>
      </div>
      <div className='h-xxs w-screen flex justify-center items-center'>
        <div className='w-2/3 h-2/3' onClick={()=>handleLocation()}>
        <Button context={'이 위치로 확인'}/>
        </div>
      </div>
    </div>
  );
}

