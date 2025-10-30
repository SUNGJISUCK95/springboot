package com.springboot.shoppy_fullstack_app.repasitory;

import com.springboot.shoppy_fullstack_app.dto.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

@Repository
public class JdbcTemplateMemberRepasitory implements  MemberRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public JdbcTemplateMemberRepasitory(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource); //커넥션 생성
    }

    @Override
    public int save(Member member){
//        System.out.println("-- memberRepository.save --");
//        System.out.println(member.getId());
//        System.out.println(member.getPwd());
//        System.out.println(member.getUname());
//        System.out.println(member.getPhone());
//        System.out.println(member.getEmailName());

        //jdbcTemplate객체를 이용하여 DB의 member 테이블에 insert
        String sql = "insert into member(id,pwd,name,phone,emailName,mdate) values (?,?,?,?,?,now())";

        //Object여야 숫자, 문자 데이터 전부 가능함
        Object [] param = {
                            member.getId(),
                            member.getPwd(),
                            member.getUname(),
                            member.getPhone(),
                            member.getEmailName()
                           };

        int rows = jdbcTemplate.update(sql, param);
        System.out.println("rows => " + rows); // sout = System.out.println(); 단축키

        return rows;
    }

    @Override
    public Long findById(String id){
        String sql = "SELECT count(*) FROM member WHERE id=? ";

        //값을 하나 찾을때 사용
        //각 타입의 제일 큰 것으로 데이터를 받는다 ex) 숫자는 Long 타입 사용
        Long count = jdbcTemplate.queryForObject(sql, Long.class, id);


        return count;
    }

    @Override
    public String login(String id){
        String sql = "select ifnull(MAX(pwd), null) as pwd from member where id = ?";
        String encodePwd = jdbcTemplate.queryForObject(sql, String.class, id);
        return encodePwd;

        //값을 여러개 찾을때 사용
//        Member member = jdbcTemplate.queryForObject(sql,
//                                    new BeanPropertyRowMapper<>(Member.class),  //RowMapper<T>
//                                    id);
//        return member.getPwd();
    }
}
