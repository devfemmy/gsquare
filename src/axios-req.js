import axios from 'axios';
// http:demoperxapi.perxclm.com/perx/public/api/
// const token = localStorage.getItem('grandToken');
const instance = axios.create({//http://192.168.64.2/api_call/
   
    // baseURL: 'http://demoperxapi.perxclm.com/perx/public/api/',
    
    baseURL: 'http://192.168.64.2/api_call/',
    headers:{
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept':'application/json'
    }
    
});



export default instance;