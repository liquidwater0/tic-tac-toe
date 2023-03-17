import Circle from "./Selections/Circle";

export default function Header() {
    return (
        <header className='header'>
            <div className='title'>
                <span>Tic Tac T</span>
                <Circle/>
                <span>e</span>
            </div>
        </header>
    );
}