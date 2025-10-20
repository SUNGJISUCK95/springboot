package com.springboot.shoppy_fullstack_app.repasitory;

import com.springboot.shoppy_fullstack_app.dto.Product;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class jdbcTemplateProductRepository implements ProductRepository{
    private JdbcTemplate jdbcTemplate;

    public jdbcTemplateProductRepository(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public List<Product> findAll() {
        System.out.println("repository ==> ");
        String sql = "select pid, name, price, info, rate, trim(image) as image, imgList from product";
        //trim()은 공백을 제거해줌 (as로 컬럼명 따로 지정해줘야 사용가능)
        List<Product> list = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Product.class));

        return list;
    }

    @Override
    public Product findByPid(int pid) {
        System.out.println("repository ==> ");
        String sql = "select pid, name, price, info, rate, trim(image) as image, imgList from product where pid=?";
        //trim()은 공백을 제거해줌 (as로 컬럼명 따로 지정해줘야 사용가능)
        Product product = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Product.class));

        return product;
    }
}
