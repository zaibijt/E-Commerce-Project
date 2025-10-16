import React from 'react'
import './Hero.css';
import hand_icon from '../Assests/hand_icon.png';
import arrow_icon from '../Assests/arrow.png';
import hero_img  from  '../Assests/hero_image.png' 
const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>
            New Arrivals Only
        </h2>
        <div>
            <div className="hand-hand-icon">
                <p>new</p>
                <img src = {hand_icon} alt="" />
            </div>
            <p className='collection-text'>collection</p>
                <p className='for-everyone'>for everyone</p>
            <div className="hero-latest-btn">
                <div>Latest Collection</div>
                <img src={arrow_icon} alt="" />
            </div>
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_img} alt="" />
      </div>
    </div>
  )
}

export default Hero
