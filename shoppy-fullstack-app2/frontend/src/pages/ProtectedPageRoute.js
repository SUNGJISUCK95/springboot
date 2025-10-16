import React, { useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext.js';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedPageRoute({ children }) { //로그인 체크 보안
    const isAlert = useRef(false);
    const isLogin = useSelector((state) => state.auth.isLogin);
    // const { isLogin } = useContext(AuthContext);
    
    if(!isLogin){ //isLogin이 false일 때
        if(!isAlert.current) {
            alert("로그인이 필요한 서비스 입니다.\n로그인 페이지로 이동합니다.");
            isAlert.current = true;
        }
        return <Navigate to='/login' replace/> //Link는 클릭해야 하지만 Navigate(실시간 페이지 이동)는 자동으로 페이지를 이동한다.
    } else {
        isAlert.current = true;
        return children;
    }
}