package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.Member;
import com.springboot.shoppy_fullstack_app.repasitory.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service //memberServiceImpl //싱글톤(Singleton) 패턴 : 효율성 있게 객체를 관리하기 위해
public class MemberServiceImpl implements MemberService{ //MemberService memberService

    private final MemberRepository memberRepository;

    @Autowired
    public MemberServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public int signUp(Member member) {
//        System.out.println("-- memberService.signUsp --");
//        System.out.println(member.getId());
//        System.out.println(member.getPwd());
//        System.out.println(member.getUname());
//        System.out.println(member.getPhone());
//        System.out.println(member.getEmailName());

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
}
