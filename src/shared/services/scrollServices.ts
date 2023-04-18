import axios from "axios";

/**
 * @description Api url
 */
const baseUrl = 'http://localhost:3000'
/**
 * @returns all the users
 */
const getUsers = async (pageParam = 1, options = {}) => {
    const res = await axios.get(`${baseUrl}/users?_page=${pageParam}&_limit=30`, options);
    return res.data;
}

const getAllUsers = () => axios.get(`${baseUrl}/users?_page=1&_limit=30`)
/**
 * @param id user id of which data is to be fetched
 * @returns individual project details of perticular id
 */
const getUserDetailsById = (id: string) => axios.get(`${baseUrl}/users/${id}`);
/**
 * @description all services in the form of object and can be destructured where it is to be used
 */
const scrollServices = {
    getUsers,
    getUserDetailsById,
    getAllUsers
};
export default scrollServices;