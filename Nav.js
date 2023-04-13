import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const Nav = () => {
    return (
        <div className="navbar">
            <div className="container">
                <b>MERN Marketplace
                    <a href="/" className="home"><FontAwesomeIcon icon={faHome} /></a>&nbsp;&nbsp;
                    <a href="#">ALL SHOPS</a>&nbsp;&nbsp;&nbsp;<a href="#"></a>
                    <a href="/Cart">CART <FontAwesomeIcon icon={faShoppingCart} /></a>

                </b>
                <ul>
                    <a href="/components/Myshops">MY SHOPS</a>
                    <a href="#">MY PROFILE</a>
                    <a href="#">SIGN OUT</a>
                </ul>
            </div>
        </div>
    )
}

export default Nav