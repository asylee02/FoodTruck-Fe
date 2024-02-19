import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { geocoder } from '../../utils/geocoder';
import Button from '../../components/Button';
import { useTruckContext } from '../../context/TruckContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const {registerInfo} = useTruckContext();
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation]=useState(
    { lat:37.56383445090615, lng:126.99059423964209}
  );

  const handleLocation = () =>{
    const location = localStorage.getItem('location')
    if(location){
      localStorage.setItem('location', JSON.stringify(currentLocation))
      console.log(location)
      navigate("./info")
    }
    else{
      localStorage.setItem('location', JSON.stringify(currentLocation))
      navigate("./info")
    }
  }

  useEffect(()=>{
    console.log(currentLocation)
  },[currentLocation])

  useEffect(()=>{
    console.log(registerInfo)
    geocoder(setCurrentLocation)
  },[])
  // console.log(currentLocation)
  return (
    <div className='h-xxl'>
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

