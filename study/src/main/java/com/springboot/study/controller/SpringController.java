package com.springboot.study.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class SpringController {
    @GetMapping("/spring")
    /** localhost:8080 다음에 붙는 주소 */
    /** ()안의 값이 return값이다. */
    /** Mapping 주소는 유일해야 한다. (다른 Controller에서 중복 불가능) */
    @PostMapping("/hello") /** 다른 형식의 Mapping이면 다른 Controller에서도 사용가능 */
    public  String  spring() {
        return "spring";
    }
}
