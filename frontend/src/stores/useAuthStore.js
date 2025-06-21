/* eslint-disable no-unused-vars */

import {create} from 'zustand';
import axios from '../lib/axios';
import toast from 'react-hot-toast';


export const useAuthStore = create((set,get) => ({
    user: null,
    loading: false,
    ischeckingAuth: true,


    checkAuth: async() =>{
        set({checkingAuth: true});
        try {
            const res = await axios.get('/auth/check-auth');
            set({user: res.data, ischeckingAuth: false});
        } catch (error) {
            set({user: null, ischeckingAuth: false});
        }
    },
    signup: async (userData) =>{
        set({loading: true});
        try {
            const res = await axios.post('/auth/signup', userData);
            set({user: res.data, loading:false});
            toast.success("Signup successful");
        } catch (error) {
            set({loading: false});
            console.log("Signup error:", error);
            toast.error(error.response?.data?.message || "Signup failed");
        }
    },
    login: async (userData) => {
        set({loading: true});
        try {
            const res = await axios.post('/auth/login', userData);
            set({user: res.data,loading: false});
            toast.success("Login successful");
        } catch (error) {
            console.log("Login error:", error);
            set({loading: false});
            toast.error(error.response?.data?.message || "Login failed");
        }
    },
    logout: async ()=>{
        try {
            await axios.post('/auth/logout')
            set({user:null})
            toast.success("Logged out");
        } catch (error) {
            console.log("error in logout",error)
            toast.error("Logout Failed")
        }
    },
    updateProfile: async (profileData) => {
        set({loading: true});
        try {
            const res = await axios.put('/auth/update-profile', profileData);
            set({user: res.data, loading: false});
        } catch (error) {
            console.log("Update profile error:", error);
            set({loading: false});
            
        }
    }
    


}));

