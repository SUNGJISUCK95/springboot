package com.springboot.shoppy_fullstack_app.dto;

import lombok.Data;

@Data
public class ProductDetailinfo {
//    did	int
//    title_en	varchar(100)
//    title_ko	varchar(100)
//    pid	int
//    list	json

    private int did;
    private int pid;
    private String titleEn;
    private String titleKo;
    private String list;
}
