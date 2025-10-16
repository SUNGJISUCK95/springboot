import axios from 'axios';

/**
 * 배열의 rows 그룹핑
 */
export const groupByRows = (array, number) => {
    //출력 포맷 함수 : 한줄에 상품 3개씩 출력
    
    //방법1)
    // const rows = []; // [ [{}, {}, {}], [{}, {}, {}], [{}] ]
    
    // for(let i=0; i<array.length; i+=3) {
    //     const row = list.slice(i, i+3); //0~2번지까지 묶어서, slice 새로운 배열 return
    //     rows.push(row);

    //     // 위 2줄을 줄이면
    //     // rows.push(list.slice(i, i+3));
    // }

    //방법2)
    const rows = array.reduce((acc, cur, idx) => { //acc: 누적값, cur: current, idx: index
        if(idx % number === 0){
            acc.push([cur]); // 새 배열에 현재 요소 추가
        }else {
            acc[acc.length-1].push(cur); // 기존 마지막 배열에 추가
        }
        return acc;
        
    }, []);

    return rows;
}

/**
 * axios 함수를 이용하여 데이터 가져오기
 */

export const axiosData = async(url) => { //axios는 json()으로 파싱작업 필요없음 (자동으로 해줌)
    const response = await axios.get(url);
    return response.data;
}

/**
 * fetch 함수를 이용하여 데이터 가져오기
 */

export const fetchData = async(url) => {
    const response = await fetch(url);
    const jsonData = await response.json(); //JSON 타입으로 파싱을 한다.
    return jsonData;
}