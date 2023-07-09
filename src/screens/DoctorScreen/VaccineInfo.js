import { Button } from 'react-bootstrap';
import { isJson } from '../../utils/isJson';
import { notify } from '../../utils/notify';
import MainScreen from '../../layout/MainScreen';
import React, { useState, useEffect } from 'react';
import { collapseNavbar } from '../../utils/collapseNavbar';
import VaccineModal from '../../components/modal/VaccineModal';

const VaccineInfo = () => {

  const addingOn = new Date();
  const [ minAge, setMinAge ] = useState("");
  const [ timeGap, setTimeGap ] = useState("");
  const [ addingBy, setAddingBy ] = useState("");
  const [ noOfDose, setNoOfDose ] = useState("");
  const [ modalType, setModalType ] = useState(null);
  const [ showModal, setShowModal ] = useState(false);
  const [ vaccineName, setVaccineName ] = useState("");

  const resetFields = () => {
    setMinAge("");
    setTimeGap("");
    setNoOfDose("");
    setVaccineName("");   
  };

  const performOperation = async () => {
    if(minAge && timeGap && noOfDose && vaccineName){
        const data = { vaccineName, noOfDose, minAge, timeGap, addingBy, addingOn };
        if(modalType && modalType === "Add"){
          console.log("Vaccine Added Successfully : ",data);
        }
        else if(modalType && modalType === "Edit"){
          console.log("Vaccine Edited Successfully : ",data);
        }
    }
    else{
        notify("Please fill all the fields!");
    }
};

  const openModal = (operationType) => {
    setShowModal(true);
    if(operationType === "Add"){
      setModalType("Add");
    }
    else{
      setModalType("Edit");
    }
  }

  const closeModal = () => {
    setShowModal(false);
    setModalType(null)
  }

  useEffect(() => {
    collapseNavbar();
    let user = localStorage.getItem("user");
    if(isJson(user)){
        user = JSON.parse(user)
        setAddingBy(user.name);
    }
  },[]);

  return (
    <MainScreen title="Vaccines Information" md="fluid">
      <Button variant="outline-success" onClick={() => {openModal("Add")}}>+ Add Vaccine</Button>
      <Button variant="outline-danger" onClick={() => {openModal("Edit")}}>Edit Vaccine</Button>
      <VaccineModal
        minAge={minAge}
        show={showModal}
        timeGap={timeGap}
        noOfDose={noOfDose}
        addingOn={addingOn}
        addingBy={addingBy}
        onHide={closeModal}
        setMinAge={setMinAge}
        setTimeGap={setTimeGap}
        operationType={modalType}
        setAddingBy={setAddingBy}
        setNoOfDose={setNoOfDose}
        vaccineName={vaccineName}
        resetFields={resetFields}
        title={`${modalType} Vaccine`}
        setVaccineName={setVaccineName}
        performOperation={performOperation}
      />
    </MainScreen>
  );
};

export default VaccineInfo;