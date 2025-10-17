/** 데이터베이스 생성 */
create database shoppy;

/** 데이터베이스 열기 */
use shoppy;
select database();

/** 테이블 목록 확인 */
show tables;

/** member 테이블 생성 */
create table member(
--     dto의 Member.java
--     private String id;
--     private String pwd;
--     private String uname;
--     private String phone;
--     private String emailName;
	
    id		  varchar(50) primary key,
    pwd		  varchar(50) not null,
    name	  varchar(20) not null,
    phone	  char(13), -- phone은 char로 13자리 아니면 안되게 고정
    emailName varchar(50) not null,
    mdate     date
);
show tables;
desc member;

SELECT * FROM member;
SELECT count(id) FROM member WHERE id='test';
SELECT count(*) FROM member WHERE id='test' and pwd='1234';