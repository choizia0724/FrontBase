import api from "@/utils/api/axiosInstance.jsx";

export const useNavDataFetch = () => {

    const getNavDataRequestURL = '/api/nav/read'
    return api.get(getNavDataRequestURL)
};
