import React from "react";
import { createProduct, filterProduct } from "./productSlice.js";
import { axiosData, groupByRows, axiosGet, axiosPost } from "../../utils/dataFetch.js";

export const getProductList = (number) => async(dispatch) => {
//    const jsonData = await axiosData("/data/products.json"); //비동기 //JSON 경우
    const url = "/product/all"; //DB 경우
    const jsonData = await axiosGet(url);
//    console.log("jsonData ==> ", jsonData);

    const rows = groupByRows(jsonData, number); //groupByRows()로 1차원인 jsonData를 2차원 배열로 변경한다 //dataFetch.js에 있음
    dispatch(createProduct({"productList": rows, "products": jsonData}));
}

export const getProduct = (pid) => async(dispatch) => {
    const url = "/product/pid";
    const product = await axiosPost(url, {"pid":pid});
//    console.log("product ==> ", product);
    dispatch(filterProduct({"product":product}));
}

/**
    상품 상세 정보
*/
export const getDetailinfo = async(pid) => {
    const url = "/product/detailinfo";
    const info = await axiosPost(url, {"pid":pid});
//    console.log("detailinfo ==> ", info);
    const list = JSON.parse(info.list);
//    console.log("list ==> ", list);

    return { ...info, list: list };
}

/**
    상품 QnA
*/
export const getQna = async(pid) => {
    const url = "/product/qna";
    const qna = await axiosPost(url, {"pid":pid});
    console.log("qna ==> ", qna);

    return qna;
}