import axios from 'axios';
import Swal from 'sweetalert2';

// const apiBaseUrl = 'https://silly-blue-jodhpurs.cyclic.app/api';
const apiBaseUrl = 'http://localhost:3000/api';

export const callApi = async (endpoint, method = 'GET', data = null) => {
    try {
        console.log(data)
        const response = await axios({
            method,
            url: `${apiBaseUrl}/${endpoint}`,
            data,
        });

        // You might want to handle different HTTP status codes here
        // For now, we'll assume that any status code less than 400 is successful
        if (response.status < 400) {
            return response.data;
        } else {
            throw new Error('Request failed');
        }
    } catch (error) {
        Swal.fire({
            title: error.response.data.error,
            timer: 2000,
            icon: 'error'
        })
    }
};
