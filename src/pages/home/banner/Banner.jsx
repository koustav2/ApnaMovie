/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/img/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";


const Banner = () => {
  const [background, setBackground] = useState("")
  const [query, setQuery] = useState("")
  const navigate = useNavigate();
  const { data, loading, error } = useFetch("/movie/popular");
  const { url } = useSelector((state) => state.home);


  const queryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  }


  useEffect(() => {
    if (data) {
      const random = Math.floor(Math.random() * 20);
      const bg = url.backdrop + data?.results?.[random]?.backdrop_path;
      setBackground(bg);
    }
  }, [data, url.backdrop]);







  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Oceans of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={queryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Banner;
