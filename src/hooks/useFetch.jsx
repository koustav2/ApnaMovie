import { useEffect, useState } from "react";
import { fetchDataMovies } from "../utils/api";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUrl = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetchDataMovies(url);
                if (res) {
                    setData(res);
                } else {
                    setError("No data available.");
                }
            } catch (err) {
                setError("Something went wrong!");
            } finally {
                setLoading(false);
            }
        };

        if (url) {
            fetchUrl();
        } else {
            setError("URL not provided.");
            setLoading(false);
        }
    }, [url]);

    return { data, loading, error };
};

export default useFetch;


// const url = 'https://api.themoviedb.org/3/movie/615656/credits?language=en-US';