import React from 'react';
import { Close } from '@mui/icons-material';

export default function Menu({ children, title, value, setValue }) {
    return (
        <>
            {
                value &&
                <div className='menu'>
                    <div className="menu-container">
                        <header className="menu-header">
                            <span>{ title }</span>
                            <button
                                className='menu-close-button'
                                onClick={() => setValue(false)}
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