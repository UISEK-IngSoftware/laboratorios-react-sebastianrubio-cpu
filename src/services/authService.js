import axios from 'axios';

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID 
const CIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET 

const authClient = axios.create({
	baseURL: AUTH_BASE_URL,
	headers: {
		"Content-Type": "application/json",
		},
});


export const login = async (username, password) => {
	try {
		const response = await authClient.post("/o/token/", {
			client_id: CLIENT_ID,
			client_secret: CIENT_SECRET,
			grant_type: "password",
			username: username,
			password: password,
		});
		localStorage.setItem("access_token", response.data.access_token);
		return response.data.access_token;
	} catch (error) {
		throw new Error(error.response?.data?.error_description || "Credenciales incorrectas o servidor caído.");
	}
}