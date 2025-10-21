package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.Product;
import com.springboot.shoppy_fullstack_app.dto.ProductDetailinfo;
import com.springboot.shoppy_fullstack_app.dto.ProductQna;
import com.springboot.shoppy_fullstack_app.repasitory.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductServiceImpl implements ProductService{
    private ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> findAll(){
//        System.out.println("service ==> ");
        List<Product> list = productRepository.findAll();
        return list;
    }

    @Override
    public Product findByPid(int pid){
//        System.out.println("service ==> ");
        Product list = productRepository.findByPid(pid);
        return list;
    }

    @Override
    public ProductDetailinfo findDetailinfo(int pid) {
//        System.out.println("service ==> ");
        return productRepository.findDetailinfo(pid);
    }

    @Override
    public List<ProductQna> findQna(int pid) {
        System.out.println("service ==> ");
        return productRepository.findQna(pid);
    }
}
