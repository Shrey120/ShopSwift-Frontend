import React, { useState } from "react";

const ProductImage = ({ image }) => {
  const [mainImage, setMainImage] = useState(image[0].url);

  return (
    <>
      <div>
        {image.map((images) => {
          return (
            <img
              alt='product'
              key={images.id}
              className='product-image'
              src={images.url}
              onClick={() => setMainImage(images.url)}
            />
          );
        })}
      </div>
      <div>
        <img
          alt='product'
          className='product-main-img'
          src={mainImage}
        />
      </div>
    </>
  );
};

export default ProductImage;
