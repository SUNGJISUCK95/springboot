import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../feature/counter/counterSlice.js'

// 리덕스 툴킷(redux-toolkit)                                              
// store --- useSelector -----------------------------------------------> 컴포넌트(이부분이 Counter.jsx) 
//    |                                                                      |(액션이 일어나면)
//    | <--- Slice(Reducer: 생산자) <--- API 함수 <--- dispatch(요청하다) <--- 액션(event)
//           ex)cartSlice.js            ex)cartAPI.js
export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch(); //해당 컴포넌트에서 이벤트(액션) 발생 시 slice 요청담당

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}