import axios from 'axios';

const API_URL = 'https://fierce-inlet-05658-ffdeb713d47f.herokuapp.com'; // Replace with your Heroku app URL

export const fetchData = async() => {
    try {
        const response = await axios.get(`${API_URL}https://fierce-inlet-05658-ffdeb713d47f.herokuapp.com/bhl`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const postData = async(data) => {
    try {
        const response = await axios.post(`${API_URL}https://fierce-inlet-05658-ffdeb713d47f.herokuapp.com/bhl`, data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};