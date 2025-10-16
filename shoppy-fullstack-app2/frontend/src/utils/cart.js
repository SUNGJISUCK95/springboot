
/**
 * 장바구니 아이템 수량 업데이트
 */
export function updateCartItemsQty(cartItems, cid, type) {
    return cartItems.map((item) => 
            item.cid === cid ?
                type === '+'? {...item, qty: item.qty+1}   
                            : item.qty > 1 ? {...item, qty: item.qty-1} : item 
            :   item 
    );    
}

/**
 * 상품 총 금액 구하기
 */
export function getTotalPrice(products, items) {
    // items(배열)의 누적합
    // item(배열)의 누적합 ==> 배열.reduce((누적합(acc), 현재값(current), index, 원본배열) => {}, 초기값)
    return items.reduce((total, item) => {
        const product = products.find((product) => item.pid === product.pid);
        return total += item.qty * product.price;
    }, 0);    
}

/**
 * 상품리스트에서 이미지, 상품명, 가격 ==> 장바구니 리스트에 추가
 */
export function cartItemsAddInfo(products, items) {
    return items.map((item) => {
        // 상품에 있는지 체크
        const product = products.find((product) => item.pid === product.pid);
        // console.log('item => ', item);
        // console.log('product => ', product);
        
        return { //map을 빠져나가기
            ...item, 
            image: product.image,
            name: product.name,
            info: product.info,
            price: product.price
        };
    });
}

/**
 * 장바구니 수량 증가 체크 함수
 */
export function cartItemsCheck(prevItems, cartItem) {
    //존재여부 체크
    const existItem = prevItems.find((item) =>  
        //find함수로 해당 조건에 맞는 item을 찾아서 existItem에 선언 
        //find는 return되는 타입이 object이다.
        // ex) find로 가져온 결과 [{pid:1, size:'XS', qty:1}] <-- 옷 장바구니 추가한 값
        item.pid === cartItem.pid && item.size === cartItem.size
    );
    if(existItem) { //존재하면 map으로 순회하면서 pid, size가 동일한 item에 qty +1 증가
        return prevItems.map((item) => //map은 새로운 배열 반환 //return은 setCartItems((prevItems) => 에 {} 줬기 때문에 넣어야함
        item.pid === cartItem.pid && item.size === cartItem.size ? { ...item, qty: item.qty + 1 } : item 
        //3항 연산자 사용
        // 조건값이 같으면({...item, qty: item.qty + 1) qty만 값 1 증가 ex) {pid:1, size:'XS', qty:2}
        // 조건값이 다르면(: item) 새로운 object추가 ex) {pid:1, size:'L', qty:1}가 새로 추가
        // ...item이 find로 가져온 결과 [{pid:1, size:'XS', qty:1}]를 펼쳐서 각 값을 사용하는 거다.
        );
    } else {
        const cid = Math.floor(Math.random()*10000000);
        return [...prevItems, { ...cartItem, cid:cid }]; //존재하지 않으면 새로운 item 추가
    }
}

