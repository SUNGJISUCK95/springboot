package com.springboot.study.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class HelloController {
    /**
     * http로 호출하는 서비스 context path 주소를 매핑하는 작업
     * 예) /hello
     */
    @GetMapping("/hello")
    /** localhost:8080 다음에 붙는 주소 */
    /** ()안의 값이 return값이다. */
    /** Mapping 주소는 유일해야 한다. (다른 Controller에서 중복 불가능) */
    @PostMapping("/spring") /** 다른 형식의 Mapping이면 다른 Controller에서도 사용가능 */
    public String hello(Model model) { /** Model model = 값; 처럼 지정없이 bean factory에서 자동으로 만들어줌 */
//        System.out.println("---> HelloController!!!");
        model.addAttribute("pathName",  "hello");
        model.addAttribute("data", "홍길동");
        return "hello"; //호출 경로 ex) hello.html
    }

    @GetMapping("/hello2")
    public String hello2(Model model) {
//        System.out.println("---> HelloController2!!!");
        model.addAttribute("pathName", "hello2");
        model.addAttribute("data", "홍길동 친구");
        return "hello";
    }
}
