import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { redirectUser } from '../../utils/redirectUser';

const InspectorScreen = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const accountType = redirectUser();
    navigate(`/${accountType}`);
    // eslint-disable-next-line
  },[]);
  
  return (
    <div>InspectorScreen</div>
  )
}

export default InspectorScreen