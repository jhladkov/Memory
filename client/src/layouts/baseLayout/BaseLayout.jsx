import React from 'react';
import {Outlet} from "react-router-dom";
import './baseLayout.scss'

const BaseLayout = () => {
    return (
        <>
            <header className='header'>
                <div className="container">
                    <div className="header__inner">
                        <div className="header__logo">
                             Memory
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className="container">
                    <Outlet/>
                </div>
            </main>
        </>
    );
};

export default BaseLayout;