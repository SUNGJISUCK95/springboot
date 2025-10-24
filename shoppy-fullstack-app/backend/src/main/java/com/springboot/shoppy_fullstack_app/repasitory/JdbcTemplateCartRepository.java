package com.springboot.shoppy_fullstack_app.repasitory;

import com.springboot.shoppy_fullstack_app.dto.CartItem;
import com.springboot.shoppy_fullstack_app.dto.CartListRespense;
import com.springboot.shoppy_fullstack_app.dto.ProductReturn;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class JdbcTemplateCartRepository implements CartRepository{
    private JdbcTemplate jdbcTemplate;

    public JdbcTemplateCartRepository(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }
    
    @Override
    public int add(CartItem cartItem){
        //DB연동
        String sql = "insert into cart(size, qty, pid, id, cdate) values(?, ?, ?, ?, now())";

        //Object여야 숫자, 문자 데이터 전부 가능함
        Object [] params = {
                cartItem.getSize(),
                cartItem.getQty(),
                cartItem.getPid(),
                cartItem.getId()
        };

        return jdbcTemplate.update(sql, params);
    }

    @Override
    public CartItem checkQty(CartItem cartItem){
//        System.out.println("repository => ");
        String sql = "SELECT" +
                     " ifnull(MAX(cid), 0) AS cid," +
                     " COUNT(*) AS checkQty" +
                     " FROM cart" +
                     " WHERE pid = ? AND size = ? AND id = ?";

        Object[] params = { cartItem.getPid(), cartItem.getSize(), cartItem.getId() };
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(CartItem.class), params);
    }

    @Override
    public int updateQty(CartItem cartItem){
        String sql = "";
        if(cartItem.getType().equals("+")) {
            sql = "update cart set qty = qty+1 where cid = ?";
        }else {
            sql = "update cart set qty = qty-1 where cid = ?";
        }

        return jdbcTemplate.update(sql, cartItem.getCid());
    }

    @Override
    public CartItem getCount(CartItem cartItem){
//        System.out.println("repository => ");
        String sql = "select ifnull(sum(qty), 0) as sumQty from cart where id = ?";

        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(CartItem.class), cartItem.getId());
    }

    @Override
    public List<CartListRespense> findList(CartItem cartItem) {
        String sql = """
                    select * from view_cartlist where id = ?
                    """;
        Object[] params = { cartItem.getId() };
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(CartListRespense.class), params);
    }

    @Override
    public int deleteItem(CartItem cartItem) {
        String sql = "delete from cart where cid = ?";
        return jdbcTemplate.update(sql, cartItem.getCid());
    }
}
