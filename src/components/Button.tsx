import { ReactNode, ButtonHTMLAttributes } from 'react'

type ButtonProps = {
    children: ReactNode,
    className?: string,
    buttonStyle?: string
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className, buttonStyle, ...props }: ButtonProps) {
    return (
        <button 
            className={`btn ${buttonStyle === "outlined" ? "btn-outlined" : ""} ${ className ? className : "" }`}
            { ...props }
        >
            { children }
        </button>
    );
}