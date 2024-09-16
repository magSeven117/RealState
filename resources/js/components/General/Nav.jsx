import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from 'react-router-dom';
import React from 'react';
import { LinkVisit } from "./LinkVisit";

export function Header () {
    const [showMenu, getShowMenu] = useState(true);
    const location = useLocation();
    const { id } = useParams();
    
    const handleScroll = () => {
        // Asegurarse de que el elemento existe antes de aplicar estilo
        const menuElement = document.getElementsByClassName("menu")[0];
        if (window.scrollY == 0) {
            menuElement.style.top = "";
            menuElement.style.position = "absolute";
        } else {
            menuElement.style.top = "0";
            menuElement.style.position = "fixed";
        }
    }

    const handleClick = () => {
        if(window.innerWidth <= 768) getShowMenu(!showMenu);
    }   

    useEffect(() => {
        handleScroll()
        
        window.addEventListener("scroll", handleScroll);

        if(window.innerWidth <= 765)
            getShowMenu(false);
        else 
            getShowMenu(true);

        window.addEventListener('resize', ()=>{
            if(window.innerWidth <= 765)
                getShowMenu(false);
            else 
                getShowMenu(true);
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <>
            <div className="sub-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-8">
                            <ul className="info">
                                <li><i className="fa fa-envelope"></i> info@company.com</li>
                                <li><i className="fa fa-map"></i> Sunny Isles Beach, FL 33160</li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <ul className="social-links">
                                <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                                <li><a href="https://x.com/minthu" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                                <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <header className="header-area header-sticky menu" style={{width: "100%", height: "100px"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav">
                                {/* ***** Logo Start ***** */}
                                <Link to='/' className="logo">
                                    <h1>Villa</h1>
                                </Link>
                                {/* ***** Logo End ***** */}
                                {/* ***** Menu Start ***** */}
                                <ul className={`nav ${showMenu ? 'show-nav' : 'no-show-nav'}`}>
                                    <li>
                                        <Link to="/" className={`${location.pathname == '/' && 'active'}`}>Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/properties" className={`${location.pathname == '/properties' && 'active'}`}>Properties</Link>
                                    </li>
                                    <li>
                                        <a href="/contact" className={`${location.pathname == '/contact' && 'active'}`}>Contact Us</a>
                                    </li>
                                    <li>
                                        {
                                            id ? <LinkVisit id={id} /> : ""
                                        }
                                    </li>
                                </ul>
                                <a onClick={handleClick} className={`menu-trigger ${showMenu ? 'active' : ''}`}>
                                    <span>Menu</span>
                                </a>
                                {/* ***** Menu End ***** */}
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}