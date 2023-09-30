import axios from 'axios';
import { notify } from './notify';
import server from '../config/server.json';

export const downloadPdf = async (query, vaccineName, vaccineDose) => {
    try {
        // Destructure the server configuration
        const { url: { production }, api: { patients: { DOWNLOAD_CERTIFICATE } } } = server;

        // Make the API request
        const res = await axios.get(`${production}${DOWNLOAD_CERTIFICATE}?${query}`, {
            responseType: 'arraybuffer',
        });

        // Handle the response status
        if (res.status === 200) {
            const pdfData = res.data;
            const fileName = `${vaccineName}_0${vaccineDose}.pdf`;

            // Trigger the download
            downloadPdfBlob(pdfData, fileName);
        } else {
            handleHttpResponseError(res.status);
        }
    } catch (error) {
        // Handle network errors or unexpected errors
        console.error(error);
        notify("error", "An error occurred while downloading the PDF.");
    }
};

// Create a function to download the PDF blob
function downloadPdfBlob(data, fileName) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
}

// Create a function to handle specific HTTP response errors
function handleHttpResponseError(status) {
    if (status === 404) {
        notify("error", "PDF not found.");
    } else {
        notify("error", "Error while generating PDF.");
    }
}