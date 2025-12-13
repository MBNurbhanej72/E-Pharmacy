import { forwardRef } from "react";
import { FaStar } from "react-icons/fa";
import "../App.css";
import dayjs from "dayjs";
import RatingStar from "./RatingStar";

const ProductInvoice = forwardRef(({ productData }, ref) => {
  if (!productData) return null;

  const {
    product_name,
    default_image,
    category_name,
    sub_category_name,
    manufacturer_name,
    list_price,
    sale_price,
    discount_percent,
    current_stock,
    product_description,
    disclaimer,
    product_review_total,
    avg_rate,
    total_review,
    id,
  } = productData;

  const discountAmount = Number(list_price) && Number(sale_price) ?
    Number(list_price) - Number(sale_price) : null;

  const renderStars = (rating) => {
    const r = Number(rating) || 0;
    return (
      <span className="pi-rating-stars">
        {[1, 2, 3, 4, 5].map((i) => (
          <FaStar key={i} className={i <= r ? "active" : ""} />
        ))}
      </span>
    );
  };


  const date = new Date();

  const currentDate = dayjs(date).format("DD/MM/YYYY");


  return (
    <div className="d-flex justify-content-center">
      <div className="py-4 product-invoice-page" ref={ref}>
        <div className="container card p-3 w-100 border-0 product-invoice-card">
          {/* Top invoice-style header */}
          <div className="card-header d-flex justify-content-between align-items-start flex-wrap gap-3 border-0">
            <div>
              <h5 className="mb-1 fw-semibold">Product Detail</h5>
              <p className="text-muted mb-0 small">
                Product ID: <span className="fw-semibold">#{id}</span>
              </p>
            </div>

            <div className="text-end">
              <p className="mb-1 text-muted small">Date</p>
              <h6 className="mb-0 fw-semibold">{currentDate}</h6>
            </div>
          </div>

          <hr className="my-2" />

          {/* Main body */}
          <div className="card-body pt-0">
            <div className="row g-4">
              {/* Left: image + basic info */}
              <div className="col-lg-4 px-0 product-img-main">
                <div className="pi-main-image-wrapper mb-3">
                  <img
                    src={default_image}
                    alt={product_name}
                    className="img-fluid h-100 rounded-3 pi-main-image"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </div>
              </div>

              {/* Right: product meta + price summary */}
              <div className="col-lg-8 p-0">
                {/* Product title + category tags */}
                <div className="d-flex justify-content-between flex-wrap gap-2 mb-3">
                  <div>
                    <h4 className="mb-1 fw-semibold">{product_name}</h4>
                    <div className="d-flex flex-wrap gap-2 align-items-center">
                      <span className="badge border-0 py-2 px-3 my-2 bg-label-primary">
                        {category_name || "Category"}
                      </span>
                      {sub_category_name && (
                        <span className="badge border-0 py-2 px-3 my-2 bg-label-secondary">
                          {sub_category_name}
                        </span>
                      )}
                      {manufacturer_name && (
                        <span className="badge border-0 py-2 px-3 my-2 bg-label-info">
                          {manufacturer_name}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rating box */}
                  <div className="pi-rating-box text-end">
                    <div className="d-flex flex-column align-items-end">
                      <div className="d-flex align-items-center gap-1">
                        <span className="fw-semibold" style={{ marginTop: 2 }}>{avg_rate || 0}</span>
                        <div className="rating m-0 ps-1 pe-0">
                          <RatingStar rating={product_review_total === 0 ? 0 : avg_rate} />
                        </div>
                      </div>
                      <small className="text-muted">
                        {total_review || product_review_total || 0} review
                        {(total_review || product_review_total || 0) === 1 ? "" : "s"}
                      </small>
                    </div>
                  </div>
                </div>

                {/* Price row */}
                <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
                  <div>
                    <div className="d-flex align-items-baseline gap-2">
                      <h3 className="mb-0 fw-semibold">₹{sale_price}</h3>
                      {list_price && (
                        <span className="text-muted text-decoration-line-through">
                          ₹{list_price}
                        </span>
                      )}
                      {discount_percent && (
                        <span className="badge border-0 p-2 bg-label-success">
                          {discount_percent}% OFF
                        </span>
                      )}
                    </div>
                    {discountAmount !== null && (
                      <small className="text-muted">
                        You save ₹{discountAmount.toFixed(2)}
                      </small>
                    )}
                  </div>
                </div>

                <hr className="my-4" />

                {/* Meta info grid */}
                <div className="row g-3">
                  <div className="col-6">
                    <h6 className="fw-semibold mb-2">Product Info</h6>
                    <ul className="list-unstyled mb-0 pi-meta-list">
                      <li>
                        <span>Category:</span> 
                        <strong>{category_name}</strong>
                      </li>
                      <li>
                        <span>Sub Category:</span>
                        <strong>{sub_category_name}</strong>
                      </li>
                      <li>
                        <span>Prescription Required:</span>{" "}
                        <strong>
                          {productData.is_prescription_needed === "Y" ? "Yes" : "No"}
                        </strong>
                      </li>
                      <li>
                        <span>Product Banned:</span>{" "}
                        <strong>{productData.is_banned === "Y" ? "Yes" : "No"}</strong>
                      </li>
                      <li>
                        <span>Product Discontinued:</span>{" "}
                        <strong>
                          {productData.is_discontinued === "Y" ? "Yes" : "No"}
                        </strong>
                      </li>
                    </ul>
                  </div>

                  <div className="col-6">
                    <h6 className="fw-semibold mb-2">Manufacturer & Status</h6>
                    <ul className="list-unstyled mb-0 pi-meta-list">
                      <li>
                        <span>Manufacturer:</span>
                        <strong>{manufacturer_name}</strong>
                      </li>
                      <li>
                        <span>MRP:</span> 
                        <strong>₹{list_price}</strong>
                      </li>
                      <li>
                        <span>Selling Price:</span> 
                        <strong>₹{sale_price}</strong>
                      </li>
                      <li>
                        <span>Live Status:</span>{" "}
                        <strong>{productData.is_live === "Y" ? "Live" : "Not Live"}</strong>
                      </li>
                      <li>
                        <span>Current Stock:</span>{" "}
                        <strong>{current_stock}</strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>


            {/* Description & disclaimer */}
            <div className="row g-4">
              <div className="col-md-8 p-0 ">

                <hr className="my-3" />

                <h6 className="fw-semibold mb-2">Description</h6>
                <p className="text-muted mb-0 pi-description">
                  {product_description}
                </p>
              </div>
              <div className="col-md-4 p-0">
                <div className="pi-disclaimer-box rounded-3 p-3">
                  <h6 className="fw-semibold mb-2">Disclaimer</h6>
                  <p className="text-muted small mb-0">{disclaimer}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductInvoice;
