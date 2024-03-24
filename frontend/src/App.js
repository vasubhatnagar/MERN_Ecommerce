import "./App.css";
import Footer from "./component/layout/Footer/Footer";
import Header from "./component/layout/Header/Header";
import Home from "./component/layout/Home/Home.js";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProductDetails from "./component/layout/Product/ProductDetails.js";
import Products from "./component/layout/Product/Products.js";
import LoginSignup from "./component/layout/User/LoginSignup.js";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/product/:id" Component={ProductDetails} />
        <Route exact path="/products" Component={Products} />
        <Route exact path="/login" Component={LoginSignup} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
