import axios from "axios";
import {CheckAuth} from "@/utils/api/CheckAuth.jsx";
import {getNavigate} from "@/utils/history.jsx";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});
const refreshToken = async ()=>{
    const navigate = getNavigate();
    try {
        await CheckAuth();
    } catch (err) {
        // Refresh Token 요청
        try {
            const res = await axios.get('/api/auth/refreshToken', { withCredentials: true });
            if (res.status === 200) {
                console.log("Access token refreshed");
                return api.request(err.config);
            }
        } catch (refreshErr) {
            console.log("Refresh token expired, redirecting to login...");
            navigate("/login");
            return Promise.reject(new axios.Cancel("Redirecting to login"));
        }

    }
}
api.interceptors.response.use(
     async (response) => {
        if (response.status === 404) {
            console.log('404 페이지로 넘어가야 함!');
        }
        //await refreshToken()
        return response;
    },
    async (error) => {
        await refreshToken()
        return api.request(error.config);
        //return Promise.reject(error);
    }
);

export default api;