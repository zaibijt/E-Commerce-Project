import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams, useLocation } from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Product = () => {
  const context = useContext(ShopContext);
  const all_product = context?.all_product || [];
  const apiProducts = context?.apiProducts || [];

  const { productId } = useParams();
  const location = useLocation();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      let newProduct = null;

      // ✅ 1. Use product passed via Link (RelatedProducts)
      if (location.state?.product && Number(location.state.product.id) === Number(productId)) {
        newProduct = location.state.product;
      }

      // ✅ 2. Search in local (assets) products
      if (!newProduct && Array.isArray(all_product) && all_product.length > 0) {
        newProduct = all_product.find((e) => Number(e.id) === Number(productId));
      }

      // ✅ 3. Search in API products (if stored in context)
      if (!newProduct && Array.isArray(apiProducts) && apiProducts.length > 0) {
        newProduct = apiProducts.find((e) => Number(e.id) === Number(productId));
      }

      // ✅ 4. Fetch directly from API if still not found
      if (!newProduct) {
        try {
          const res = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);
          if (res.ok) {
            const data = await res.json();
            newProduct = {
              id: data.id,
              name: data.title,
              image: data.images?.[0],
              images: data.images,
              price: data.price,
              new_price: data.price,
              old_price: (data.price * 1.2).toFixed(2),
              description: data.description,
              category: data.category?.name || "Uncategorized",
            };
          }
        } catch (err) {
          console.error("Error fetching product:", err);
        }
      }

      setProduct(newProduct || null);
    };

    loadProduct();
  }, [productId, all_product, apiProducts, location.state]);

  if (!product) {
    return <div className="loading">Loading product details...</div>;
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
