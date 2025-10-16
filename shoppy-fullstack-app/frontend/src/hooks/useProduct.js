import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext.js';
import { axiosData, groupByRows } from '../utils/dataFetch.js';

export function useProduct() {
    const {productList, setProductList, product, setProduct, imgList, setImgList} = useContext(ProductContext);
    
    const createProduct = async (number) =>{
        const jsonData = await axiosData("/data/products.json"); //비동기
        const rows = groupByRows(jsonData, number); //groupByRows()로 1차원인 jsonData를 2차원 배열로 변경한다 //dataFetch.js에 있음
        setProductList(rows); //동기
    }

    const filterProduct = async (pid) => {
            const jsonData = await axiosData("/data/products.json");
            const [filterProduct] = jsonData.filter((item) => //filter함수는 실행 결과값으로 새로운 배열을 생성한다.
                item.pid === pid
            );
            setProduct(filterProduct); // 단일 객체
            setImgList(filterProduct?.imgList || []);
            // productList는 변경하지 말거나 빈 배열로 유지하는게 안전
    }

    return { createProduct, filterProduct };
}