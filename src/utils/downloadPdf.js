import axios from 'axios';
import { notify } from './notify';
import server from '../config/server.json';

export const downloadPdf = async (vaccineName, vaccineDose, id) => {
    const production = server.url.production;
    const DOWNLOAD_CERTIFICATE = server.api.patients.DOWNLOAD_CERTIFICATE;
    try {
        const res = await axios.get(`${production}${DOWNLOAD_CERTIFICATE}/${id}`,{
            responseType: 'arraybuffer',
        }); 
        if (res.status === 200) {
            const pdfData = res.data;

            // Create a Blob from the PDF data
            const blob = new Blob([pdfData], { type: 'application/pdf' });
    
            // Create a URL for the Blob
            const url = URL.createObjectURL(blob);
    
            // Create an anchor element to trigger the download
            const a = document.createElement('a');
            a.href = url;
    
            // Set the download attribute with the desired filename
            a.download = `${vaccineName}_0${vaccineDose}.pdf`;
    
            // Simulate a click on the anchor element to trigger the download
            a.click();
    
            // Clean up by revoking the URL
            URL.revokeObjectURL(url);
        }
        else{
            notify("error", "Error while generating PDF!");
        }
    } 
    catch (err) {
        console.log(err);
        notify("error", err.response.data.message);
    }
}