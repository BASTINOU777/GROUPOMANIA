import "../../styles/Banner.css"
import { Outlet, Link } from 'react-router-dom'
import React from "react";
import LogoDesktop from "../../assets/icon-left-font-monochrome-white.svg"
import MobileLogo from "../../assets/icon-left-font-monochrome-white.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faPlug } from '@fortawesome/free-solid-svg-icons'


function DisconnectToBanner() {
    return (
  
        <header>
        <div>
          <Link to="/">
            <span className="logoMobile"><img src={MobileLogo} alt="logo de Groupomania"/></span>
            <span className="logoDesktop"><img src={LogoDesktop} alt="logo de Groupomania"/></span>
          </Link>
        </div>
        <nav>
          <Link to="/signUp">
            <span className="fontAwesomeSize, bannerMobile"><FontAwesomeIcon icon={faUserPlus} /></span>
            <span className="bannerDesktop">S'inscrire</span>
          </Link>
          <Link to="/login">
              <span className="fontAwesomeSize, bannerMobile"><FontAwesomeIcon icon={faPlug} /></span>
              <span className="bannerDesktop">Se connecter</span>
          </Link>
        </nav>
          <Outlet /> 
      </header>
      

    )
}
export default DisconnectToBanner;