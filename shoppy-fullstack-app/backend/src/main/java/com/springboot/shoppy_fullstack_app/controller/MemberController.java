package com.springboot.shoppy_fullstack_app.controller;

import com.springboot.shoppy_fullstack_app.dto.Member;
import com.springboot.shoppy_fullstack_app.service.MemberService;
import com.springboot.shoppy_fullstack_app.service.MemberServiceImpl;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
    public ResponseEntity<?> login(@RequestBody Member member, HttpServletRequest request) {
        //객체 타입을 모를경우<?>으로 지정
        //HttpServletRequest request에 브라우저 정보가 담겨온다.

        ResponseEntity<?> response = null;
        boolean result = memberService.login(member);
        if(result) {
            //세션 생성 - true, 빈값은 생성 파라미터   ex) getSession(true)
            //기존 세션 가져오기 - false   ex) getSession(false)
            HttpSession session = request.getSession(true);
            session.setAttribute("sid", "hong");
            response = ResponseEntity.ok(Map.of("login", true));
        }else{
            response = ResponseEntity.ok(Map.of("login", false));
        }

        return response;
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        String ssid = session.getId();
        String sid = (String)session.getAttribute("sid");
//        ResponseEntity<?> response = null;

        if(ssid != null && sid != null){
            session.invalidate(); //세션 삭제(무효화) - 스프링의 세션 테이블에서 삭제됨 //Application의 Session은 삭제 안됨

            var cookie = new Cookie("JSESSIONID", null);
            cookie.setPath("/");                // <- 기존과 동일
            cookie.setMaxAge(0);                // <- 즉시 만료
            cookie.setHttpOnly(true);           // 개발 중에도 HttpOnly 유지 권장
            //cookie.setSecure(true);           // HTTPS에서만. 로컬 http면 주석
            //cookie.setDomain("localhost");    // 기존 쿠키가 domain = localhost 였다면 지정
            response.addCookie(cookie);

            System.out.println("session delete complete");
        }

        return ResponseEntity.ok(true);
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
