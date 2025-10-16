// 인터프리터의 순차 실행때문에 script문이 먼저 읽어지는데 Swiper함수 안에 .swiper(class)가 없어서 실행이 안되고 넘어감
// 그래서 addEventListener로 인터프리터로 html부분까지 전부 출력 후 해당 함수가 실행가능하도록 설정
// DOM 트리 생성(body 실행) 후 DOMContentLoaded 함수 처리
window.addEventListener('DOMContentLoaded', function() {
   createTable('all');
   filterMenuEvent();
   clickMenuEvent();
});   

function clickMenuEvent() {
    let menuList = document.querySelectorAll(".filter-menu a");

    menuList.forEach((menu) => {          
        menu.addEventListener('click', ()=> {
            menuList.forEach((menu) => { 
                menu.style.backgroundColor = "rgba(137,137,135)";
                menu.style.borderColor = "white";
                menu.style.borderBottomColor = "rgba(137,137,135)";
            });
            menu.style.backgroundColor = "rgba(251,67,87)";
            menu.style.borderLeftColor = "rgba(251,67,87)";
        });       
    });
}

async function filterMenuEvent() {
    let menuList = document.querySelectorAll(".filter-menu a"); //해당 클래스에 해당하는 a태그를 전부 가져옴
    // console.log(menuList);   
    menuList.forEach((menu) => {
        menu.addEventListener('click', ()=> { //click 시 실행 할 이벤트를 콜백 함수에 적용
            // console.log(menu.id); // 클릭했을 때 해당 a태그의 id값 가져와서 출력
            
            let type = menu.id //json의 key이름과 동일하게 변수 설정
            // filterData(type); 
            createTable(type);           
        });
    }); 
}

async function filterData(type) {
    let list = await getAPI();
    let filterList = list.filter((item) => {
                        return item.type === type
                    }); //filter는 새로운 배열 return

    console.log(filterList);
    return filterList;
    // createTable(filterList);
}

async function getAPI() {
    let response = await fetch("../data/support.json");
    // console.log(response.json());
    return response.json();
}

async function createTable(type){ //list는 배열 형태로 받아야한다.
    let list = null;

    if(type === 'all'){
        list = await getAPI();
    }else {
        list = await filterData(type);
    }
    console.log(list); 

    let output = `
        <table class="stable">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>구분</th>
                    <th>제목</th>
                    <th>등록일</th>
                    <th>조회수</th>
                </tr>
            </thead>
            <tbody>
                ${list.map((item, index) => {
                    return `
                        <tr>
                            <td>${index + 1}</td>
                            <td>[${item.type}]</td>
                            <td><a href="#">${item.title}</a></td>
                            <td>${item.rdate}</td>
                            <td>${item.hits}</td>
                        </tr>
                    `
                }).join('')
                }
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="5">1 2 3 4 5 >></td>
                </tr>
            </tfoot>            
        </table>
    `;
    
    document.querySelector(".stable")?.remove(); // 해당 클래스가 있으면 해당 클래스를 삭제
    document.querySelector("#support_content").insertAdjacentHTML('afterend', output); //해당 id 아래로 output의 내용 출력
}

    