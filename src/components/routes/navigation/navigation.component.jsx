import { Link, Outlet } from "react-router-dom";
import "./navigation.style.scss";
import { ReactComponent as CrownLogo } from "../../../assets/crown.svg";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../../utils/firebase/firebase.utils";
import CartIcon from "../../card-icon/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../context/cart.context";

export default function Navigation() {
  const { user, setUser } = useContext(UserContext);
  const {cartToggle} = useContext(CartContext)

  const logOutHandler = async () => {
    await signOutUser();
    setUser("");
  };
  return (
    <>
      <div className="navigation">
        <Link to={"/"} className="logo-container">
          <CrownLogo />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to={"/"}>
            Home
          </Link>
          <Link className="nav-link" to={"/shop"}>
            Shop
          </Link>
          {user ? (
            <span className="nav-link" onClick={logOutHandler}>
              Sign Out
            </span>
          ) : (
            <Link className="nav-link" to={"/auth"}>
              Sign In
            </Link>
          )}
          <CartIcon />
        </div>
        {cartToggle && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
}
