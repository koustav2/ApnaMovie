/* eslint-disable no-unused-vars */
import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN = import.meta.env.VITE_APP_TOKEN;

const headers = {
    Authorization: `Bearer ${TMDB_TOKEN}`
};

export const fetchDataMovies = async (url, params) => {
    try {
        const { data } = await axios.get(`${BASE_URL}${url}`, {
            headers,
            params,
        });
        return data;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to be caught by the caller if needed
    }
};