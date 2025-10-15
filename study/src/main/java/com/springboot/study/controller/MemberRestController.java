package com.springboot.study.controller;

import com.springboot.study.dto.Member;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController /** 내부에 @ResponseBody 포함 (@ResponseBody 생략 가능) */
                /** Map 객체 생성 없이 JSON 객체 바로 전송 */
public class MemberRestController {
    @PostMapping("/restLogin")
    // @ResponseBody
    /** @ResponseBody로 restLogin의 response의 POST로 보낸 값을 받음 */
    public Map<String, Object> restLogin(@RequestBody Member member) { /** @RequestBody로 받은 값 사용 */
        //System.out.println(member.getId());
        //System.out.println(member.getPass());

        boolean result = false;
        if(member.getId().equals("test") && member.getPass().equals("1234")) {
            result = true;
        }

        /** Map 객체를 생성하여 전송 --> 자동으로 JSON 객체로 변환 */
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("result", result);
        response.put("member", member);

        return response; /** @ResponseBody가 없을때는 view name이지만 */
                         /**                 있을때는 호출한 페이지로 문자열 혹은 JSON 개체를 전송한다. { "result": true } */
                         /**                                         (response로 값을 보냈다는거임) */

    }

    @PostMapping("/restSignUp")
    public Map<String, Object> restSignUp(@RequestBody Member member) {

        boolean result = false;
        if(member.getId().equals("") || member.getPass().equals("") || member.getName().equals("") || member.getAddress().equals("")) {
            result = false;
        }else {
            result = true;
        }

        Map<String, Object> responce = new HashMap<String, Object>();
        responce.put("result", result);
        responce.put("member", member);

        return responce;
    }
}
