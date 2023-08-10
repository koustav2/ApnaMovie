/* eslint-disable no-unused-vars */
import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGQwYzJjZDE1ZTlhZDMwMGNiNGJmZTNkNWFkODUwOSIsInN1YiI6IjY0NmJhYjIyNTRhMDk4MDE3MjhhZDQxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tzvUgJC_RKWPkfH2pNk53jHe74RZjDD7bYumeTxeYcg;"

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
