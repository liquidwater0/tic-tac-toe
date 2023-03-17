import React from 'react';
import Menu from "./Menu";

export default function SettingsMenu({ title, value, setValue }) {
    return (
        <Menu 
            title={title} 
            value={value} 
            setValue={setValue}
        >
            setting
        </Menu>
    );
}