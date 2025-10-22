import React, { useContext, useState, useEffect } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assests/star_icon.png';
import star_dull_icon from '../Assests/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import { useLocation, Link } from 'react-router-dom';

const ProductDisplay = (props) => {
  const location = useLocation();
  const routeProduct = location.state?.product;
  const { product: propProduct } = props;
  const { addToCart } = useContext(ShopContext);

  const product = routeProduct || propProduct;

  const [zoom, setZoom] = useState(1);
  const [mainImage, setMainImage] = useState(
    product?.image || product?.thumbnail || product?.images?.[0]
  );
  const [selectedSize, setSelectedSize] = useState(null);

  // 🆕 Popup state
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setMainImage(product?.image || product?.thumbnail || product?.images?.[0]);
    setZoom(1);
    setSelectedSize(null);
  }, [product]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 1));

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart!");
      return;
    }
    addToCart({ ...product, selectedSize });
    setShowPopup(true); // show popup after adding
  };

  const closePopup = () => setShowPopup(false);

  if (!product) return <div className="loading">Loading product details...</div>;

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image || product.images?.[0]} alt=""
            onClick={() => setMainImage(product.image || product.images?.[0])} />
          <img src={product.image || product.images?.[1] || product.images?.[0]} alt=""
            onClick={() => setMainImage(product.images?.[1] || product.image)} />
          <img src={product.image || product.images?.[2] || product.images?.[0]} alt=""
            onClick={() => setMainImage(product.images?.[2] || product.image)} />
          <img src={product.image || product.images?.[3] || product.images?.[0]} alt=""
            onClick={() => setMainImage(product.images?.[3] || product.image)} />
        </div>

        <div className="productdisplay-img">
          <img
            className='productdisplay-main-img'
            src={mainImage}
            alt={product.name || product.title}
            style={{
              transform: `scale(${zoom})`,
              transition: 'transform 0.3s ease',
            }}
          />

          <div className="zoom-controls">
            <button onClick={handleZoomOut}>−</button>
            <button onClick={handleZoomIn}>+</button>
          </div>
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name || product.title}</h1>

        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-prices-old">
            ${product.old_price || (product.price ? (product.price + 20).toFixed(2) : 'N/A')}
          </div>
          <div className="productdisplay-right-prices-new">
            ${product.new_price || product.price || 'N/A'}
          </div>
        </div>

        <div className="productdisplay-right-description">
          {product.description ||
            "A lightweight, usually knitted pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment."
          }
        </div>

        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                className={`size-option ${selectedSize === size ? "selected" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        
        <button onClick={handleAddToCart}>ADD TO CART</button>

        <p className="productdisplay-right-category">
          <span>Category : </span> {product.category?.name || product.category || 'Uncategorized'}
        </p>

        <p className="productdisplay-right-category">
          <span>Tags : </span> Modern, Latest
        </p>
      </div>

      {/* 🆕 Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <img src={product.image || product.thumbnail} alt={product.name} />
            <h2>{product.name || product.title}</h2>
            <p>Size: {selectedSize}</p>
            <p>Price: ${product.price || product.new_price}</p>
            <div className="popup-buttons">
              <Link to="/cart" className="goto-cart">Go to Cart</Link>
              <button onClick={closePopup}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;
