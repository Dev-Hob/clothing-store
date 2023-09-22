import { Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../../assets/crown.svg";
import { signOutUser } from "../../../utils/firebase/firebase.utils";
import CartIcon from "../../card-icon/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";
import { LogoContainer, NavLink, NavLinks, NavigationContainer } from "./navigation.style";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/user/user.action";
import { selectUserState } from "../../../store/user/user.selector";
import { selectCartToggle } from "../../../store/cart/cart.selector";
import { memo } from "react";

function Navigation() {
  const dispatch = useDispatch()
  const user = useSelector(selectUserState)
  const cartToggle = useSelector(selectCartToggle)

  const logOutHandler = async () => {
    await signOutUser();
    dispatch(setUser(null));
  };
  return (
    <>
      <NavigationContainer>
        <LogoContainer to={"/"} className="logo-container">
          <CrownLogo />
        </LogoContainer>
        <NavLinks>
          <NavLink className="nav-link" to={"/"}>
            Home
          </NavLink>
          <NavLink className="nav-link" to={"/shop"}>
            Shop
          </NavLink>
          {user ? (
            <NavLink as='span' onClick={logOutHandler}>
              Sign Out
            </NavLink>
          ) : (
            <NavLink to={"/auth"}>
              Sign In
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {cartToggle && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
}

export default memo(Navigation)