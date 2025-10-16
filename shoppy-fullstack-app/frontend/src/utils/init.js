export function initForm(initArray) {
    return initArray.reduce((acc, curValue) => {
        acc[curValue] = "";
        return acc;
    }, {}); 
    // reduce(): 다른 배열에 있는 요소들을 이용하여 새로운 배열을 정의한다. 
    // 마지막 부분에는 받을 타입을 입력하는 것이여서 initForm를 Object로 만들것 이므로 {}로 정의 ( , {}); <-- 이 부분 말하는거임)
    // acc = [id] = "", [pass] = "", ... 으로 생성되고 마지막 {}로 object타입을 정의했으니 {id: "", padd: "", ...} 으로 자동으로 변신한다.
}