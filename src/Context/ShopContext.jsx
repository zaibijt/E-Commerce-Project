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

    // ✅ Include selected size in key (fallback to 'default')
    const sizeKey = product.selectedSize || "default";
    const uniqueKey = `${Number(product.id)}-${sizeKey}`;

    // Step 1: Prevent double clicks or duplicate state updates
    setCartItems((prev) => {
      const newCart = { ...prev, [uniqueKey]: (prev[uniqueKey] || 0) + 1 };
      return newCart;
    });

    // Step 2: Only add product info once (per unique ID + size)
    setExtraProducts((prev) => {
      const alreadyExists = prev.some(
        (p) => `${Number(p.id)}-${p.selectedSize || "default"}` === uniqueKey
      );
      if (!alreadyExists) {
        console.log(
          " Added new product to extraProducts:",
          product.title || product.name,
          "with size:",
          sizeKey
        );
        return [...prev, { ...product, selectedSize: sizeKey }];
      } else {
        console.log(
          " Product already exists in extraProducts:",
          product.title || product.name,
          "with size:",
          sizeKey
        );
        return prev;
      }
    });
  };

  // Remove from cart
  const removeFromCart = (itemId, size = "default") => {
  const uniqueKey = `${itemId}-${size}`;
  setCartItems((prev) => {
    const updated = { ...prev };
    delete updated[uniqueKey]; // 👈 poora product remove kar do
    return updated;
  });
};

  //  Increase quantity
  const increaseQuantity = (itemId, size = "default") => {
    const uniqueKey = `${itemId}-${size}`;
    setCartItems((prev) => ({
      ...prev,
      [uniqueKey]: (prev[uniqueKey] || 0) + 1,
    }));
  };

  //  Decrease quantity
  const decreaseQuantity = (itemId, size = "default") => {
    const uniqueKey = `${itemId}-${size}`;
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[uniqueKey] > 1) {
        updated[uniqueKey] -= 1;
      } else {
        delete updated[uniqueKey];
      }
      return updated;
    });
  };

  //  Get total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    const allData = [...all_product, ...extraProducts];
    for (const key in cartItems) {
      if (cartItems[key] > 0) {
        const [id, size] = key.split("-");
        const itemInfo = allData.find(
          (p) => String(p.id) === id && (p.selectedSize || "default") === size
        );
        if (itemInfo) {
          totalAmount +=
            (itemInfo.new_price || itemInfo.price || 0) * cartItems[key];
        }
      }
    }
    return totalAmount;
  };

  //  Get total cart items
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (let key in cartItems) {
      if (cartItems[key] > 0) {
        totalItem += cartItems[key];
      }
    }
    return totalItem;
  };

  //  FIXED: Prevent duplicate API + assets products
  const getCartProducts = () => {
    const allCombined = [...all_product, ...extraProducts];

    //  Remove duplicates (same ID + size) - API product preferred
    const uniqueProducts = [];
    const seenKeys = new Set();

    for (let i = allCombined.length - 1; i >= 0; i--) {
      const p = allCombined[i];
      const key = `${Number(p.id)}-${p.selectedSize || "default"}`;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        uniqueProducts.unshift(p);
      }
    }

    // Return only products that are in cart
    const filtered = uniqueProducts.filter(
      (product) =>
        cartItems[`${Number(product.id)}-${product.selectedSize || "default"}`] >
        0
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
