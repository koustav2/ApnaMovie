/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react'
import './style.scss'

import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './banner/DetailsBanner'
import Credits from './credits/Credits'
import VideosSection from './videos/Videos'
import Similar from "./carousels/Similer";
import Recommendation from "./carousels/Recommendation";
// https://api.themoviedb.org/3/search/movie

const Details = () => {
    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`)

    const { data: credits, loading: creditsLoading } = useFetch(
        `/${mediaType}/${id}/credits`
    );




    return (
        <div>
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
            <Credits data={credits?.cast} loading={creditsLoading}  crew={credits?.crew}/>
            <VideosSection data={data} loading={loading}/>
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
        </div>
    )
}

export default Details
