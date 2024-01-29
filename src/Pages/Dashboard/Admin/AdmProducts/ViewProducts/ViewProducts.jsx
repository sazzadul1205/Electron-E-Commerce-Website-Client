import React from "react";
import noImg from "../../../../../assets/download.jfif";

const ViewProducts = ({ product }) => {
  const {
    name,
    image,
    price,
    rating,
    reviews,
    discounts,
    description,
    arrival,
    bestSeller,
    sold,
    brand,
    productType,
  } = product;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{name}</h2>
      <img src={image || noImg} alt={name} className="w-full rounded-lg mb-4" />

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <p className="text-md text-gray-700 mb-2">{description}</p>
          <p className="text-lg text-blue-500 font-semibold">{brand}</p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="text-lg text-gray-800 mb-2">Price: ${price}</p>
          <p className="text-lg text-gray-800 mb-2">Rating: {rating}</p>
          <p className="text-lg text-gray-800 mb-2">Reviews: {reviews}</p>
          <p className="text-lg text-gray-800 mb-2">Discounts: {discounts}%</p>
          <p className="text-lg text-gray-800 mb-2">Arrival: {arrival}</p>
          <p className="text-lg text-gray-800 mb-2">
            Best Seller: {bestSeller ? "Yes" : "No"}
          </p>
          <p className="text-lg text-gray-800 mb-2">Sold: {sold} units</p>
          <p className="text-lg text-gray-800 mb-2">Product Type: {productType}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
