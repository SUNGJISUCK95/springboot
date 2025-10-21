package com.springboot.shoppy_fullstack_app.dto;

import lombok.Data;

@Data
public class ProductQna {
//    qid	int
//    title	varchar(100)
//    content	varchar(200)
//    is_complete	tinyint(1)
//    is_lock	tinyint(1)
//    id	varchar(50)
//    pid	int
//    cdate	datetime

    private int qid;
    private int pid;
    private String title;
    private String content;
    private String id;
    private String cdate;
    private boolean isComplete;
    private boolean isLock;
}
