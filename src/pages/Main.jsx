import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useEffect, useRef, useState } from "react";
import truckMarker from '../assets/marker_truck.png';
import currMarker from '../assets/marker_blue.png';

import Carousel from "../features/Main/Carousel";
import Serach from "../features/Main/Serach";
// import { main } from "../apis/axios";
import { main } from "../apis/axios";
import Markerdesc from "../features/Main/Markerdesc";
import { geocoder } from "../utils/geocoder";
import LoginAlert from "../components/LoginAlert";
// import useKakaoLoader from "./useKakaoLoader"

export default function Main() {
  const mapRef = useRef();
  const slideRef = useRef();
  const [storeData, setStoreData] = useState();
  const [currentLocation, setCurrentLocation]= useState({
    lat:37.56383445090615,
    lng:126.99059423964209
  });
  
const user = JSON.parse(localStorage.getItem('userId'));
const userId = user?.id
  const [currentAdress, setCurrentAdress]=useState();
  const [currentLevel, setCurrentLevel]= useState(4);
  const [myLocation, setMyLocation]= useState();
  const [forcusingTruck, setForcusingTruck]=useState();

  useEffect(()=>{
    console.log('hello')
    console.log(user)
  },[])


  useEffect(()=>{
    handleMainData()
  },[currentAdress])
  
  useEffect(()=>{
    console.log(storeData)
  },[storeData])

  const handleMainData = () =>{
    main(currentLocation.lat,currentLocation.lng,currentLevel)
    .then(res=>{
      console.log(res)
      setStoreData(res.data)
    })
  }

  function handleReset(){
    const input =document.querySelector('#searchBox');
    input.style.display='block';
    // input.value = '';
    setCurrentAdress('')
    geocoder(setCurrentLocation)
  }

  useEffect(()=>{
    geocoder(setCurrentLocation)
  },[])



  return (
    <div className="h-xxl relative overflow-hidden">

      {/* 지도 호출 */}
      <div className="h-full w-scree z-0 relative">
        <Map 
          id='map'
          center={currentLocation}   // 지도의 중심 좌표
          style={{ width: '100%', height: '100%' }} // 지도 크기
          level={4}     
          
          onCenterChanged={(map)=>{
            setCurrentLevel(Math.ceil(map.getLevel()/3))
            setCurrentLocation({
              lat: map.getCenter().getLat(),
              lng: map.getCenter().getLng(),
            })
          }}
          onDragEnd={()=>{handleMainData()}} 
          ref={mapRef}            
          >
        {/* // 중심 좌표 마커 */}
        {myLocation && <MapMarker 
        position={myLocation} image={{src:currMarker, size: {width: 45, height: 55}}}
        />}

        {/* // 가게들 마커 */}

        {storeData && console.log(storeData)}

        {storeData && storeData.map((marker, index) => (
        <MapMarker
          onClick={()=>{slideRef.current.slickGoTo(index)}}
          key={index}
          position={{"lat":marker.latitude, "lng":marker.longitude}}
          image={{
            src: truckMarker,
            size: { width: 45, height: 55 }
          }}
          clickable={true}
          >
        {/* // 마커 오버레이(가게 이름) */}
        {marker.storeno === forcusingTruck ? <Markerdesc data={marker}/> : ''}
        </MapMarker>
      ))
      }
        </Map>
        </div>

      {/* 헤더 부분 */}
      <Serach mapRef={mapRef} setCurrentAdress={setCurrentAdress} setCurrentLocation={setCurrentLocation} setMyLocation={setMyLocation} />


      {/* 몸통 부분 */}
      {currentAdress &&
      <>
        <div className="w-4/5 h-12 border-2 border-black absolute top-0 rounded-full bg-white left-1/2 -translate-x-1/2 mt-12 flex items-center justify-center font-bold" onClick={()=>{handleReset()}}> 
        {currentAdress}
        </div>
      </>
      }
        <div className="absolute bottom-28 z-10 w-screen flex h-1/5 justify-center">
          <Carousel data={storeData} setCurrentLocation={setCurrentLocation} setForcusingTruck={setForcusingTruck} slideRef={slideRef}/>
        </div>
    </div>
  )
}

