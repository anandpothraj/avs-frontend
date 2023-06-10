import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import MainScreen from '../../layout/MainScreen';
import AddVaccine from '../../components/modal/AddVaccine';

const VaccineInfo = () => {

  const [ modalShow, setModalShow ] = useState(false);

  return (
    <MainScreen title="Vaccines Information" md="fluid">
      <Button variant="outline-success" onClick={() => setModalShow(true)}>+ Add Vaccine</Button>
      <AddVaccine show={modalShow} onHide={() => setModalShow(false)} title={"Add Vaccine"}/>
    </MainScreen>
  )
}

export default VaccineInfo;