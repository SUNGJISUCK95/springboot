package com.springboot.shoppy_fullstack_app.repasitory;

import com.springboot.shoppy_fullstack_app.dto.Product;
import com.springboot.shoppy_fullstack_app.dto.ProductDetailinfo;
import com.springboot.shoppy_fullstack_app.dto.ProductQna;
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
//        System.out.println("repository ==> ");
        String sql = "select pid, name, price, info, rate, trim(image) as image, imgList from product";
        //trim()은 공백을 제거해줌 (as로 컬럼명 따로 지정해줘야 사용가능)
        List<Product> list = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Product.class));

        return list;
    }

    @Override
    public Product findByPid(int pid) {
//        System.out.println("repository ==> ");
        String sql = "select pid, name, price, info, rate, trim(image) as image, imgList from product where pid = ?";
        //trim()은 공백을 제거해줌 (as로 컬럼명 따로 지정해줘야 사용가능)
        Product product = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Product.class), pid);

        return product;
    }

    @Override
    public ProductDetailinfo findDetailinfo(int pid) {
//        System.out.println("repository ==> ");
        String sql = "select did, title_en as titleEn, title_ko as titleKo, pid, list from product_detailinfo where pid = ?";
        ProductDetailinfo productDetailinfo = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(ProductDetailinfo.class), pid);

        return productDetailinfo;
    }

    @Override
    public List<ProductQna> findQna(int pid) { /** 받는 값이 여래개일때 List<>타입으로 지정*/
        System.out.println("repository ==> ");
        String sql = "select qid, title, content, is_complete as isComplete, is_lock as isLock, id, pid, cdate from product_qna where pid = ?";

        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ProductQna.class), pid);
        /** 이렇게 줄여서 사용해도 됨 */
        /** 받는 값이 여래개일때 jdbcTemplate.query()로 지정*/
    }
}
