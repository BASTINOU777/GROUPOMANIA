import "../../styles/Banner.css"
import { Outlet, Link } from 'react-router-dom'
import React from "react"
import logoDesktop from "../../assets/icon-left-font-monochrome-white.svg"
import mobileLogo from "../../assets/icon-left-font-monochrome-white.svg" 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faScroll, faUser, faCircleXmark } from '@fortawesome/free-solid-svg-icons'


// fonction pour se connecter
function ConnectToBanner() {
  let userName = localStorage.getItem("userName");
  console.log(userName);
 
  return (
    <header>
      <div>
        <Link to="/">
          <span className="logoMobile">
            <img src={mobileLogo} alt="logo Groupomania" />
          </span>
          <span className="logoDesktop">
            <img src={logoDesktop} alt="logo de groupomania" />
          </span>
        </Link>
      </div>
      <nav>
        <Link to="/">
          <span className="bannerMobile">
            <FontAwesomeIcon icon={faHouse} />
          </span>
          <span className="bannerDesktop">Fils d'actus</span>
        </Link>
        <Link to="/createPost">
          <span className="fontAwesomeSize, bannerMobile">
            <FontAwesomeIcon icon={faScroll} />
          </span>
          <span className="bannerDesktop">Publier</span>
        </Link>
        <Link to={`/profile/${userName}`}>
          <span className="fontAwesomeSize, bannerMobile">
            <FontAwesomeIcon icon={faUser} />
          </span>
          <span className="bannerDesktop">Profil</span>
        </Link>
        <Link to="/logout">
          <span className="fontAwesomeSize, bannerMobile">
            <FontAwesomeIcon icon={faCircleXmark} />
          </span>
          <span className="bannerDesktop">Se Déconnecter</span>
        </Link>
      </nav>
      <Outlet />
    </header>
  )
  
}

export default ConnectToBanner;
