package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.CartItem;
import com.springboot.shoppy_fullstack_app.dto.CartListRespense;

import java.util.List;

public interface CartService {
    int add(CartItem cartItem);
    CartItem checkQty(CartItem cartItem);
    int updateQty(CartItem cartItem);
    CartItem getCount(CartItem cartItem);
    List<CartListRespense> findList(CartItem cartItem);
    int deleteItem(CartItem cartItem);
}
