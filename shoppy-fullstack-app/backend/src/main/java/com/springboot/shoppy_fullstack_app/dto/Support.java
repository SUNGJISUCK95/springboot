package com.springboot.shoppy_fullstack_app.dto;

import lombok.Data;

@Data
public class Support {
//    sid	int
//    title	varchar(100)
//    content	varchar(200)
//    stype	varchar(30)
//    hits	int
//    rdate	datetime

    private int sid;
    private String title;
    private String content;
    private String stype;
    private int hits;
    private String rdate;
}
