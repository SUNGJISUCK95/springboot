package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.KakaoPay;
import com.springboot.shoppy_fullstack_app.repasitory.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
//@Transactional
public class OrderServiceImpl implements OrderService{
    private OrderRepository orderRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository){
        this.orderRepository = orderRepository;
    }

    @Override
    @Transactional
    // 원래는 Orders Repository가 성공하고 Detail이 실패하면 Orders 는 데이터가 저장되지만
    // Transactional로 orderDetail Repository의 sql 작업이 실패 시 Orders에도 값이 저장되는 것을 취소시킨다.
    // Transactional은 Orders와 Detail 처럼 sql작업의 결과가 서로 연관되어 실행하는 부분에서 선언해줘야한다. Repository에서 선언 X
    public int save(KakaoPay kakaoPay) {
        int rows = orderRepository.saveOrders(kakaoPay);
        if(!(rows == 1)) { //Orders는 이용자 1명의 정보이므로 1이 아니면으로 선언
            System.out.println("결제 실패");
        }
        int rows_detail = orderRepository.saveOrderDetail(kakaoPay);
        if(!(rows_detail < 1)) { //detail은 복수 값이 리턴되므로 1보다 작으면으로 선언
            System.out.println("결제 실패");
        }

        int rows_cart = orderRepository.deleteCartItem(kakaoPay.getCidList());

        return rows;
    }
}
