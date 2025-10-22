package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.CartItem;
import com.springboot.shoppy_fullstack_app.repasitory.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService{
    private CartRepository cartRepository;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository){
        this.cartRepository = cartRepository;
    }

    @Override
    public int add(CartItem cartItem) {
        return cartRepository.add(cartItem);
    }

    @Override
    public CartItem checkQty(CartItem cartItem) {
//        System.out.println("service => ");
        return cartRepository.checkQty(cartItem);
    }

    @Override
    public int updateQty(CartItem cartItem) {
        System.out.println("service => ");
        return cartRepository.updateQty(cartItem);
    }
}
