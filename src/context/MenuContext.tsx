import React, { useState, useContext, ReactNode } from 'react';

type TMenuObj = { [key: string]: boolean };
type MenuContextType = {
    menus: TMenuObj,
    openMenu: (menu: string) => void,
    closeMenu: (menu: string) => void
}

const MenuContext = React.createContext<MenuContextType>(null!);

export function useMenus() {
    return useContext(MenuContext);
}

const initialMenus = {
    settingsMenu: false
}

export default function MenuProvider({ children }: { children: ReactNode }) {
    const [menus, setMenus] = useState<TMenuObj>(initialMenus);

    function openMenu(menu: string) {
        setMenus(prev => ({ ...prev, [menu]: true }));
    }

    function closeMenu(menu: string) {
        setMenus(prev => ({ ...prev, [menu]: false }));
    }

    return (
        <MenuContext.Provider value={{ menus, openMenu, closeMenu }}>
            { children }
        </MenuContext.Provider>
    );
}