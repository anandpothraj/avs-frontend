import Header from './layout/Header';
import Footer from './layout/Footer';
import './assets/customCss/custom.css';
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
          <Header/>
          <Footer/>
      </Router>
    </>
  );
};

export default App;