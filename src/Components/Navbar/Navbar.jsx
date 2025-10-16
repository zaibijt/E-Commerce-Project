import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../Assests/logo.png";
import cart_icon from "../Assests/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menu, setMenu] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);

  return (
    <div className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>Shopper</p>
      </div>

      <ul className={`nav-menu ${isOpen ? "open" : ""}`}>
        <li onClick={() => setMenu("shop")}>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Shop
          </Link>
          {menu === "shop" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("men")}>
          <Link to="/mens" onClick={() => setIsOpen(false)}>
            Men
          </Link>
          {menu === "men" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("women")}>
          <Link to="/womens" onClick={() => setIsOpen(false)}>
            Women
          </Link>
          {menu === "women" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link to="/kids" onClick={() => setIsOpen(false)}>
            Kids
          </Link>
          {menu === "kids" ? <hr /> : null}
        </li>
      </ul>

      {/* Desktop Right Section */}
      <div className="nav-login-cart">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/cart">
          <div className="nav-cart">
            <img src={cart_icon} alt="cart" />
            <div className="nav-cart-count">{getTotalCartItems()}</div>
          </div>
        </Link>
      </div>

      {/* Toggle Button */}
      <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <ul>
            <li onClick={() => setMenu("shop")}>
              <Link to="/" onClick={() => setIsOpen(false)}>
                Shop
              </Link>
              {menu === "shop" ? <hr /> : null}
            </li>
            <li onClick={() => setMenu("men")}>
              <Link to="/mens" onClick={() => setIsOpen(false)}>
                Men
              </Link>
              {menu === "men" ? <hr /> : null}
            </li>
            <li onClick={() => setMenu("women")}>
              <Link to="/womens" onClick={() => setIsOpen(false)}>
                Women
              </Link>
              {menu === "women" ? <hr /> : null}
            </li>
            <li onClick={() => setMenu("kids")}>
              <Link to="/kids" onClick={() => setIsOpen(false)}>
                Kid's
              </Link>
              {menu === "kids" ? <hr /> : null}
            </li>
          </ul>

          <div className="mobile-login-cart">
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <button>Login</button>
            </Link>
            <Link to="/cart" onClick={() => setIsOpen(false)}>
              <div className="nav-cart">
                <img src={cart_icon} alt="cart" />
                <div className="nav-cart-count">{getTotalCartItems()}</div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
