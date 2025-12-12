import { FaEye } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import RatingStar from "./RatingStar";


const ProductCard = ({ data }) => {
  return (
    <div className="col-xl-3 col-md-6 col-sm-12 mb-5">
      <div className="card h-100 justify-content-between">
        <div className="image-container">
          <div
            className="ep-bg-shape"
            style={{
              width: "100%",
              height: "100%",
              // background: "radial-gradient(circle, #ffffff 20%, #bcbcbc 100%)",
              background: "radial-gradient(circle, #ffffff 20%, #93d7f2   100%)",
              borderRadius: "0.7rem 4rem 0.7rem 0.7rem",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 0
            }}
          ></div>

          <img
            src={data?.default_image}
            alt={data?.product_name}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "75%",
              height: "75%",
              objectFit: "contain",
              zIndex: 200,
              mixBlendMode: "multiply", // BG remove effect
              // filter: "brightness(1.1) contrast(1.1)"
            }}
          />

          <div className="price">
            {data?.discount_percent > 0 &&
              <span className="discount-percent me-2" style={{ marginLeft: 12 }}>
                {data?.discount_percent}%
              </span>
            }

            ₹{data?.sale_price}
          </div>

        </div>
        
        <label className="favorite">
          <input defaultChecked="" type="checkbox" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#000000"
          >
            <path d="M12 20a1 1 0 0 1-.437-.1C11.214 19.73 3 15.671 3 9a5 5 0 0 1 8.535-3.536l.465.465.465-.465A5 5 0 0 1 21 9c0 6.646-8.212 10.728-8.562 10.9A1 1 0 0 1 12 20z" />
          </svg>
        </label>

        <div className="content">
          <div className="brand">By: {data?.manufacturer_name}</div>
          <NavLink className="product-name" to={`/product-details/${data?.id}`}>{data?.product_name}</NavLink>
          <div className="color-size-container">
            [{data?.sub_category_name}]
          </div>

        </div>

        <div className="button-container d-flex flex-column justify-content-center">
          <div className="rating" style={{fontSize:12}}>
            <RatingStar rating={data?.avg_rate} /> ({data?.total_review})
          </div>

          <NavLink to={`/product-details/${data?.id}`} className="buy-button button d-flex align-items-center justify-content-center gap-2 text-decoration-none">
            <FaEye size={20} /> View Details
          </NavLink>
        </div>
      </div>
    </div >
  );
};

export default ProductCard;
