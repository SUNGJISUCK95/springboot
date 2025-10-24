package com.springboot.shoppy_fullstack_app.repasitory;

import com.springboot.shoppy_fullstack_app.dto.Support;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class JdbcTemplateSupportRepository implements SupportRepository{
    private  JdbcTemplate jdbcTemplate;

    public JdbcTemplateSupportRepository(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public List<Support> findAll(){
        String sql = """
                    select sid, title, stype, hits, rdate from support
                    """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Support.class)); //List<> 타입은 무조건 query()임
    }

    @Override
    public List<Support> findAll(Support support){
        String sql = """
                    select sid, title, stype, hits, rdate from support where stype= ?
                    """;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Support.class), support.getStype()); //List<> 타입은 무조건 query()임
    }
}
