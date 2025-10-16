import { Menu } from "../commons/Menu.jsx";
import { useState } from "react";

export function MenuList({menus, filterList}) {
    const [active, setActive] = useState("all");
    const handleClick = (type) => {
        // console.log(active);
        setActive(type);
        filterList(type);
    }

    return(
        <ul className="menu-list">
            {
                !menus || menus.map((menu) => //"!menus ||"는 menus가 null이 아니면 실행한다는 뜻
                    <li className="menu-list-item">
                        <Menu href={menu.href} 
                              name={menu.name} 
                              style={active === menu.type ? "support-content-menu support-active" : "support-content-menu" } 
                              isIcon={menu.isIcon} 
                              icon={menu.icon} 
                              type={menu.type}
                              handleClick={handleClick} />
                        {menu.isBorder ? <span className="menu-list-item-border"></span> : ""}
                    </li>
                )
            }
        </ul>
    );
}