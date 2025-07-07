import axios from './axios';

export const getAllContacts=async()=>{
    const response=await axios.get('/contacts');
    console.log(response.data);
    return response.data;
}