import Menu from "./Menu";
import { TMenu } from "../../types";

export default function SettingsMenu({ title, value, setValue }: TMenu) {
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