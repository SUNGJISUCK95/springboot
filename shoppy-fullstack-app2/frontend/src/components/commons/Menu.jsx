export function Menu({href, name, style, isIcon, icon, handleClick, type}) {

    return(
        <a href={href} 
           className={style} 
           onClick={() => {handleClick(type)}} //a태그여도 반드시 event로 처리 //href로 처리하면 새로고침 됨
        >
            {isIcon? icon : ""}{name} 
        </a> 
        // 중요사항: 절대 속성값을 고정값을 주지마라(변수로 전달받아서 사용)
    );
}