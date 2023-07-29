import axios from 'axios';
import { BiEdit } from "react-icons/bi";
import { TbVaccine } from 'react-icons/tb'; 
import { isJson } from '../../utils/isJson';
import { notify } from '../../utils/notify';
import { GiOverdose } from 'react-icons/gi';
import { SlCalender } from 'react-icons/sl';
import { AiFillDelete } from "react-icons/ai";
import server from '../../config/server.json';
import { MdOutlineTimer } from 'react-icons/md';
import MainScreen from '../../layout/MainScreen';
import React, { useState, useEffect } from 'react';
import { Button, Table, Spinner } from 'react-bootstrap';
import { collapseNavbar } from '../../utils/collapseNavbar';
import VaccineModal from '../../components/modal/VaccineModal';
import BooleanModal from '../../components/modal/BooleanModal';

const VaccineInfo = () => {

  const addedOn = new Date();
  const [ id, setId ] = useState(null);
  const production = server.url.production;
  const [ minAge, setMinAge ] = useState("");
  const ADD_VACCINE = server.api.ADD_VACCINE;
  const EDIT_VACCINE = server.api.EDIT_VACCINE;
  const [ timeGap, setTimeGap ] = useState("");
  const [ addedBy, setAddedBy ] = useState("");
  const [ noOfDose, setNoOfDose ] = useState("");
  const [ vaccines, setVaccines ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const REMOVE_VACCINE = server.api.REMOVE_VACCINE;
  const FETCH_VACCINES = server.api.FETCH_VACCINES;
  const [ modalType, setModalType ] = useState(null);
  const [ vaccineName, setVaccineName ] = useState("");
  const [ showDeleteModal, setShowDeleteModal ] = useState(false);
  const [ showVaccineModal, setShowVaccineModal ] = useState(false);
  const [ currentVaccineDetails, setCurrentVaccineDetails ] = useState(null);

  const resetFields = () => {
    setId(null);
    setMinAge("");
    setTimeGap("");
    setNoOfDose("");
    setVaccineName("");
    setCurrentVaccineDetails(null);
  };

  const resetPreviousVaccineFields = () => {
    if(currentVaccineDetails){
      const { _id, vaccineName, timeGap, noOfDose, minAge } = currentVaccineDetails;
      setId(_id);
      setMinAge(minAge);
      setTimeGap(timeGap);
      setNoOfDose(noOfDose);
      setVaccineName(vaccineName);
    };
  }

  const fetchVaccines = async () => {
    setLoading(true);
    await axios
    .get(`${production}${FETCH_VACCINES}`)
    .then(res => {
      if(res.status === 200){
        if(res.data?.length === 0){
          notify("error", "No vaccine found!");
        };
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
    setLoading(true);
    await axios
    .post(`${production}${ADD_VACCINE}`,data)
    .then(res => {
      if(res.status === 201){
        resetFields();
        closeVaccineModal();
        notify("success",res.data.message);
      }
    })
    .catch(err => {
      console.log(err);
      notify("error",err.response.data.message);
    });
    setLoading(false);
    fetchVaccines();
  };

  const editVaccine = async () => {
    let data = {
      minAge : minAge,
      timeGap : timeGap,
      noOfDose : noOfDose,
      vaccineName : vaccineName,
      addedBy : addedBy,
      addedOn : addedOn
    };
    setLoading(false);
    await axios
    .put(`${production}${EDIT_VACCINE}/${id}`,data)
    .then(res => {
      if(res.status === 200){
        resetFields();
        closeVaccineModal();
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

  const deleteVaccine = async () => {
    setLoading(false);
    await axios
    .delete(`${production}${REMOVE_VACCINE}/${id}`)
    .then(res => {
      if(res.status === 202){
        closeDeleteModal();
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

  const triggerOperation = () => {
    let data = { vaccineName, noOfDose, minAge, timeGap, addedBy, addedOn };
    if(modalType && modalType === "Add"){
      addVaccine(data);
    }
    else if(modalType && modalType === "Edit"){
      editVaccine();
    }
  }

  const performOperation = () => {
    if(minAge && noOfDose && vaccineName){
      if(noOfDose > 1){
        if(timeGap){
          triggerOperation();
        }
        else{
          notify("error","Please fill all the fields!");
        }
      }
      else{
        triggerOperation();
      }
    }
    else{
      notify("error","Please fill all the fields!");
    }
  };

  const resetModal = () => {
    if(modalType === "Edit"){
      resetPreviousVaccineFields();
    }
    if(modalType === "Add"){
      resetFields();
    }
  }

  const openVaccineModal = (operationType, data) => {
    setShowVaccineModal(true);
    if(operationType === "Add"){
      setModalType("Add");
    }
    else if(operationType === "Edit"){
      setModalType("Edit");
      const { _id, vaccineName, timeGap, noOfDose, minAge } = data;
      setId(_id);
      setMinAge(minAge);
      setTimeGap(timeGap);
      setNoOfDose(noOfDose);
      setVaccineName(vaccineName);
      setCurrentVaccineDetails(data);
    }
  }

  const closeVaccineModal = () => {
    resetFields();
    setShowVaccineModal(false);
    setModalType(null)
  }

  const openDeleteModal = (data) => {
    const { vaccineName, _id } = data;
    setId(_id);
    setVaccineName(vaccineName);
    setShowDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setId(null);
    setVaccineName("");
    setShowDeleteModal(false);
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
      <Button variant="outline-success" onClick={() => {openVaccineModal("Add")}}>+ Add Vaccine</Button>
      <hr />
      <div className='my-2'>
        <h5>Vaccines List</h5>
        <hr/>
        {loading ? <div className='d-flex align-items-center'><Spinner as="span"/><span className='mx-3'>Fetching Vaccines...</span></div> : 
          vaccines && vaccines.length > 0 ? 
          <Table className="table table-hover my-3">
            <thead>
              <tr>
                <th className='table-info' scope="col">Vaccine Info (Name,Time Gap,Dose)</th>
                <th className='table-success' scope="col"><h6 className='text-center'>Edit</h6></th>
                <th className='table-danger' scope="col"><h6 className='text-center'>Delete</h6></th>
              </tr>
            </thead>
            <tbody>
              {vaccines && vaccines.map((vaccine, index) => {
                const { vaccineName, timeGap, noOfDose, minAge } = vaccine;
                  return (
                    <tr key={index} className="table-active">
                      <td>
                      {vaccineName && (
                        <>
                          <TbVaccine color="green" className="mx-2" />
                          {vaccineName} /
                        </>
                      )}
                      {timeGap && (
                        <>
                          <MdOutlineTimer color='red' className='mx-2'/>
                          {timeGap} /
                        </>
                      )}
                      {noOfDose && (
                        <>
                          <GiOverdose color='yellow' className='mx-2'/>
                          {noOfDose} doses /
                        </>
                      )}
                      {minAge && (
                        <>
                          <SlCalender color='orange' className='mx-2'/>
                          {minAge} years.
                        </>
                      )}
                      </td>
                      <td className='text-center'>
                        <Button variant='transparent' className="pe-auto" onClick={()=>openVaccineModal("Edit",vaccine)}><BiEdit color='green'/></Button>
                      </td>
                      <td className='text-center'>
                        <Button variant='transparent' className="pe-auto" onClick={()=>openDeleteModal(vaccine)}><AiFillDelete color='red'/></Button>
                      </td>
                    </tr>
                  );
              })}
            </tbody>
          </Table>  : <h6 className='text-danger'>No vaccines found!</h6>
        }
      </div>
      <VaccineModal
        minAge={minAge}
        timeGap={timeGap}
        loading={loading}
        addedOn={addedOn}
        addedBy={addedBy}
        noOfDose={noOfDose}
        setMinAge={setMinAge}
        setTimeGap={setTimeGap}
        setAddedBy={setAddedBy}
        show={showVaccineModal}
        resetModal={resetModal}
        operationType={modalType}
        setNoOfDose={setNoOfDose}
        vaccineName={vaccineName}
        onHide={closeVaccineModal}
        title={`${modalType} Vaccine`}
        setVaccineName={setVaccineName}
        performOperation={performOperation}
        resetPreviousVaccineFields={resetPreviousVaccineFields}
      />
      <BooleanModal 
        item={vaccineName}
        next={deleteVaccine}
        show={showDeleteModal} 
        onHide={closeDeleteModal} 
        title={"Do you want to delete"}
      />
    </MainScreen>
  );
};

export default VaccineInfo;