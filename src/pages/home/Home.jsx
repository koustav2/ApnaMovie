/* eslint-disable no-unused-vars */
import React from 'react';
import './style.scss';
import Banner from './banner/Banner';
import Trending from './homeComponents/Trending';
import Popular from './popular/Popular';
import TopRated from './topRated/TopRated';



const Home = () => {
  return (
    <div className='homePage'>
      <Banner />
      <Trending/>
      <Popular/>
      <TopRated/>
    </div>
  )
}

export default Home
