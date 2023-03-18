import { ReactNode } from 'react';
import { Close } from '@mui/icons-material';
import { TMenu } from "../../types";
import { useMenus } from '../../context/MenuContext';

type MenuProps = {
    children: ReactNode,
} & TMenu;

export default function Menu({ children, title, menuId }: MenuProps) {
    const { menus, closeMenu } = useMenus();

    return (
        <>
            {
                menus[menuId] &&
                <div className='menu'>
                    <div className="menu-container">
                        <header className="menu-header">
                            <span>{ title }</span>
                            <button
                                className='menu-close-button'
                                onClick={() => closeMenu(menuId)}
                            >
                                <Close/>
                            </button>
                        </header> 
                        <div className="menu-body">
                            { children }
                        </div>
                    </div>  
                </div>
            }
        </>
    );
}