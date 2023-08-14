import { Link, Outlet } from "react-router-dom";
import "./navigation.style.scss"
import { ReactComponent as CrownLogo} from "../../../assets/crown.svg"

export default function Navigation() {
  return (
      <>
      <div className="navigation">
        <Link to={'/'} className="logo-container">
        <CrownLogo/>
        </Link>
        <div className="nav-links-container">
            <Link className="nav-link" to={"/"}>Home</Link>
            <Link className="nav-link" to={"/shop"}>Shop</Link>
            <Link className="nav-link" to={"/sign-in"}>Sign In</Link>
        </div>
      </div>
      <Outlet />
      </>
  )
}
