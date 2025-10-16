import { login, logout } from '../../feature/auth/authSlice.js';
import { validateFormCheck } from '../../utils/validate.js';
import { axiosPost } from '../../utils/dataFetch.js';

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
        const result = axiosPost(url, formData);
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