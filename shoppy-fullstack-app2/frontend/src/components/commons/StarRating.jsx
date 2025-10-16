import { TbStarFilled } from "react-icons/tb";
import { TbStarHalfFilled } from "react-icons/tb";
import { TbStar } from "react-icons/tb";

import React from 'react';

export function StarRating({totalRate, className}) {
    const stars = [...Array(5)]; //Array(5): 5칸인 빈 배열을 만들고, ... : 값이 있는부분만 펼쳐서 사용한다.
    const color = (className === "star-coral") ? 'coral' : 'black'; //Review 별 색상

    //totalRate의 값의 범위를 정확히 정의 : 1 ~ 5
    let fillStars = 0, halfStar = 0, emptyStar = 0;
    if(totalRate > 0 && totalRate <= 5 ) {
        fillStars = Math.floor(totalRate); //채워진 별 개수 //floor(): 소수점 제거하는 함수
        halfStar = (totalRate % 1) !== 0; //반별 여부 체크 //결과값이 1이냐 0이냐로 true, false 나뉨
        emptyStar = 5 - fillStars - (halfStar === true ? 1 : 0); //빈별 개수
    }
    return (
        <div className="star-rating">
            {/* fillStars : 채워진 별 추가 */}
            {[...Array(fillStars)].map((_, i) =>//빈값은 _(언더바)로 선언함
                <span key={i} className={className.concat(' ', color)}>
                    <TbStarFilled/> {/*import한 컴포넌트를 콜백함수에 넣을때는 <></>*/}
                </span>
            )}

            {/* halfStar : 반별 추가 */}
            {halfStar && ( //if문 이랑 같게 보면됨
                <span key={halfStar} className={className.concat(' ', color)}>
                    {TbStarHalfFilled} {/*import한 컴포넌트를 그냥 넣을때는 {}로 선언한다 */}
                </span>
            )}

            {/* emptyStar : 빈별 추가 */}
            {[...Array(emptyStar)].map((_, i) =>//빈값은 _(언더바)로 선언함
                <span key={i} className={className.concat(' ', color)}>
                    <TbStar/>
                </span>
            )}

            {/* 별점 표시 */}
            {className === "star-coral" && ( //if문 이랑 같게 보면됨
                <>
                    <span className={className.concat(" number")}>{totalRate}</span>
                </>
            )}
        </div>
    );
}

