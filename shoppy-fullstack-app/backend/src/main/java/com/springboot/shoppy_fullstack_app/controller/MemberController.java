package com.springboot.shoppy_fullstack_app.controller;

import com.springboot.shoppy_fullstack_app.dto.Member;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
@CrossOrigin(origins = {"http://localhost:3000"})
public class MemberController {
    @PostMapping("/login")
    public boolean login(@RequestBody Member member) {
        boolean result = false;
//        System.out.println(member.getId()); //단축키 sout
//        System.out.println(member.getPass());

        if(member.getId().equals("test") && member.getPwd().equals("1234")) {
            result = true;
        }

        return result;
    }

    @PostMapping("/signUp")
    public boolean signUp(@RequestBody Member member) {
        boolean result = false;
        System.out.println(member.getId());
        System.out.println(member.getPwd());
        System.out.println(member.getUname());
        System.out.println(member.getPhone());
        System.out.println(member.getEmailName());

        if(member.getId().equals("") || member.getPwd().equals("") || member.getUname().equals("") || member.getPhone().equals("") || member.getEmailName().equals("")) {
            result = false;
        }else {
            result = true;
        }

        return result;
    }

    @PostMapping("/idCheck")
    public String idCheck(@RequestBody Member member) {
        boolean result = false;
        String msg = "이미 사용중인 아이디 입니다.";

        if(member.getId().equals("test")){
            result = true;
        }else {
            result = false;
        }

        if(result) {
            msg = "이미 사용중인 아이디 입니다.";
        }else {
            msg = "사용 가능한 아이디 입니다.";
        }
        return msg;
    }
}
