package com.springboot.deploy.controller;

import com.springboot.deploy.dto.Member;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class MemberController {
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/login")
    public String login(Member member,
                        Model model) {

        String result = "";
        if(member.getId().equals("test") && member.getPass().equals("1234")){
            result = "로그인 성공";
        }else {
            result = "로그인 실패";
        }

        model.addAttribute("result", result);

        return "loginResult";
    }

    @GetMapping("/signUp")
    public String signUp() {
        return "signUp";
    }

    @PostMapping("/signUp")
    public String signUp(Member member,
                         Model model) {

        String result = "";
        if(member.getId().equals("") || member.getPass().equals("") || member.getName().equals("") || member.getAddress().equals("")){
            result = "회원가입 실패";
        }else {
            result = "회원가입 성공";
        }

        model.addAttribute("result", result);
        model.addAttribute("Member", member);

        return "signUpResult";
    }
}
