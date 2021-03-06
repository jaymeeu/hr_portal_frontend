import axios from 'axios';

const baseUrl = 'https://localhost:5001/api/Staffs/';


export const fetchData = async () => {
    try {
        const { data } = await axios.get(`${baseUrl}`);

        return ({ fullname, age, department }) => ({ fullname: fullname , age: age, department: department });
    } catch (error) {
        return error;
    }
};