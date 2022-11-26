
import axios from 'axios';



const amatecApi = axios.create({
    baseURL: 'http://localhost:4000/api'
});


export default amatecApi;


