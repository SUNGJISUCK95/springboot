package com.springboot.study.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DemoController {
    @GetMapping("/demo")
    public  String  demo() {
        System.out.println("---> DemoController!!!");
        return "demo";
    }
}
