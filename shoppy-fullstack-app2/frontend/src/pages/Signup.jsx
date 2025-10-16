import React, { useState, useRef, useMemo, createRef } from 'react';
import { validateSignupCheck } from '../utils/validate.js';
import { initForm } from '../utils/init.js';

export function Signup() {
    const initArray = ["id", "pass", "cpass", "uname", "phone", "emailName", "emailDomain"];
    const initArray2 = ["id", "pass", "cpass", "uname", "phone", "emailName", "emailDomain", "msgId", "msgPass", "msgCpass", "msgUname", "msgPhone", "msgEmailName", "msgEmailDomain"];

    // const refs = {
    //     idRef: useRef(null),
    //     passRef: useRef(null),
    //     cpassRef: useRef(null),
    //     unameRef: useRef(null),
    //     phoneRef: useRef(null),
    //     emailNameRef: useRef(null),
    //     emailDomainRef:useRef(null),
    //     msgIdRef: useRef(null),
    //     msgPassRef: useRef(null),
    //     msgCpassRef: useRef(null),
    //     msgUnameRef: useRef(null),
    //     msgPhoneRef: useRef(null),
    //     msgEmailNameRef: useRef(null),
    //     msgEmailDomainRef:useRef(null)
    // }
    // 를 함수로 자동 생성한게 아래 코드

    const refs = useMemo(() => {
        return initArray2.reduce((acc, curValue) => {
            acc[`${curValue}Ref`] = React.createRef(null);//useRef(null);
            return acc;
        }, {}); 
    });
    
    // const initForm = {
    //     id:'',
    //     pass:'',
    //     cpass:'',
    //     uname:'',
    //     phone:'',
    //     emailName:'',
    //     emailDomain:'default'
    // }
    // 를 함수로 자동 생성한 코드 : initForm(initArray) //init.js에 있음

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

    const handleSubmit = (event) => {
        event.preventDefault();

        const param = { //오브젝트 리터럴(Object Literal) - object 형태로 매개변수들을 묶어서 사용
            refs: refs,
            setMsg: setMsg
        }
        
        if(validateSignupCheck(param)){
            console.log("submit => ", form);
        }
        
    }

    // console.log(form);
    
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
                                  > 중복확인</button>
                            <input type="hidden" id="idCheckResult" value="default" />
                        </div>
                    </li>
                    <li>
                        <label for=""><b>비밀번호</b></label>
                        <span ref={refs.msgPassRef}>{msg.pass}</span>
                        <div>
                            <input type="password" 
                                    name="pass"
                                    value={form.pass} //name과 key값이 명칭이 같아야 함
                                    ref = {refs.passRef}
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

