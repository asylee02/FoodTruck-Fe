import React, { useEffect, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { FaStar } from "react-icons/fa";
import { truckReview, truckData as truckFollow } from '../apis/axios';

const ReviewPopup = ({ storeno, isOpen, onClose, truckdata, PId, setTruckData}) => {
  const [reviewContent, setReviewComment] = useState('');
  const [data, setData]=useState('')
  const [rating, setRating] = useState(0);
  const user = JSON.parse(localStorage.getItem('userId')); 
  const id = PId

  useEffect(()=>{
    console.log(user)
    console.log(truckdata)
    console.log(storeno)
  },[])

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (e) => {
    setReviewComment(e.target.value);
  };

  const handleSubmit = () => {

    if (!user){
      alert('로그인후에 리뷰작성이 가능합니다!')
      return;
    }

    if (rating === 0) {
      alert('평점을 클릭하세요');
      return;
    }

    if (reviewContent.trim() === '') {
      alert('리뷰내용을 작성하세요');
      return;
    }

    truckReview(id, storeno, reviewContent, rating)
    .then((res)=>{
      console.log(res)
      truckFollow(storeno)
      .then((res)=>setTruckData(res.data.truckData[0]))
    })
    onClose()
  };

  useEffect(()=>{
    setData(truckdata)
  },[])

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md text-center">
            <h2 className="text-2xl font-bold mb-4">리뷰 작성</h2>

            <div className="flex items-center justify-center mb-4">
              <CgProfile className="w-8 h-8 text-gray-300 mr-2 cursor-pointer" />
              <p className="text-sm">{user ? user.nickname : '로그인이 필요합니다'}</p> 
            </div>
            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-${i < rating ? 'yellow' : 'gray'}-500 cursor-pointer`}
                  onClick={() => handleRatingChange(i + 1)}
                />
              ))}
            </div>

            <textarea
              className="w-full h-20 p-2 border border-gray-300 rounded-md mb-4"
              placeholder="리뷰를 작성해주세요."
              value={reviewContent}
              onChange={handleCommentChange}
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              onClick={handleSubmit}
            >
              리뷰 등록
            </button>
            <button
              className="ml-4 text-gray-500 cursor-pointer"
              onClick={onClose}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewPopup;
