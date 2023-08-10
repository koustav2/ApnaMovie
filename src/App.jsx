/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { fetchDataMovies } from './utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { getAPiConfiguration, getGenres } from './redux/slice/globalSlice';
import Home from './pages/home/Home';
import Result from './pages/result/Result';
import Explore from './pages/explore/Explore';
import Details from './pages/details/MovieDetails';
import NotFound from './pages/404/NotFound';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
    const dispatch = useDispatch()
    const { url } = useSelector(state => state.home)




    const fetchApiConfig = async () => {
        try {
            const res = await fetchDataMovies('/configuration');
            const url = {
                backdrop: res.images.secure_base_url + 'original',
                poster: res.images.secure_base_url + 'original',
                profile: res.images.secure_base_url + 'original',
            }
            dispatch(getAPiConfiguration(url))
        } catch (err) {
            console.log(err);
        }


    }


    const genersCall = async () => {
        let promises = []
        let endPoint = ['tv', 'movie']
        let all = {}
        endPoint.forEach((end) => {
            promises.push(fetchDataMovies(`/genre/${end}/list`,))
        })

        try {
            const res = await Promise.all(promises)
            res.map(({ genres }) => {
                return genres.map((item) => (all[item.id] = item));
            });
            dispatch(getGenres(all))
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchApiConfig()
        genersCall()
    }, [])



    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:mediaType/:id" element={<Details />} />
                <Route path="/search/:query" element={<Result />} />
                <Route path="/explore/:mediaType" element={<Explore />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App
