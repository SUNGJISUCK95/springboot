import React, { useState, useRef, useMemo, createRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateSignupCheck } from '../utils/validate.js';
import { initForm } from '../utils/init.js';
import { axiosPost } from '../utils/dataFetch.js';

export function Signup() {
    const navigate = useNavigate();

    const initArray = ["id", "pwd", "cpass", "uname", "phone", "emailName", "emailDomain"];
//     const initArray2 = ["id", "pwd", "cpass", "uname", "phone", "emailName", "emailDomain", "msgId", "msgPass", "msgCpass", "msgUname", "msgPhone", "msgEmailName", "msgEmailDomain"];

    const refs = useMemo(() => {
        return initArray.reduce((acc, curValue) => {
            acc[`${curValue}Ref`] = React.createRef(null);//useRef(null);
            return acc;
        }, {}); 
    });

    const [form, setForm] = useState(initForm(initArray));
    const [msg, setMsg] = useState(initForm(initArray));

    const handleChangeForm = (event) => {
        const {name, value} = event.target;
        // console.log(name, value);
        setForm({...form, [name]:value});
        
        setMsg(initForm(initArray)); //setMsg 입력값 초기화
    }

    const handleResetForm = () => {
        setForm(initForm(initArray)); //setForm 입력값 초기화
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const param = { //오브젝트 리터럴(Object Literal) - object 형태로 매개변수들을 묶어서 사용
            refs: refs,
            setMsg: setMsg
        }
        
        if(validateSignupCheck(param)){
            console.log("submit => ", form);

            /**
                Springboot 연동 - Post, /member/signUp
             */

            const url = "http://localhost:8080/member/signUp";
            const formData = { ...form, email: form.emailName.concat('@', form.emailDomain)}
            console.log('formData -> ', formData);
            const result = await axiosPost(url, formData);
            console.log(result);

            if(result){
                alert("회원가입에 성공하셨습니다.");
                navigate("/login");
            } else {
                alert("회원가입에 실패, 확인후 다시 진행해주세요.");
                setForm(initForm(initArray));
            }
        }
        
    }

    // console.log(form);

    /** 아이디 중복체크 */
    const handleDupulicateIdCheck = async () => {
        console.log(form.id);

        const url = "http://localhost:8080/member/idCheck";
        const data = { "id": form.id };
        const result = await axiosPost(url, data);
        alert(result);
    }
    return (
    <div className="content">
        <div className="join-form center-layout">
            <h1 className="center-title">회원가입(React)</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    <li>
                        <label for="" ><b>아이디</b></label>
                        <span ref={refs.msgIdRef}>{msg.id}</span>
                        <div>
                            <input type="text" 
                                    name="id"                        
                                    value={form.id}
                                    ref = {refs.idRef}
                                    onChange={handleChangeForm}
                                    placeholder = "아이디 입력(6~20자)" />
                            <button type="button"
                                    onClick={handleDupulicateIdCheck}
                                  > 중복확인</button>
                            <input type="hidden" id="idCheckResult" value="default" />
                        </div>
                    </li>
                    <li>
                        <label for=""><b>비밀번호</b></label>
                        <span ref={refs.msgPwdRef}>{msg.pwd}</span>
                        <div>
                            <input type="password"
                                    name="pwd"
                                    value={form.pwd} //name과 key값이 명칭이 같아야 함
                                    ref = {refs.pwdRef}
                                    onChange={handleChangeForm}
                                    placeholder="비밀번호 입력(문자,숫자,특수문자 포함 6~12자)"/>
                        </div>
                    </li>
                    <li>
                        <label for=""><b>비밀번호 확인</b></label>
                        <span ref={refs.msgCpassRef}>{msg.cpass}</span>
                        <div>
                            <input type="password" 
                                    name="cpass"
                                    value={form.cpass} //name과 key값이 명칭이 같아야 함
                                    ref = {refs.cpassRef}
                                    onChange={handleChangeForm}
                                    placeholder="비밀번호 재입력"/>
                        </div>
                    </li>
                    <li>
                        <label for=""><b>이름</b></label>
                        <span ref={refs.msgUnameRef}>{msg.uname}</span>
                        <div>
                            <input type="text" 
                                    name="uname"
                                    value={form.uname}
                                    ref = {refs.unameRef}
                                    onChange={handleChangeForm}
                                    placeholder="이름을 입력해주세요"/>
                        </div>
                    </li>
                    <li>
                        <label for=""><b>전화번호</b></label>
                        <span ref={refs.msgPhoneRef}>{msg.phone}</span>
                        <div>
                            <input type="text" 
                                    name="phone"
                                    value={form.phone}
                                    ref = {refs.phoneRef}
                                    onChange={handleChangeForm}
                                    placeholder="휴대폰 번호 입력('-' 포함)"/>
                        </div>
                    </li>
                    <li>
                        <label for=""><b>이메일 주소</b></label>
                        <span ref={refs.msgEmailNameRef}>{msg.emailName}</span>
                        <div>
                            <input type="text" 
                                    name="emailName"
                                    value={form.emailName}
                                    ref = {refs.emailNameRef}
                                    onChange={handleChangeForm}
                                    placeholder="이메일 주소"/>
                            <span>@</span>       
                            <select name="emailDomain" 
                                    value={form.emailDomain}
                                    ref = {refs.emailDomainRef}
                                    onChange={handleChangeForm}
                                    >
                                <option value="default">선택</option>
                                <option value="naver.com">naver.com</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="daum.net">daum.net</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <button type="submit">가입하기</button>
                        <button type="reset" onClick={handleResetForm}>가입취소</button>
                    </li>
                </ul>
            </form>
        </div>
    </div>
    );
}

