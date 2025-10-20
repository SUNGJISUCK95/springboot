package com.springboot.shoppy_fullstack_app.dto;

import lombok.Data;

@Data
public class Product {
//    pid	int
//    name	varchar(200)
//    price	mediumtext
//    info	varchar(200)
//    rate	double
//    image	varchar(100)
//    imgList	json
    private int pid;
    private String name;
    private long price;
    private String info;
    private double rate;
    private String image;
    private String imgList;
}
