package com.springboot.shoppy_fullstack_app.dto;

import lombok.Data;

@Data
public class ProductReturn {
//    rid	int
//    title	varchar(100)
//    description	varchar(200)
//    list	json

    private int rid;
    private String title;
    private String description;
    private String list; //View에 들어 갈때는 List<> 타입 //React에 보내는 거면 String 타입
}
