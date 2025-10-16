import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box"> Description</div>
        <div className="descriptionbox-nav-box fade"> Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
            An e-commerce wesbite ia an online platform the facilitate buying and selling of products or service over the
            internet serves as a virtual marketplace where businesses and individuals can showcase their products, interact 
            with customers, and conduct transactions without the need for a physical presence. E-commerce website have 
            gained immense popularity due to their convenience accessibility, and the gobal reach they offer. 
        </p>
        <p>
            E-commerce website typically display products or services a detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usuallyhas its own dedicated with relvant information.  
        </p>
      </div>
    </div>
  )
}

export default DescriptionBox
