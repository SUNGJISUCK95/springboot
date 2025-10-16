import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext.js';
import { axiosData } from '../utils/dataFetch.js';
import { cartItemsCheck, cartItemsAddInfo, getTotalPrice } from '../utils/cart.js';

/**
 * CartCountext를 제어하는 함수를 가진 커스텀 훅
 */
export function useCart() {
    //CartContext의 값 가져오기
    const { cartCount, setCartCount, 
            cartList, setCartList, 
            totalPrice, setTotalPrice } = useContext(CartContext);

    //장바구니 아이템 추가
    const addCart = (cartItem) => { // <-- ProductDetail 쇼핑백 추가 이벤트 처리
      //pid, size가 동일한 경우 qty 증가, cartItems 없는 경우 새로 추가 
      setCartList(cartItemsCheck(cartList, cartItem));
      setCartCount(cartCount + 1);
    };

    //장바구니 출력 : 장바구니 아이템 <-- 이미지, 상품명, 상품가격 추가
    const showCart = () => {
        const fetch = async () => {
            const jsonData = await axiosData("/data/products.json");
            setCartList(cartItemsAddInfo(jsonData, cartList));
            setTotalPrice(getTotalPrice(jsonData, cartList));
        }
        fetch();
    }

    //장바구니 수량 변경
    const updateCart = (cid, type) => {
        //카트 수량 변경
        setCartList((cartList) => cartList.map((item) => 
            item.cid === cid ?
                type === '+'? {...item, qty: item.qty+1}   
                            : item.qty > 1 ? {...item, qty: item.qty-1} : item 
            :   item  
        ));

        //수량 변경에 따른 전체 상품 가격 변경
        const findItem = cartList.find((item) => item.cid === cid);
        type === '+' ? setTotalPrice(totalPrice + findItem.price) 
                    : findItem.qty > 1 ? setTotalPrice(totalPrice - findItem.price)
                                    : setTotalPrice(totalPrice); 

        //cartCount 수량 변경 : Header
        type === '+' ? setCartCount(cartCount + 1)
                : cartCount > 0 ? setCartCount(cartCount - 1) : setCartCount(cartCount);
    }

    //장바구니 아이템 삭제
    const removeCart = (cid) => {
        const findItem = cartList.find(item => item.cid === cid);

        setCartList((cartList) => {
            return cartList.filter(item => !(item.cid === cid)); //filter는 새로운 배열 생성
            // filter(item => item.cid === cid)는 cid가 같은 item 이외는 전부 삭제하고 새 배열 생성이라서
            // filter(item => !(item.cid === cid))로 cid가 같은 item이 아닌 나머지로 새 배열 생성해서 선택한 상품만 제거
        });
        
        setCartCount(cartCount - findItem.qty); //Header 수량 변경
        setTotalPrice(totalPrice - (findItem.qty * findItem.price)); //전체 상품 가격
    }

    return { addCart, showCart, updateCart, removeCart }
}

