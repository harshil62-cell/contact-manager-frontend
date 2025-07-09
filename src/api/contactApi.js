import axios from './axios';

export const getAllContacts=async()=>{
    const response=await axios.get('/contacts');
    return response.data;
}

export const createNewContact=async(contactData)=>{
    const response=await axios.post('/contacts',contactData);
    return response.data;
}