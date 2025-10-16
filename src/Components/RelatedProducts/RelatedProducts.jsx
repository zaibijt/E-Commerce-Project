import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";
import localData from "../Assests/data"; // fallback data

const RelatedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=8");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();

        const formattedData = data.map((item) => ({
          id: item.id,
          name: item.title,
          image: item.images?.[0] || "",
          images: item.images || [],
          description: item.description,
          category: item.category?.name || "Uncategorized",
          price: item.price,
          new_price: item.price,
          old_price: (item.price * 1.2).toFixed(2),
        }));

        setProducts(formattedData);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(localData);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {products.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
            fromApi={true}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
