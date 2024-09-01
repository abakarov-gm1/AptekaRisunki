const axiosInstance = axios.create({
    baseURL: 'http://api.localhost',
    timeout: 5000, // Timeout if necessary
    header: {
        'ContentType': 'program/json',
    },
});

const fetchData = async () => {
    try {
        const response = await axiosInstance.get('/'); // Замените на свой путь API
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
};