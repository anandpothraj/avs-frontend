import axios from 'axios';
import { notify } from '../utils/notify';
import server  from '../config/server.json';
import { generateQuery } from './generateQuery';

export const sendPdf = async (userInfo, vaccinationInfo) => {

    const production = server.url.production;
    const queryParams = generateQuery(userInfo, vaccinationInfo);
    const SEND_CERTIFICATE = server.api.patients.SEND_CERTIFICATE;

    if (queryParams) {
        await axios
        .get(`${production}${SEND_CERTIFICATE}?${queryParams}`)
        .then(res => {
            if(res.status === 200){
            notify("success",res.data.message);
            }
        })
        .catch(err => {
            console.log(err);
            notify("error",err.response.data.message);
        })
    }
    else{
        notify("error","Unable to send PDF!!");
    }
}