import Header from './layout/Header';
import Footer from './layout/Footer';
import './assets/customCss/custom.css';
import HomeScreen from './screens/UserScreen/HomeScreen';
import AboutScreen from './screens/UserScreen/AboutScreen';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Header/>
          <main>
            <Routes>
              {/* Open Routes */}
              <Route path='/' element={<HomeScreen/>} exact />
              <Route path='/about' element={<AboutScreen/>} exact />
              {/* Open Routes */}
            </Routes>
          </main>
        <Footer/>
      </Router>
    </>
  );
};

export default App;