import axios from "axios";

export const GetPublicKey = () => {
    return axios.get('/api/auth/publicKey')
        .then(response => response.data.publicKey)
        .catch(error => {
            console.error('Error fetching public key:', error);
            throw error;
        });
};
