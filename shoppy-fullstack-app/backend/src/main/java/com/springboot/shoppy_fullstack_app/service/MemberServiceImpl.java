package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.Member;
import com.springboot.shoppy_fullstack_app.repasitory.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service //memberServiceImpl //싱글톤(Singleton) 패턴 : 효율성 있게 객체를 관리하기 위해
@Transactional //DB가 auto-commit 모드이면 생략 가능 //Oracel 사용할 경우 필요 (Mysql은 생략가능)
public class MemberServiceImpl implements MemberService{ //MemberService memberService

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public MemberServiceImpl(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public int signUp(Member member) {
//        System.out.println("-- memberService.signUsp --");
//        System.out.println(member.getId());
//        System.out.println(member.getPwd());
//        System.out.println(member.getUname());
//        System.out.println(member.getPhone());
//        System.out.println(member.getEmailName());
        //패스워드 인코딩
        String encodePwd = passwordEncoder.encode(member.getPwd()); //UUID타입으로 생성됨
        member.setPwd(encodePwd);
//        System.out.println("encodePwd => " + encodePwd);
        return memberRepository.save(member);
    }


    @Override
    public boolean idCheck(String id) {
        boolean result = false;
        Long count = memberRepository.findById(id);
        System.out.println("count => " + count);

        if(count == 0){
            result = false;
        }else {
            result = true;
        }

        return result;
    }

    @Override
    public boolean login(Member member){
        String encodePwd = memberRepository.login(member.getId());
//        System.out.println(encodePwd);
        boolean result = passwordEncoder.matches(member.getPwd(), encodePwd);
        //frontend에서 가져온 encode된 pwd하고 sql에 저장되어있는 회원의 pwd를 encode해서 같은지 비교한다.

        return result;
    }
}
