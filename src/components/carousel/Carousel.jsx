/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import './style.scss'
import { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useState } from "react";
import ContentWrapper from '../contentWrapper/ContentWrapper';
import Img from '../img/Img';
import FallBack from '../../assets/no-poster.png';
import CircleRating from '../circle/Circle';
import Genres from '../genres/Genres';


const Carousel = ({ data, loading, endpoint,title }) => {
    const navigate = useNavigate();
    const carouselRef = useRef();
    const { url } = useSelector((state) => state.home);


    const navigation = (dir) => {
        const container = carouselRef.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    }

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className='carouselTitle'>{title}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                {
                    !loading ? (
                        <div className="carouselItems" ref={carouselRef}>
                            {
                                data?.map((item) => {
                                    const posterUrl = item.poster_path
                                        ? url.poster + item.poster_path
                                        : FallBack;
                                    return (
                                        <div className="carouselItem"
                                            key={item.id}
                                            onClick={() =>
                                                navigate(`/${item.media_type || endpoint}/${item.id}`
                                                )
                                            }
                                        >
                                            <div className="posterBlock">
                                                <Img src={posterUrl} />
                                                <CircleRating
                                                    rating={item.vote_average.toFixed(
                                                        1
                                                    )}
                                                />
                                                <Genres
                                                    data={item.genre_ids.slice(0, 2)}
                                                />
                                            </div>
                                            <div className="textBlock">
                                                <span className="title">
                                                    {item.title || item.name}
                                                </span>
                                                <span className="date">
                                                    {dayjs(item.release_date || item.first_air_date).format(
                                                        "MMM D, YYYY"
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : (
                        <div className="loadingSkeleton">
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                        </div>
                    )
                }
            </ContentWrapper >
        </div >
    )
}

export default Carousel


const skItem = () => {
    return (
        <div className="skeletonItem">
            <div className="posterBlock skeleton"></div>
            <div className="textBlock">
                <div className="title skeleton"></div>
                <div className="date skeleton"></div>
            </div>
        </div>
    );
};