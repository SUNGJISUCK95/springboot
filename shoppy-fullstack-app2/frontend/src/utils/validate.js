/**
 * 회원가입 폼 체크 //Signup.jsx
 */
export function validateSignupCheck(param) {

    const {refs, setMsg} = param; //구조분해할당(Destructuring Assignment) - 매개변수로 받은 object를 변수로 나누어 사용

    if(refs.idRef.current.value === ""){ // refs가 idRef인 태그의 value값 체크
        // alert("아이디를 입력해주세요.");
        setMsg({id: " 아이디를 입력해주세요."});
        // refs.msgIdRef.current.innerText = " 아이디를 입력해주세요";
        refs.idRef.current.focus();
        return false; 
        // 작업이 다시 Signup.jsx(DOM 객체)으로 가야하므로 return false해줌 
        // return false로 해당 if을 빠져나옴
    } else if (refs.passRef.current.value === ""){
        // alert("비밀번호를 입력해주세요.");
        setMsg({pass: " 비밀번호를 입력해주세요."});
        // refs.msgPassRef.current.innerText = " 비밀번호를 입력해주세요";
        refs.passRef.current.focus();
        return false;
    } else if (refs.cpassRef.current.value === ""){
        // alert("비밀번호 확인을 위해 재입력해주세요.");
        setMsg({cpass: " 비밀번호 확인을 위해 재입력해주세요."});
        // refs.msgCpassRef.current.innerText = " 비밀번호 확인을 위해 재입력해주세요.";
        refs.cpassRef.current.focus();
        return false;
    } else if (refs.unameRef.current.value === ""){
        // alert("이름을 입력해주세요.");
        setMsg({uname: " 이름을 입력해주세요."});
        // refs.msgUnameRef.current.innerText = " 이름을 입력해주세요";
        refs.unameRef.current.focus();
        return false;
    } else if (refs.phoneRef.current.value === ""){
        // alert("전화번호를 입력해주세요.");
        setMsg({phone: " 전화번호를 입력해주세요."});
        // refs.msgPhoneRef.current.innerText = " 전화번호를 입력해주세요";
        refs.phoneRef.current.focus();
        return false;
    } else if (refs.emailNameRef.current.value === ""){
        // alert("이메일을 입력해주세요.");
        setMsg({emailName: " 이메일을 입력해주세요."});
        // refs.msgEmailRef.current.innerText = " 이메일을 입력해주세요";
        refs.emailNameRef.current.focus();
        return false;
    } else if (refs.emailDomainRef.current.value === "default"){
        // alert("이메일 도메인을 선택해주세요.");
        setMsg({emailName: " 이메일 도메인을 선택해주세요."});
        // refs.msgEmailRef.current.innerText = " 이메일 도메인을 선택해주세요.";
        refs.emailDomainRef.current.focus();
        return false;
    }
    return true;
}


/**
 * 로그인 폼 체크 //Login2.jsx
 */
export const validateFormCheck = ({idRef, pwdRef, errors, setErrors}) => {
    if(idRef.current.value === "") {
        setErrors({...errors, id: "아이디를 입력해주세요."});
        idRef.current.focus();
        return false;
    }else if(pwdRef.current.value === "") {
        setErrors({...errors, pwd: "비밀번호를 입력해주세요."});
        pwdRef.current.focus();
        return false;
    }
    return true;
}
