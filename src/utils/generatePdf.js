import { downloadPdf } from "./downloadPdf";
import { generateQuery } from './generateQuery';

export const generatePdf = (userInfo, vaccinationInfo) =>{
    const queryParams = generateQuery(userInfo, vaccinationInfo);
    if(queryParams){
        downloadPdf(queryParams, vaccinationInfo.vaccineName, vaccinationInfo.doseNo);
    }
}