// import { forwardRef } from "react";
// import { FaStar } from "react-icons/fa";
// import "../App.css";

// const ProductInvoice = forwardRef(({ productData }, ref) => {
//   if (!productData) return null;

//   const {
//     product_name,
//     default_image,
//     category_name,
//     sub_category_name,
//     manufacturer_name,
//     list_price,
//     sale_price,
//     discount_percent,
//     created_on,
//     delivery_day_from_display,
//     delivery_day_to_display,
//     current_stock,
//     product_description,
//     disclaimer,
//     product_image = [],
//     product_review_total,
//     product_review = [],
//     avg_rate,
//     total_review,
//     id,
//     slug,
//   } = productData;

//   const inStock = Number(current_stock) > 0;
//   const discountAmount =
//     Number(list_price) && Number(sale_price)
//       ? Number(list_price) - Number(sale_price)
//       : null;

//   const renderStars = (rating) => {
//     const r = Number(rating) || 0;
//     return (
//       <span className="pi-rating-stars">
//         {[1, 2, 3, 4, 5].map((i) => (
//           <FaStar key={i} className={i <= r ? "active" : ""} />
//         ))}
//       </span>
//     );
//   };

//   return (
//     <div className="container py-4 product-invoice-page" ref={ref}>
//       <div className="card shadow-sm border-0 product-invoice-card">
//         {/* Top invoice-style header */}
//         <div className="card-header d-flex justify-content-between align-items-start flex-wrap gap-3 border-0 pb-0">
//           <div>
//             <h5 className="mb-1 fw-semibold">Product Detail</h5>
//             <p className="text-muted mb-0 small">
//               Product ID: <span className="fw-semibold">#{id}</span> · Slug:{" "}
//               <span className="text-decoration-underline">{slug}</span>
//             </p>
//           </div>

//           <div className="text-end">
//             <p className="mb-1 text-muted small">Created On</p>
//             <h6 className="mb-0 fw-semibold">{created_on}</h6>
//           </div>
//         </div>

//         <hr className="mt-3 mb-0" />

//         {/* Main body */}
//         <div className="card-body">
//           <div className="row g-4">
//             {/* Left: image + basic info */}
//             <div className="col-lg-4">
//               <div className="pi-main-image-wrapper mb-3">
//                 <img
//                   src={default_image}
//                   alt={product_name}
//                   className="img-fluid rounded-3 pi-main-image"
//                 />
//                 <span
//                   className={`pi-badge-stock badge rounded-pill ${
//                     inStock
//                       ? "bg-success-subtle text-success"
//                       : "bg-danger-subtle text-danger"
//                   }`}
//                 >
//                   {inStock ? `In Stock (${current_stock})` : "Out of Stock"}
//                 </span>
//               </div>
//             </div>

//             {/* Right: product meta + price summary */}
//             <div className="col-lg-8">
//               {/* Product title + category tags */}
//               <div className="d-flex justify-content-between flex-wrap gap-2 mb-3">
//                 <div>
//                   <h4 className="mb-1 fw-semibold">{product_name}</h4>
//                   <div className="d-flex flex-wrap gap-2 align-items-center">
//                     <span className="badge bg-label-primary">
//                       {category_name || "Category"}
//                     </span>
//                     {sub_category_name && (
//                       <span className="badge bg-label-secondary">
//                         {sub_category_name}
//                       </span>
//                     )}
//                     {manufacturer_name && (
//                       <span className="badge bg-label-info">
//                         {manufacturer_name}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Rating box */}
//                 <div className="pi-rating-box text-end">
//                   <div className="d-flex flex-column align-items-end">
//                     <div className="d-flex align-items-center gap-1">
//                       <span className="fw-semibold">{avg_rate || 0}</span>
//                       {renderStars(avg_rate)}
//                     </div>
//                     <small className="text-muted">
//                       {total_review || product_review_total || 0} review
//                       {(total_review || product_review_total || 0) === 1 ? "" : "s"}
//                     </small>
//                   </div>
//                 </div>
//               </div>

//               {/* Price row */}
//               <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
//                 <div>
//                   <div className="d-flex align-items-baseline gap-2">
//                     <h3 className="mb-0 fw-semibold">₹{sale_price}</h3>
//                     {list_price && (
//                       <span className="text-muted text-decoration-line-through">
//                         ₹{list_price}
//                       </span>
//                     )}
//                     {discount_percent && (
//                       <span className="badge bg-label-success">
//                         {discount_percent}% OFF
//                       </span>
//                     )}
//                   </div>
//                   {discountAmount !== null && (
//                     <small className="text-muted">
//                       You save ₹{discountAmount.toFixed(2)}
//                     </small>
//                   )}
//                 </div>

//                 <div className="text-end">
//                   <p className="mb-1 text-muted small">Estimated Delivery</p>
//                   <h6 className="mb-0 fw-semibold">
//                     {delivery_day_from_display} - {delivery_day_to_display}
//                   </h6>
//                 </div>
//               </div>

//               <hr className="my-3" />

//               {/* Meta info grid */}
//               <div className="row g-3">
//                 <div className="col-md-6">
//                   <h6 className="fw-semibold mb-2">Product Info</h6>
//                   <ul className="list-unstyled mb-0 pi-meta-list">
//                     <li>
//                       <span>Category:</span> {category_name}
//                     </li>
//                     <li>
//                       <span>Sub Category:</span> {sub_category_name}
//                     </li>
//                     <li>
//                       <span>Prescription Required:</span>{" "}
//                       <strong>
//                         {product.is_prescription_needed === "Y" ? "Yes" : "No"}
//                       </strong>
//                     </li>
//                     <li>
//                       <span>Product Banned:</span>{" "}
//                       <strong>{product.is_banned === "Y" ? "Yes" : "No"}</strong>
//                     </li>
//                     <li>
//                       <span>Product Discontinued:</span>{" "}
//                       <strong>
//                         {product.is_discontinued === "Y" ? "Yes" : "No"}
//                       </strong>
//                     </li>
//                   </ul>
//                 </div>

//                 <div className="col-md-6">
//                   <h6 className="fw-semibold mb-2">Manufacturer & Status</h6>
//                   <ul className="list-unstyled mb-0 pi-meta-list">
//                     <li>
//                       <span>Manufacturer:</span> {manufacturer_name}
//                     </li>
//                     <li>
//                       <span>MRP:</span> ₹{list_price}
//                     </li>
//                     <li>
//                       <span>Selling Price:</span> ₹{sale_price}
//                     </li>
//                     <li>
//                       <span>Live Status:</span>{" "}
//                       <strong>{product.is_live === "Y" ? "Live" : "Not Live"}</strong>
//                     </li>
//                     <li>
//                       <span>Current Stock:</span>{" "}
//                       <strong>{current_stock}</strong>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <hr className="my-4" />

//           {/* Description & disclaimer */}
//           <div className="row g-4">
//             <div className="col-md-8">
//               <h6 className="fw-semibold mb-2">Description</h6>
//               <p className="text-muted mb-0 pi-description">
//                 {product_description}
//               </p>
//             </div>
//             <div className="col-md-4">
//               <div className="pi-disclaimer-box rounded-3 p-3">
//                 <h6 className="fw-semibold mb-2">Disclaimer</h6>
//                 <p className="text-muted small mb-0">{disclaimer}</p>
//               </div>
//             </div>
//           </div>

//           {/* (Reviews part tumne already hata diya iss version me, isliye main yehi tak rehne deta hoon) */}
//         </div>
//       </div>
//     </div>
//   );
// });

// export default ProductInvoice;
