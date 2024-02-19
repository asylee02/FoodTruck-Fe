import React, { useEffect, useState } from 'react';
import Footer from '../layouts/Footer';
import Header from '../layouts/header';
import { accountData as accountCall } from '../apis/axios';
import { accountModify } from '../apis/axios';
import { accountDelete } from '../apis/axios';
import withAuth from '../hocs/WithAuth';

function AccountBook() {
  const [accountData, setAccountData] = useState([]);
  const id = 'd41a74e1-985a-43d8-92c9-67ab2c7d7e9f'; // 로그인 기능구현 이후 코드변경

  useEffect(() => {
    accountCall(id)
      .then((response) => {
        setAccountData(response.data.purchase);
        console.log(response.data.purchase)
      })
      .catch((error) => {
        console.error("계정 데이터를 가져오는 중 오류 발생:", error);
      });
  }, []);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month < 10 ? '0' : ''}${month}/${day < 10 ? '0' : ''}${day}/${year}`;
  };

  const calculateTotalSum = () => {
    if (!accountData || accountData.length === 0) {
      return 0;
    }

    const totalSum = accountData.reduce((total, item) => {
      return total + item.itempricesum * item.itemquantity; // itemquantity가 상품의 수량을 나타낸다고 가정합니다.
    }, 0);
    return totalSum;
  };
  
  //수량 증가 버튼
  const handleIncreaseQuantity = (index) => {
    const updatedAccountData = [...accountData];
    const data = updatedAccountData[index]
    accountModify(id, data.date, data.iteminformation, 1)
      .then((res) => {
        data.itemquantity += 1;
        setAccountData(updatedAccountData);
      })
  }

  //수량 감소 버튼
  const handleDecreaseQuantity = (index) => {
    const updatedAccountData = [...accountData];
    const data = updatedAccountData[index] 
    accountModify(id, data.date, data.information, -1)
      .then((res) =>{
        data.itemquantity += -1;
        setAccountData(updatedAccountData);
      }) 
  }

  //내역 삭제 버튼 
  const handleDeleteItem = (item) => {
    accountDelete(id,item.date, item.itemname)
    .then((res)=>{
      accountCall(id)
      .then((res)=>setAccountData(res.data.purchase))
    })
    }
  

  return (
    <div className="flex flex-col h-xxl relative w-full">
      <div className="flex-1 overflow-y-auto">
        <Header title={'가계부'} />
        <div className="container mx-auto p-4">
          <div className="bg-orange-200 h-1 w-full mt-0.5 mb-1"></div>

          {/* 소비금액 영역 */}
          {accountData.map((purchaseItem, index) => (
            <div key={purchaseItem.date} className="p-1 mb-2 w-full">
              <h2 className="mb-2 text-sm text-gray-300">{purchaseItem.date}</h2>
              <div className="bg-gray-100 h-0.5 w-full mt-1 mb-1"></div>

              <p className='text-xl font-bold'>{`가게- ${purchaseItem.storename}`}</p>
              <p>{`메뉴 - ${purchaseItem.itemname}`}</p>
              <ul>
                <li key={purchaseItem.date} className="flex justify-between">
                  <p>
                    <span>{purchaseItem.iteminformation}</span>
                  </p>
                  <p style={{ marginTop: '10px' }}>
                  <div className='flex items-center'>
                    <button onClick={() => handleIncreaseQuantity(index)}
                      className='text-2xl font-bold text-background '>
                    +</button>
                
                    <div className='text-xl mx-3 mt-1'>{purchaseItem.itemquantity}</div>
                    <button onClick={() => handleDecreaseQuantity(index)}
                      className='text-4xl font-bold text-background mr-3 mb-1'>
                    -</button>

                    <div style={{ marginRight: '5px' }}>{purchaseItem.itempricesum} 원</div>
         
                    <button onClick={() => handleDeleteItem(purchaseItem)}
                      style={{
                        display: 'inline-block',  marginRight: '5px', backgroundColor: 'bg-slate-200',
                        border: '1px solid #ccc', padding: '5px 10px', borderRadius: '3px',  cursor: 'pointer'
                      }}>
                    삭제</button>
                  </div>
                  </p>
                </li>
              </ul>
              {/* <p className="font-bold mb-4">지출 {expense.item.price}원</p> */}
            </div>
          ))}

          <div className="bg-orange-200 h-1 w-full mt-0.5 mb-1"></div>

          {/* 소비금액 합산 */}
          <div className="mt-8 w-full">
            <h2 className="text-lg font-bold mb-2"> 소비 금액</h2>
            <div className="bg-orange-200 h-1 w-full mt-0.5 mb-1"></div>
            <div className="text-right mb-1">
              {calculateTotalSum()} 원
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
export default withAuth(AccountBook)