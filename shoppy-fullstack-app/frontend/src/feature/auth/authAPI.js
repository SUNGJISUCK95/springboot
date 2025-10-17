import { login, logout } from '../../feature/auth/authSlice.js';
import { validateFormCheck, validateSignupCheck } from '../../utils/validate.js';
import { axiosPost } from '../../utils/dataFetch.js';

/**
    ID 중복 체크
*/
export const getIdCheck = (id) => async(dispatch) => {
    const data = { "id": id };
    const url = "http://localhost:8080/member/idCheck";
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

        const url = "http://localhost:8080/member/signUp";
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
        /**
            SpringBoot - @RestController, @PostMapping("/member/login") 로 넘겨야함

            axios 사용함
            ex) // POST 요청 전송
                axios({
                  method: 'post',
                  url: '/user/12345',
                  data: {
                    firstName: 'Fred',
                    lastName: 'Flintstone'
                  }
                });
                또는
                axios.post(url[, data[, config]])
        */
        const url = "http://localhost:8080/member/login";
        const result = await axiosPost(url, formData);
        if(result) {
            dispatch(login({"userId":formData.id}));
            return true;
        }
    }
    return false;
}

export const getLogout = () => async(dispatch) => {
    dispatch(logout());
    return true;
}