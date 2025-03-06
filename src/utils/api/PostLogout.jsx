import api from "@/utils/api/AxiosInstance.jsx";

export const PostLogout = async () =>{
    const postLogoutRequestURL = '/api/auth/logout'

    try {
        return await api.post(postLogoutRequestURL);
    } catch (error) {
        console.error('Logout request failed', error);
        throw error;
    }
}