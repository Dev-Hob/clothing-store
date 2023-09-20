import { Routes, Route } from "react-router-dom";
import Home from "./components/routes/home/home.component";
import Navigation from "./components/routes/navigation/navigation.component";
import Authentication from "./components/routes/authentication/authentication.component";
import Shop from "./components/routes/shop/shop.component.jsx";
import Checkout from "./components/routes/checkout/checkout.componen.jsx";
import { useEffect } from "react";
import {
  create_user_document_from_auth,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
import { setUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribe;
    const getUser = async () => {
      unsubscribe = onAuthStateChangedListener((user) => {
        console.log("auth ", user);
        if (user) create_user_document_from_auth(user);
        dispatch(setUser(user));
      });
    }
    getUser()
    return unsubscribe();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
