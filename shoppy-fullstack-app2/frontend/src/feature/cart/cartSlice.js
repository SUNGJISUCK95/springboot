import { createSlice } from '@reduxjs/toolkit'
import { cartItemsCheck, cartItemsAddInfo } from '../../utils/cart.js';

const initialState = {
  cartCount: 0,
  cartList: [], //context 방식의 const [cartList, setCartList] = useState([]); 부분과 동일하다
  totalPrice: 0
}

export const cartSlice = createSlice({ 
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(state, action) {
      const { cartItem } = action.payload;
      // console.log("cartSlice => ", action.payload.cartItem); //해당 함수를 호출하면 action으로 값이 넘어온다.     
      // console.log("cartSlice => ", cartItem);

      state.cartList = cartItemsCheck(state.cartList, cartItem); //initialState과 cartSlice는 서로 영역이 다르므로 state.으로 접근해야한다.
      // console.log("cartSlice => ", state.cartList);
    },
    showCartItem (state, action) {
      const { items } = action.payload;
      state.cartList = cartItemsAddInfo(items, state.cartList);
    },
    updateCartCount(state) {
      state.cartCount = state.cartList.reduce((total, item) => total + item.qty, 0);       
    },
    updateTotalPrice(state) {
      state.totalPrice = state.cartList.reduce((total, item) => total + (item.qty*item.price), 0);  
    },
    updateCartItem (state, action) {
      const { cid, type } = action.payload;

      state.cartList = state.cartList.map((item) => 
          item.cid === cid ?
              type === '+'? {...item, qty: item.qty+1}   
                          : item.qty > 1 ? {...item, qty: item.qty-1} : item 
          :   item  
      );      
    },
    removeCartItem (state, action) {
        const { cid } = action.payload;
        state.cartList = state.cartList.filter(item => !(item.cid === cid));
    }
  },
})

// Action creators are generated for each case reducer function
export const { addCartItem, showCartItem, updateCartCount, updateTotalPrice, updateCartItem, removeCartItem } = cartSlice.actions //API 함수 또는 컴포넌트에서 dispatch(액션함수)

export default cartSlice.reducer //store import
