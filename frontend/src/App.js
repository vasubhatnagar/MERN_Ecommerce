import "./App.css";
import Footer from "./component/layout/Footer/Footer";
import Header from "./component/layout/Header/Header";
import Home from "./component/layout/Home/Home.js";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProductDetails from "./component/layout/Product/ProductDetails.js";
import Products from "./component/layout/Product/Products.js";
import LoginSignup from "./component/layout/User/LoginSignup.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/userActions.js";
import Account from "./component/layout/User/Account.js";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/product/:id" Component={ProductDetails} />
        <Route exact path="/products" Component={Products} />
        <Route exact path="/login" Component={LoginSignup} />
        <Route exact path="/account" Component={Account} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
