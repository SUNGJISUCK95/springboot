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
SELECT count(*) FROM member WHERE id='test' AND pwd='1234';

use shoppy;
select database();
show tables;
select * from member;
desc member;

-- pwd 사이즈 변경
alter table member modify column pwd varchar(100) not null;
desc member;

-- mysql은 수정, 삭제 시 update mode를 변경
SET SQL_SAFE_UPDATES = 0;

DELETE FROM member WHERE mdate = '2025-10-17';
SELECT * FROM member;

SELECT pwd FROM member WHERE id = 'hong';
SELECT count(*) From member WHERE id = 'hong';

/****************************************
		상품 테이블 생성 : product
****************************************/

-- "pid" : "1",
-- "image" : "/images/1.webp",
-- "name" : "후드티",
-- "price": 15000,
-- "info" : "분홍색 후드티",
-- "rate": "4.2",
-- "imgList" : [
--     "/images/1.webp",
--     "/images/1.webp",
--     "/images/1.webp"
-- ]

create table product(
	pid		int				auto_increment primary key,
    name	varchar(200)	not null,
    price	long,
    info	varchar(200),
    rate	double,
    image	varchar(100),
    imgList	json
);

desc product;
select * from product;

-- 하나만 insert 
insert into product(name, price, info, rate, image, imgList) values("후드티", 15000, "분홍색 후드티", "4.2", "1.webp", JSON_Array("1.webp", "1.webp", "1.webp"));

-- 여러개 insert
insert into product(name, price, info, rate, image, imgList) values("후드티", 15000, "검정색 후드티", "2.2", "2.webp", JSON_Array("2.webp", "2.webp", "2.webp")),
																   ("원피스", 25000, "원피스", "4", "3.webp", JSON_Array("3.webp", "3.webp", "3.webp")),
																   ("반바지", 12000, "반바지", "3.2", "4.webp", JSON_Array("4.webp", "4.webp", "4.webp")),
																   ("티셔츠", 20000, "티셔츠", "5", "5.webp", JSON_Array("5.webp", "5.webp", "5.webp")),
																   ("스트레치 비스트 드레스", 55000, "스트레치 비스트 드레스", "3", "6.webp", JSON_Array("6.webp", "6.webp", "6.webp")),
																   ("자켓", 115000, "자켓", "3.5", "7.webp", JSON_Array("7.webp", "7.webp", "7.webp"));


select pid, name, price, info, rate, image, imgList from product where pid = 1;