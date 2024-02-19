import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewPopup from '../components/ReviewPopup';
import { GiCheckMark } from "react-icons/gi";
import { AiOutlineLike } from "react-icons/ai";
import { PiSirenLight } from "react-icons/pi";
import { BsCart4 } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { LuPencilLine } from "react-icons/lu";
import { truckData as AxiosTruckData } from '../apis/axios';
import { truckComplain } from '../apis/axios';
import { truckGood } from '../apis/axios';
import { inputAccount } from '../apis/axios';
import { CgChevronLeft } from "react-icons/cg";

import { CategoryImg } from '../utils/categoryImg';

export default function TruckInfo() {
  const [truckData, setTruckData] = useState({ menu: [], review: []});
  const [accountData, setAccountData] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isReviewPopupOpen, setReviewPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { storeno } = useParams();
  const id ='6f8eab40-7f0a-4c15-8bc3-d5d99d30be60';
  const truckImages =  ['truck1.jpg', 'truck2.jpg', 'truck3.jpg', 'truck4.jpg', 'truck5.jpg', 'truck6.jpg', 'truck7.jpg', 'truck8.jpg', 'truck9.jpg']; 
  const randomTruckImage = truckImages[Math.floor(Math.random() * truckImages.length)];

  useEffect(() => {
    const AxiosData = async () => {
      try {
        const response = await AxiosTruckData(storeno);
        if (response.data.truckData && response.data.truckData.length > 0) {
          setTruckData(response.data.truckData[0]);
        } else {
          console.error("푸드트럭 데이터가 없습니다.");
        }
      } catch (error) {
        console.error("푸드트럭 데이터 로딩 오류 발생:", error.status);
      } finally {
        setLoading(false);
      }
    };
    AxiosData();
  }, []);

  
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log('id:', id); // id 값
  console.log('storeno:', storeno); // id 값
  console.log('truckData:', truckData); // truckData 값이 어떻게 변경되는지 확인

  // 메뉴 - 가계부추가 (x)
  const handleAddToAccount = (index) => {
    navigate('/accountBook');
    // console.log(`Add to menu: ${truckData.menu[index].name}`);
    // setHoveredIndex(index);
  };
  //호버 - 검은색 표시
  const handleHoverMenu = (index) => {
    setHoveredIndex(index);
    setTruckData((prevData) => {
      const newMenu = [...prevData.menu];
      newMenu[index].hovered = true; 
      return {
        ...prevData,
        menu: newMenu,
      };
    });
  };

    // 리뷰의 평균 평점
    const calculateAverageRating = () => {
      if (!truckData || !truckData.review || truckData.review.length === 0) {
        return "";
      }
      const totalRating = truckData.review.reduce((sum, review) => sum + review.rating, 0);
      return totalRating / truckData.review.length;
    };
    //리뷰 팝업 열기- 닫기
    const openReviewPopup = () => {
      setReviewPopupOpen(true);
    }; 
    const closeReviewPopup = () => {
      setReviewPopupOpen(false);
    };
  
    //가계부 추가 
    const handleInputAccount = (item)=> {
      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const date = `${month}/${day}`
      inputAccount(id, item.name, item.price, truckData.storeno, date)
      .then((res)=>{
        console.log(res)
      })
    }

    const handleLiked = () => {

      truckGood(id, truckData.storeno)
        .then((res) => {
          AxiosTruckData(truckData.storeno)
          .then((res)=>setTruckData(res.data.truckData[0]))
        })
    }
    
    const handleComplain = () => {
      truckComplain(id, truckData.storeno)
        .then((res) => {
          AxiosTruckData(truckData.storeno)
          .then((res)=>setTruckData(res.data.truckData[0]))
        })
    }

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className='w-screen h-16 flex justify-between items-center px-10 border-b-1 '>
            <button onClick={()=>{navigate(-1)}} className='text-3xl'><CgChevronLeft/></button>
            <div className='text-xl font-bold'>상세 페이지</div>
            <div className='w-9'> </div>
        </div>
      {loading || !truckData? (
        <p>Loading... </p>
      ) : (
      <div className="w-screen h-xxl flex-1 overflow-y-auto">
        {/* 트럭 사진 렌더링 */}
        
        <div className='flex justify-center w-screen'>
          <img
          src={`${process.env.PUBLIC_URL}/assets/${randomTruckImage}`}
          alt="Truck Photo"
          className='w-1/2 border-b-0 aspect-[1/1] xl:w-1/3'
          />
        </div>
        
          
        {/* 트럭 이름 */}
        <h3 className="text-2xl font-bold mt-4 mb-2 ml-5">{truckData?.storename}</h3>
          
        {/* 좋아요 및 신고 정보 */}
        <div className="ml-5 flex items-center mb-1">
        <GiCheckMark style={{ color: 'blue' }} />
          <p className="ml-2 text-xs font-sans">{`좋아요가 ${truckData.like}개 이상인 가게에요!`}</p>
        </div>
          <div className="bg-orange-200 h-1 w-full mt-2"></div>
          <div className="mt-2 mb-2 ml-8">
        <div className="flex items-center">
          <h3 className="text-2xl font-bold mb-1 mr-2">상세정보</h3>
          <div className="ml-auto flex items-center">
            <div onClick={handleLiked}>
              <AiOutlineLike />
            </div>
              <div className="mr-2 ml-1">{`${truckData.like}`}</div>
            <div onClick={handleComplain}>
              <PiSirenLight />
            </div>
              <div className="mr-7 ml-1">{`${truckData.report}`}</div>
          </div>
        </div>       
          <p className="font-sans">{`카테고리: ${truckData.category}`}</p>
          <p className="font-sans">{`연락처: ${truckData.contact}`}</p>
          <p className="font-sans">{`계좌: ${truckData.account}`}</p>
          <p className="font-sans">{`영업 요일: ${truckData.businessDays}`}</p>
          <p className="font-sans">{`영업 시간: ${truckData.businessTime}`}</p>            
        </div>

      {/* 메뉴 */}
      <div className="bg-orange-200 h-1 w-full mt-2"></div>
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mt-2 mb-2 ml-8">메뉴</h2>
          <div className="ml-15 mt-2 pl-2">
            <p className="text-zinc-400 text-sm">메뉴를 클릭하면 가계부로 이동합니다</p>
          </div>
        </div>
      <div className="bg-gray-200 h-0.5 w-full mt-1 mb-1"></div>


      {!truckData.menu || truckData.menu.length === 0 ? (
        <p className="ml-8 mt-2 text-gray-400 text-center text-sm mb-2">등록된 메뉴가 없습니다</p>
      ) : (
      <ul>
      {truckData.menu.map((item, index) => (
        <div key={index}>
          <li
            className="relative transition duration-300 hover:bg-gray-200 ml-8 mr-8 mt-2 flex items-center"
            onMouseOver={() => handleHoverMenu(index)}
          >
            {/* 호버시 가운데 아이콘 노출 */}
            {hoveredIndex === index && (
              <>
              <div className="absolute inset-0 flex items-center justify-center">
              <BsCart4 className="w-8 h-8 text-black bg-white border border-black rounded-lg" />
              </div>
              </>
            )}

            <div onClick={()=>handleInputAccount(item)} className="w-full h-full absolute top-0 left-0" />
              <div className="w-24 h-24 rounded-full mr-4 border-2">
                {CategoryImg(truckData.category)}
              </div>
              <div>
                <p className ="font-semibold text-lg mb-0.5">{item.name}</p>
                <p className ="text-slate-600 text-sm mb-0.2">{item.descrption}</p>
                <p className ="text-slate-950 text-base mt-0.2">{item.price} 원</p>
              </div>
              <span
//                onClick={() => handleAddToAccount(index)}
                className={`ml-auto cursor-pointer w-5 h-5 transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
              >
              </span>
            </li>
            <div className="bg-gray-100 h-0.5 w-full"></div> {/* 하단 회색 줄 */}
          </div>
        ))}
      </ul>  
      )} 

      {/* 리뷰 */}
      <div className="bg-orange-200 h-1 w-full"></div>
      <div className="flex items-center justify-between">
      <div className="flex items-center">
        <h2 className="text-2xl font-bold mt-2 mb-2 ml-8">리뷰</h2>
        <p className="ml-2">
          <span className="text-yellow-500">★</span> 
          <span className="text-black">{` ${calculateAverageRating()}`}</span>
        </p>
      </div>
        <LuPencilLine className="text-right mr-7 cursor-pointer"
          onClick={openReviewPopup}
        />
        <ReviewPopup isOpen={isReviewPopupOpen} onClose={closeReviewPopup} data={truckData} PId={id} setTruckData={setTruckData} storeno={truckData.storeno} /> 
      </div>
      <div className="bg-gray-200 h-0.5 w-full"></div>

      <ul className="pl-8">
        {truckData && truckData.review && truckData.review.length > 0 ? (
          truckData.review.map((review, index) => (
            <li key={index} className="mb-5 mt-1 mr-2 flex items-center">
              {review.profileImage ? (
                <img src={review.profileImage} alt={`${review.name}'s Profile`} className="w-8 h-8 rounded-full mr-4" />
              ) : (
                <React.Fragment>
                  {/* 리액트 아이콘을 사용하여 아이콘 대체 */}
                  <CgProfile className="w-8 h-8 text-gray-300 mr-4" />
                  {/* alt 텍스트 대체 */}
                  {/* <span className="sr-only">{`${review.name}'s Profile`}</span> */}
                </React.Fragment>
              )}            
              <div className="flex flex-col">
                <div className="flex items-center">
                  <p className="text-sm font-bold">{review.name}</p>
                  <p className="ml-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-${i < review.rating ? 'yellow' : 'gray'}-500 border-transparent border-solid border-2 `}
                      >
                        ★
                      </span>
                    ))}
                  </p>
                </div>
                <p className="mr-4">{review.comment}</p>
              </div>
            </li>
          ))
        ) : (
          // 리뷰없음
          <div className="text-center text-gray-400 text-sm mt-4 mb-2">
            <p>등록된 리뷰가 없습니다</p>
            <div className="mb-2 ml-8">

            </div>
          </div>
        )}
      </ul>

      </div>
      )}
  </div>
  );
};