package com.springboot.shoppy_fullstack_app.repasitory;

import com.springboot.shoppy_fullstack_app.dto.Support;

import java.util.List;

public interface SupportRepository {
    List<Support> findAll();
    List<Support> findAll(Support support);
}
