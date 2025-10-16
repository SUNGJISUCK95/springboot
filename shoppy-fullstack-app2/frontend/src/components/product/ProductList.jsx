import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductAvatar } from './ProductAvatar.jsx';
import { axiosData, groupByRows } from '../../utils/dataFetch.js';
import { useProduct } from '../../hooks/useProduct.js';
import { ProductContext } from '../../context/ProductContext.js';
import { useContext } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from '../../feature/product/productAPI.js';

export function ProductList() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.product.productList); 

    // const { productList } = useContext(ProductContext);
    // const { createProduct } = useProduct();
    const [number, setNumber] = useState(3); 
    //useState는 값이 바뀌면 number를 사용하는 모든 컴포넌트들(useEffect 등)에게 변경사항을 전달하고 업데이트한다.

    useEffect(() => {
        //1. createProduct
        //createProduct(number);
        dispatch(getProductList(number));
    }, [number]);
    
    // console.log("list --> ", list);

    return (
        <div>
            {productList && productList.map((rowArray, idx) => 
                <div className='product-list' key={idx}>
                    {rowArray && rowArray.map((product, idx) => 
                        <Link to={`/products/${product.pid}`}> {/*콜백 함수에 ``(백틱)을 사용하려면 {}로 묶어줘야한다.*/}
                            <ProductAvatar img={product.image} key={idx}/>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}

