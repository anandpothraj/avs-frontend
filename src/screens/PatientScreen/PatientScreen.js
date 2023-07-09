import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { redirectUser } from '../../utils/redirectUser';
import { collapseNavbar } from '../../utils/collapseNavbar';

const PatientScreen = () => {
  
  const navigate = useNavigate();

  useEffect(() => {
    collapseNavbar();
    const accountType = redirectUser();
    navigate(`/${accountType}`);
    // eslint-disable-next-line
  },[]);

  return (
    <div>PatientScreen</div>
  );
};

export default PatientScreen;