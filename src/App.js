import Header from './layout/Header';
import './assets/customCss/custom.css';
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
          <Header/>
      </Router>
    </>
  );
};

export default App;