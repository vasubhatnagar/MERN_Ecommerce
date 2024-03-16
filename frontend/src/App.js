import "./App.css";
import Footer from "./component/layout/Footer/Footer";
import Header from "./component/layout/Header/Header";
import Home from "./component/layout/Home/Home.js";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" Component={Home} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
