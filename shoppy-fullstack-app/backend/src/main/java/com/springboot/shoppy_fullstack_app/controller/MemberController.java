package com.springboot.shoppy_fullstack_app.controller;

import com.springboot.shoppy_fullstack_app.dto.Member;
import com.springboot.shoppy_fullstack_app.service.MemberService;
import com.springboot.shoppy_fullstack_app.service.MemberServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
//@CrossOrigin(origins = {"http://localhost:3000"})
public class MemberController {

    //서비스 객체 가져오기
    private final MemberService memberService;

    @Autowired //@Autowired가 없으면 위 코드가 private final MemberService memberService = new MemberService(); 가 되어야한다.
    public MemberController(MemberService memberService) { // (MemberService memberService)로 가져오는게 injection 작업
//      this.memberService = 컨테이너에 생성된 서비스 객체;
        this.memberService = memberService;
    }

    @PostMapping("/login")
    public boolean login(@RequestBody Member member) {
        boolean result = false;
//        System.out.println(member.getId()); //단축키 sout
//        System.out.println(member.getPass());

        return result;
    }

    @PostMapping("/signUp")
    public boolean signUp(@RequestBody Member member) {
//        System.out.println("-- memberController.signUp --");
//        System.out.println(member.getId());
//        System.out.println(member.getPwd());
//        System.out.println(member.getUname());
//        System.out.println(member.getPhone());
//        System.out.println(member.getEmailName());

        boolean result = false;

        int rows = memberService.signUp(member);
        if(rows == 1){
            result = true;
        }else {
            result = false;
        }

        return result;
    }

    @PostMapping("/idCheck")
    public String idCheck(@RequestBody Member member) {
        boolean result = memberService.idCheck(member.getId());

        String msg = "";

        if(result) {
            msg = "이미 사용중인 아이디 입니다.";
        }else {
            msg = "사용 가능한 아이디 입니다.";
        }
        return msg;
    }
}
