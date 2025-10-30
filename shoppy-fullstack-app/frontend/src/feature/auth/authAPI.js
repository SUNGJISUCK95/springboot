import { login, logout } from '../../feature/auth/authSlice.js';
import { validateFormCheck, validateSignupCheck } from '../../utils/validate.js';
import { axiosPost } from '../../utils/dataFetch.js';
import { getCartCount } from '../../feature/cart/cartAPI.js';
import { updateCartCount, resetCartCount } from '../../feature/cart/cartSlice.js';

/**
    ID 중복 체크
*/
export const getIdCheck = (id) => async(dispatch) => {
    const data = { "id": id };
    const url = "/member/idCheck";
    const result = await axiosPost(url, data);

    return result;
}

/**
    SignUp
*/
export const getSignUp = (formData, param) => async(dispatch) => {
    let result = null;
    if(validateSignupCheck(param)){
        console.log("submit => ", formData);

        const url = "/member/signUp";
        result = await axiosPost(url, formData);
        console.log("result => ", result);
    }

    return result;
}

/**
    Login
*/
export const getLogin = (formData, param) => async(dispatch) => {
    if(validateFormCheck(param)) {
        const url = "/member/login";
        const result = await axiosPost(url, formData);
        console.log("result => ", result);
        if(result) {
            dispatch(login({"userId":formData.id}));
            //장바구니 카운트 함수 호출
//            const count = await getCartCount(formData.id);
//            console.log("count => ", count);

            //cartSlice > updateCartCount : dispatch 호출
            dispatch(getCartCount(formData.id));
            return true;
        }
    }
    return false;
}

/**
    Logout
*/
export const getLogout = () => async(dispatch) => {
    const url = "/member/logout";
    const result = await axiosPost(url, {});

    if(result) {
        dispatch(logout());
        dispatch(resetCartCount());
    }
    return result;
}