import axios from 'axios';
import {toast} from 'react-toastify'
const axiosInstance=axios.create({
    withCredentials:true,
    baseURL:"http://localhost:8080/api"
});
axiosInstance.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem('accessToken');
        if(token){
            config.headers['Authorization']=`Bearer ${token}`
        }
        return config;
    },
    (error)=>Promise.reject(error)
);
axiosInstance.interceptors.response.use(
    config=>config,

    async (error)=>{
        const originalRequest=error.config;
        if(error?.response?.status === 403 && originalRequest._retry){
            originalRequest._retry=true;

            try {
                const {data}=await axiosInstance.get('/auth/refresh');
                localStorage.setItem('accessToken',data.accessToken);
                originalRequest.headers['Authorization']=`Bearer ${data.accessToken}`;
                return axiosInstance.request(originalRequest);
            } catch (error) {
                toast.error(error?.response?.data?.message || "Something went wrong");
                localStorage.removeItem('accessToken');
                window.location.href="/login"
            }
        }
    }
);
export default axiosInstance