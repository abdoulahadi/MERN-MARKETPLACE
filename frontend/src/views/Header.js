/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useNavigate } from "react-router-dom";
const qs = $item => {
  return document.querySelector($item);
};

function navToggle() {
  qs(".nav-item").classList.toggle("toggle-nav-item");
  qs(".nav-box").classList.toggle("toggle-nav-box");
}

export function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Supprime le sessionStorage de l'utilisateur
    sessionStorage.removeItem("user");
    // Redirection vers Home
    navigate.apply("/");
  };
  return (
    <nav className="nav-bar x-large">
      <span className="nav-title"> Mern Marketplace</span>

      <div className="nav-box">
        <div className="row-sb-md center x-large nav-item">
          <div className="row-md">
            <a href="/" className="nav-link row-ctr">
              {" "}
              <img
                src="../img/icons8-home-page-30.png"
                alt="Home icon"
                title="Home"
                width="30px"
                height="30px"
              />{" "}
            </a>
            <a href="/all-shop" className="nav-link">
              ALL SHOPS
            </a>
            <a href="/cart" className="row-ctr nav-link">
              <span>CART</span>
              <img
                src="../img/icons8-shopping-cart-48.png"
                alt="Home icon"
                width="24px"
                height="24px"
              />
            </a>
          </div>

          {sessionStorage.getItem("user") ? (
            <div className="row-md">
              <a href="/my-shop" className="nav-link">
                {" "}
                MY SHOPS{" "}
              </a>
              <a href="/profile" className="nav-link">
                {" "}
                MY PROFILE{" "}
              </a>
              <a href="#" className="nav-link" onClick={handleLogout}>
                {" "}
                SIGN OUT{" "}
              </a>
            </div>
          ) : (
            <div className="row-md">
              <a href="/login" className="nav-link">
                {" "}
                SIGN IN{" "}
              </a>
            </div>
          )}
        </div>

        <div className="nav-toggle">
          <span id="nav-btn-toggle">
            {" "}
            <img
              src="../img/icons8-menu-rounded-50.png"
              alt="Home icon"
              width="40px"
              height="40px"
              onClick={navToggle}
            />
          </span>
        </div>
      </div>
    </nav>
  );
}

export function getCourses() {}
