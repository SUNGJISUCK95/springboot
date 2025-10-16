import { createContext, useContext, useState } from "react";

//1. AuthContext 생성
// Context 객체를 생성하여 장바구니 관련 상태(cartCount, cartList, totalPrice 등)를 관리하기 위한 컨테이너 역할
export const AuthContext = createContext();

//2. AuthContext의 Provider 생성
// CartProvider는 CartContext를 사용하는 컴포넌트들의 범위를 정의
export const AuthProvider = ({children}) => {
    //로그인 결과
    const [isLogin, setIsLogin] = useState(false);

    return (
        <AuthContext.Provider value={{ 
                                        isLogin, setIsLogin
                                    }}>
            {children}
        </AuthContext.Provider>
    );
}