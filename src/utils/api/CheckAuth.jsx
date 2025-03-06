import axios from 'axios';

export const CheckAuth = () => {

    const getCheckAuth = import.meta.env.VITE_API_URL+'/api/auth/checkAuth'
    return axios.get(getCheckAuth, { withCredentials: true })

};
