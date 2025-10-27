package com.springboot.shoppy_fullstack_app.dto;

import lombok.Data;

@Data
public class KakaoReadyResponse {
    //이 변수는 자동으로 만들어주는 부분이므로 변하면 안된다.
    private String tid; // 결제 고유 번호
    private String next_redirect_pc_url; // QR code address
}

