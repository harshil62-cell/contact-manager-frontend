import axios from './axios';

//signUp API
export const signupUser=async(userData)=>{
    const response = await axios.post('/users/register',userData);
    return response.data;
};

//login API 
export const loginUser=async(userData)=>{
    const response=await axios.post('/users/login',userData);
    return response.data;
}