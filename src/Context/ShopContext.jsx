import React, { createContext, useState } from "react";
import all_product from "../Components/Assests/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length + 1000; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [extraProducts, setExtraProducts] = useState([]); // API products store karega

  const addToCart = (product) => {
    if (!product || !product.id) return;

    const id = Number(product.id);

    // Step 1: Prevent double clicks or duplicate state updates
    setCartItems((prev) => {
      const newCart = { ...prev, [id]: (prev[id] || 0) + 1 };
      return newCart;
    });

    // Step 2: Only add product info once
    setExtraProducts((prev) => {
      const alreadyExists = prev.some((p) => Number(p.id) === id);
      if (!alreadyExists) {
        console.log(" Added new product to extraProducts:", product.title || product.name);
        return [...prev, product];
      } else {
        console.log("⚠️ Product already exists in extraProducts:", product.title || product.name);
        return prev;
      }
    });
  };

  // Remove from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 1) - 1, 0),
    }));
  };

  //  Increase quantity
  const increaseQuantity = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  //  Decrease quantity
  const decreaseQuantity = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 1,
    }));
  };

  //  Get total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    const allData = [...all_product, ...extraProducts];
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = allData.find((p) => Number(p.id) === Number(item));
        if (itemInfo) {
          totalAmount += (itemInfo.new_price || itemInfo.price || 0) * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  //  Get total cart items
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (let item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  //  FIXED: Prevent duplicate API + assets products
  const getCartProducts = () => {
    const allCombined = [...all_product, ...extraProducts];

    //  Remove duplicates (same ID) - API product preferred
    const uniqueProducts = [];
    const seenIds = new Set();

    for (let i = allCombined.length - 1; i >= 0; i--) {
      const p = allCombined[i];
      if (!seenIds.has(Number(p.id))) {
        seenIds.add(Number(p.id));
        uniqueProducts.unshift(p);
      }
    }

    // Return only products that are in cart
    const filtered = uniqueProducts.filter(
      (product) => cartItems[Number(product.id)] > 0
    );

    return filtered;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    increaseQuantity,
    decreaseQuantity,
    getCartProducts,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
