package com.springboot.shoppy_fullstack_app.dto;

import lombok.Data;

@Data
public class Member {
    private String id;
    private String pwd;
    private String uname;
    private String phone;
    private String emailName;
}
