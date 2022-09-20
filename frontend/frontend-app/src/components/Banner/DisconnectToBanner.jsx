import '../../styles/Banner.css'
import logo from "../assets/icon-left-font-monochrome-white.png";
import mobileLogo from ""
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faPlug } from '@fortawesome/free-solid-svg-icons'


function DisconnectToBanner (){
    return (

        <header>
        <div>
          <Link to="/">
            <span className="logoMobileDisplay"><img src={mobileLogo} alt="logo de groupomania"/></span>
            <span className="logoDesktopDisplay"><img src={desktopLogo} alt="logo de groupomania"/></span>
          </Link>
        </div>
        <nav>
          <Link to="/signin">
            <span className="fontAwesomeSize, bannerMobileDisplay"><FontAwesomeIcon icon={faUserPlus} /></span>
            <span className="bannerDesktopDisplay">S'inscrire</span>
          </Link>
          <Link to="/login">
              <span className="fontAwesomeSize, bannerMobileDisplay"><FontAwesomeIcon icon={faPlug} /></span>
              <span className="bannerDesktopDisplay">Se connecter</span>
          </Link>
        </nav>
          <Outlet />
      </header>

    )
}
export default DisconnectToBanner