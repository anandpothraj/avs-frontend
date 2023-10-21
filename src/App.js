import Header from './layout/Header';
import Footer from './layout/Footer';
import './assets/customCss/custom.css';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/UserScreen/HomeScreen';
import AboutScreen from './screens/UserScreen/AboutScreen';
import LoginScreen from './screens/UserScreen/LoginScreen';
import OptionScreen from './screens/UserScreen/OptionScreen';
import VaccineInfo from './screens/DoctorScreen/VaccineInfo';
import DoctorScreen from './screens/DoctorScreen/DoctorScreen';
import ProfileScreen from './screens/UserScreen/ProfileScreen';
import RegisterScreen from './screens/UserScreen/RegisterScreen';
import PatientScreen from './screens/PatientScreen/PatientScreen';
import VaccinationInfo from './components/patient/VaccinationInfo';
import PrivateRoutes from './components/PrivateRoute/PrivateRoutes';
import InspectorScreen from './screens/InspectorScreen/InspectorScreen';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CertificateTemplate from './components/patient/CertificateTemplate';

const App = () => {
  return (
    <>
      <Router>
        <Header/>
          <main>
            <Routes>

              {/* Open Routes */}
                <Route path='/' element={<HomeScreen/>} exact />
                <Route path='/login' element={<LoginScreen/>} exact />
                <Route path='/about' element={<AboutScreen/>} exact />
                <Route path='/options' element={<OptionScreen/>} exact />
                <Route path='/profile' element={<ProfileScreen/>} exact />
                <Route path='/register' element={<RegisterScreen/>} exact />
              {/* Open Routes */}
              
              {/* Private Routes */}
                <Route element={<PrivateRoutes/>}>

                  {/* Patient Routes */}
                    <Route path='/patient' element={<PatientScreen/>} exact />
                    <Route path='/patient/:id' element={<VaccinationInfo/>} exact />
                    <Route path='/certificate/:id' element={<CertificateTemplate/>} exact />
                  {/* Patient Routes */}


                  {/* Doctor Routes */}
                    <Route path='/doctor' element={<DoctorScreen/>} exact />
                    <Route path='/doctor/vaccineinfo' element={<VaccineInfo/>} exact />
                  {/* Doctor Routes */}

                  {/* Inspector Routes */}
                    <Route path='/inspector' element={<InspectorScreen/>} exact />  
                  {/* Inspector Routes */}

                </Route>
              {/* Private Routes */}
              
            </Routes>
          </main>
        <Footer/>
      </Router>
    </>
  );
};

export default App;