import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { callApi } from '../Axios';

const useFetchAllCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                setLoading(true);
                const response = await callApi('getAllCategory', 'GET');
                setCategories(response.data);
            } catch (error) {
                console.error(error);
                setError(error.response?.data?.error || 'Error fetching categories');
                Swal.fire({
                    title: error.response?.data?.error || 'Error fetching categories',
                    timer: 2000,
                    icon: 'error',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchAllCategories();
    }, []);

    return categories;
};

export default useFetchAllCategories;
