package com.springboot.study.controller;

import com.springboot.study.dto.Member;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MemberController {
    @GetMapping("/login") /**아이디, 패스워드를 입력하는 곳*/
    public String login() {
        return "login"; /**로그인 화면, view name -> templates*/
    }

    /** Spring Legacy 버전 --> ModelAndView 객체를 활용하여 데이터 및 view 전송 (Model의 옛날 방식)
    @PostMapping("/login")
    public ModelAndView login(@RequestParam String id, @RequestParam String pass) {
        ModelAndView model = new ModelAndView();
        String result = "";
        if(id.equals("test") && pass.equals("1234")) {
            result = "[ModelAndView] 로그인 성공";
        }else {
            result = "[ModelAndView] 로그인 실패";
        }
        model.addObject("result", result);
        model.setViewName("loginResult"); //viewName 지정 (원래는 return "loginResult")
        return model;
    }
    */

    /** Model의 현재 사용 방식 */
    @PostMapping("/login") /**입력된 아이디, 패스워드 정보를 받는 곳*/
    public String login(Member member, /** Member.java 주소 받아옴 (injection)*/
                        Model model) {
        /**@RequestParam은 넘어오는 파라미터(데이터) 받는 거다.*/
        /**메소드 이름(login)은 똑같지만 받는 파라미터(id, pass)가 다르므로 오버로딩 가능*/

        //System.out.println("id --> " + id);
        //System.out.println("pass --> " + pass);

        String result = "";
        if(member.getId().equals("test") && member.getPass().equals("1234")) {
            result = "로그인 성공";
        }else {
            result = "로그인 실패";
        }

        model.addAttribute("result", result); /**result 값을 result라는 변수명으로 loginResult에 전송*/

        return "loginResult"; /**view name : templates => loginResult.html*/
    }

    @GetMapping("/signup")
    public String signup() {
        return "signup"; /** 회원가입 화면, view name -> templates */
    }

    @PostMapping("/signup")
    public String signup(Member member,
                          Model model) {

        String result2 = "";
        if(member.getId().equals("") || member.getPass().equals("") || member.getName().equals("") || member.getAddress().equals("")){
            result2 = "회원가입 실패";
        }else {
            result2 = "회원가입 성공";
        }

        model.addAttribute("result2", result2);
        model.addAttribute("member", member);

        return "signUpResult";
    }
}
