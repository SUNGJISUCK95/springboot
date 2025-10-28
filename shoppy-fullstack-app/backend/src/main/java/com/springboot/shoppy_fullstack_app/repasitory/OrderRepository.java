package com.springboot.shoppy_fullstack_app.repasitory;

import com.springboot.shoppy_fullstack_app.dto.KakaoPay;

import java.util.List;

public interface OrderRepository {
    int deleteCartItem(List<Integer> cidList);
    int saveOrders(KakaoPay kakaoPay);
    int saveOrderDetail(KakaoPay kakaoPay);
}
