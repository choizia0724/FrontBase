import axios from "axios";
import forge from "node-forge";


const PostLogin = (userId, userPw, publicKey) =>{
    const postLoginRequestURL = '/api/auth/login'
    const credential = encryptPassword(userPw, publicKey)

    return axios.post(postLoginRequestURL,{
        userId: userId,
        password: credential
    }, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    })
}

export const encryptPassword = (password, publicKeyPem) => {
    try {
        const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
        const encryptedPassword = publicKey.encrypt(password, "RSAES-PKCS1-V1_5");

        // 암호화된 데이터를 Base64로 인코딩하여 반환
        return forge.util.encode64(encryptedPassword);

    } catch (error) {
        console.error("Error encrypting password:", error);
        throw error;
    }
};


export default PostLogin;