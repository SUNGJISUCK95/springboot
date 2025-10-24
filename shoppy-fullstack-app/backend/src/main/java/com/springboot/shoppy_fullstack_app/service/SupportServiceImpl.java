package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.Support;
import com.springboot.shoppy_fullstack_app.repasitory.SupportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class SupportServiceImpl implements SupportService{
    private SupportRepository supportRepository;

    @Autowired
    public SupportServiceImpl(SupportRepository supportRepository){
        this.supportRepository = supportRepository;
    }

    @Override
    public List<Support> findAll(@RequestBody Support support) {
        List<Support> list = null;
        if(support.getStype().equals("all")){
            list = supportRepository.findAll();
        }else {
            list = supportRepository.findAll(support);
        }
        return list;
    }
}
