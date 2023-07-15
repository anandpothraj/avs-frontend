import axios from 'axios';
import { BiEdit } from "react-icons/bi";
import { isJson } from '../../utils/isJson';
import { notify } from '../../utils/notify';
import { AiFillDelete } from "react-icons/ai";
import server from '../../config/server.json';
import { Button, Table, Spinner } from 'react-bootstrap';
import MainScreen from '../../layout/MainScreen';
import React, { useState, useEffect } from 'react';
import { collapseNavbar } from '../../utils/collapseNavbar';
import VaccineModal from '../../components/modal/VaccineModal';

const VaccineInfo = () => {

  const addedOn = new Date();
  const production = server.url.production;
  const [ minAge, setMinAge ] = useState("");
  const ADD_VACCINE = server.api.ADD_VACCINE;
  const [ timeGap, setTimeGap ] = useState("");
  const [ addedBy, setAddedBy ] = useState("");
  const [ noOfDose, setNoOfDose ] = useState("");
  const [ vaccines, setVaccines ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const FETCH_VACCINES = server.api.FETCH_VACCINES;
  const [ modalType, setModalType ] = useState(null);
  const [ showModal, setShowModal ] = useState(false);
  const [ vaccineName, setVaccineName ] = useState("");

  const resetFields = () => {
    setMinAge("");
    setTimeGap("");
    setNoOfDose("");
    setVaccineName("");   
  };

  const fetchVaccines = async () => {
    setLoading(true);
    await axios
    .get(`${production}${FETCH_VACCINES}`)
    .then(res => {
      if(res.status === 200){
        setVaccines(res.data);
      }
    })
    .catch(err => {
      console.log(err);
      notify("error",err.response.data.message);
    })
    setLoading(false);
  }

  const addVaccine = async (data) => {
    setLoading(false);
    await axios
    .post(`${production}${ADD_VACCINE}`,data)
    .then(res => {
      if(res.status === 201){
        resetFields();
        closeModal();
        notify("success",res.data.message);
      }
    })
    .catch(err => {
      console.log(err);
      notify("error",err.response.data.message);
    });
    setLoading(true);
    fetchVaccines();
  };

  const performOperation = () => {
    if(minAge && timeGap && noOfDose && vaccineName){
      const data = { vaccineName, noOfDose, minAge, timeGap, addedBy, addedOn };
      if(modalType && modalType === "Add"){
        addVaccine(data);
      }
      else if(modalType && modalType === "Edit"){
        // editVaccine(data);
      }
    }
    else{
      notify("error","Please fill all the fields!");
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
      setAddedBy(user.name);
    }
    fetchVaccines();
    // eslint-disable-next-line
  },[]);

  return (
    <MainScreen title="Vaccines Information" md="fluid">
      <Button variant="outline-success" onClick={() => {openModal("Add")}}>+ Add Vaccine</Button>
      <hr />
      <div className='my-2'>
        <h5>Vaccines List</h5>
        <hr/>
        {loading ? <div className='d-flex align-items-center'><Spinner as="span"/><span className='mx-3'>Fetching Vaccines...</span></div> : 
          vaccines && vaccines.length > 0 ? 
          <Table className="table table-hover my-3">
            <thead>
              <tr>
                <th className='table-info' scope="col">Vaccine Info (name/Time Gap,Dose)</th>
                <th className='table-success' scope="col"><h6 className='text-center'>Edit</h6></th>
                <th className='table-danger' scope="col"><h6 className='text-center'>Delete</h6></th>
              </tr>
            </thead>
            <tbody>
              {vaccines && vaccines.map((vaccine, index) => {
                  return (
                    <tr key={index} className="table-active">
                      <th scope="row">{vaccine.vaccineName}</th>
                      <td className='text-center'><BiEdit color='green' cursor="pointer"/></td>
                      <td className='text-center'><AiFillDelete color='red' cursor="pointer"/></td>
                    </tr>
                  );
              })}
            </tbody>
          </Table>  : <h6 className='text-danger'>No vaccines found!</h6>
        }
      </div>
      <VaccineModal
        minAge={minAge}
        show={showModal}
        timeGap={timeGap}
        loading={loading}
        addedOn={addedOn}
        addedBy={addedBy}
        onHide={closeModal}
        noOfDose={noOfDose}
        setMinAge={setMinAge}
        setTimeGap={setTimeGap}
        setAddedBy={setAddedBy}
        operationType={modalType}
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