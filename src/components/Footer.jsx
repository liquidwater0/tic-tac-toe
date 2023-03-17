import React from 'react';

export default function Footer({ selectScreenOpen, changeSelection, reset, openSettings }) {
    return (
        <footer className='footer'>
            <div>
                <button
                    className='btn btn-outlined btn-danger'
                    onClick={reset}
                >
                    Reset
                </button>
                {
                    !selectScreenOpen &&
                    <button
                        className='btn btn-outlined'
                        onClick={changeSelection}
                    >
                        Change Selection
                    </button>
                }
            </div>
            <div>
                <button
                    className='btn btn-outlined'
                    onClick={openSettings}
                >
                    Settings
                </button>
            </div>
        </footer>
    );
}