import axios from 'axios';
import { notify } from './notify';
import server from '../config/server.json';

export const fetchVaccinationInfo = async (payload) => {

    const production = server.url.production;
    const FETCH_VACCINATION_INFO = server.api.patients.FETCH_VACCINATION_INFO;
    try {
        const res = await axios.get(`${production}${FETCH_VACCINATION_INFO}/${payload}`);
        
        if (res.status === 200) {
            return res.data;
        }
    } catch (err) {
        console.log(err);
        notify("error", err.response.data.message);
    }
}