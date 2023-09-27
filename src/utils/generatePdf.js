import { downloadPdf } from "./downloadPdf";
import { generateQuery } from './generateQuery';

export const generatePdf = async (userInfo, vaccinationInfo) => {
    const queryParams = generateQuery(userInfo, vaccinationInfo);
    if (queryParams) {
        try {
            await downloadPdf(queryParams, vaccinationInfo.vaccineName, vaccinationInfo.doseNo);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}