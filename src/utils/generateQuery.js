export const generateQuery = (userInfo, vaccinationInfo) =>{
    let queryParams = "";
    if(userInfo){
        queryParams += `certificateId=${vaccinationInfo.certificateId}&patientName=${userInfo.name}&patientAge=${userInfo.age}&patientGender=${userInfo.gender}&patientUserId=${userInfo._id}&patientAadhaar=${userInfo.aadhaar}&patientEmail=${userInfo.email}&patientPhone=${userInfo.phone}`;
    }
    if(vaccinationInfo){
        queryParams += `&vaccineName=${vaccinationInfo.vaccineName}&doseNo=${parseInt(vaccinationInfo.doseNo)}&vaccinatedOn=${vaccinationInfo.vaccinatedOn}&doctorName=${vaccinationInfo.doctorName}&doctorAadhaar=${vaccinationInfo.doctorAadhaar}&hospitalName=${vaccinationInfo.hospitalName}&pincode=${vaccinationInfo.pincode}&fullyVaccinated=${vaccinationInfo.fullyVaccinated}&remainingNoOfDose=${parseInt(vaccinationInfo.remainingNoOfDose)}&nextDose=${vaccinationInfo.nextDose}`;
    }
    return queryParams;
}