import React, { useEffect, useState } from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { FaRegStar,FaRegBuilding } from "react-icons/fa";
import { myPageLocation } from '../../apis/axios';
import { getAddr } from '../../utils/adressName';

export default function StarList({setCurrentLocation, setCurrentAdress, setMyLocation, map}) {
    const [home,setHome]=useState('')
    const [company,setCompany]=useState('')
    const [etc,setEtc]=useState('')

    useEffect(()=>{
        myPageLocation()
        .then((res)=>{
            res.data.favorite?.map((item)=>{
                switch(item.location_code){
                    case 'home':
                        setHome({lat:item.favoriteLatitude, lng:item.favoriteLongitude})
                        break;
                    case 'company':
                        setCompany({lat:item.favoriteLatitude, lng:item.favoriteLongitude})
                        break;
                    case 'etc':
                        setEtc({lat:item.favoriteLatitude, lng:item.favoriteLongitude})
                        break;
                    default:
                        console.log('음 에러인데 이거는')
                }
            })
        })
    },[])

    function handleStar(type){
        let lat;
        
        let lng;
        switch(type){
            case 'home':
            lat=home.lat
            lng=home.lng
            break;
            case 'company':
            lat=company.lat
            lng=company.lng
            break;
            case 'etc':
            lat=etc.lat
            lng=etc.lng
            break;
            default:
                console.log('나와선 안됨')
        }
        getAddr(lat,lng)
        .then((res)=>{
            setCurrentLocation({lat: lat,lng: lng})
            setMyLocation({lat: lat,lng: lng})
            setCurrentAdress(res)
            document.querySelector('#searchBox').style.display='none';
        })
    }
    return (
        <div className='w-80 flex justify-between mt-5 ml-5'>
            <div onClick={()=>handleStar('home')} className='w-20 h-7 border-2 border-background rounded-lg flex justify-center items-center bg-background  font-bold text-white'>
              <span><IoHomeOutline/></span>
              <span className='ml-1'>집</span>
            </div>
            <div onClick={()=>handleStar('company')} className='w-20 h-7 border-2 border-background rounded-lg flex justify-center items-center bg-background  font-bold text-white'>
              <span><FaRegBuilding/></span>
              <span className='ml-1'>직장</span>
            </div>
            <div onClick={()=>handleStar('etc')} className='w-20 h-7 border-2 border-background rounded-lg flex justify-center items-center bg-background  font-bold text-white'>
              <span><FaRegStar/></span>
              <span className='ml-1'>기타</span>
            </div>
          </div>
    );
}

