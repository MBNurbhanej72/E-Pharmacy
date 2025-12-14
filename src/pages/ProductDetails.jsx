import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode, Autoplay, Pagination } from "swiper/modules";
import dayjs from "dayjs";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Api } from "../services/api";
import { toast } from "react-toastify";
import "../App.css";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductInvoice from "../components/ProductInvoice";
import RatingStar from "../components/RatingStar";
import { FaMinus, FaStar } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";
import { useForm } from "react-hook-form";
import { pinCodeSchema } from "../validation/pinCodeSchema";
import { zodResolver } from "@hookform/resolvers/zod";


const ProductDetails = () => {
  const { id: productId } = useParams();

  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(pinCodeSchema),
    shouldFocusError: false
  });


  const { data: productData, error, isPending, mutate } = useMutation({
    mutationFn: async (productId) =>
      await Api.post(
        "product_api/product_detail",
        {
          user_agent: "EI-AAPP",
          product_id: productId,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ).then((res) => {
        if (res.data.status === "error") {
          navigate("/products");
          toast.error(res.data.message);
        }

        return res.data.data;
      }),

    onError: (err) => {
      toast.error("Something went wrong!" || err?.message + "!");
    },

    retry: 2
  });

  useEffect(() => {
    mutate(productId);
  }, [productId, mutate]);



  const { data: todaysDeals, error: tpError, isPending: tpPending } = useQuery({
    queryKey: ["todaysDeals"],

    queryFn: async () => Api.get("product_api/today_deal_product").then(res => res.data.data),

    staleTime: 24 * 60 * 60 * 1000, // 1 day
  });



  const postPinCode = useMutation({
    mutationFn: async (pc) => await Api.post("common_request_api/check_pincode", {
      user_agent: "EI-WEB",
      pincode: pc
    },
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }),

    onSuccess: (res) => {
      if (res?.data?.status === "success") {
        toast.success(res?.data?.message);
      } else {
        toast.error(errors?.pincode?.message);
        toast.error(res?.data?.message);
      }
    },

    onError: (err) => {
      toast.error("Something went wrong!" || err?.message + "!");
    }
  });



  // const [userRating, setUserRating] = useState(0);

  // const [hoverRating, setHoverRating] = useState(0);

  // const [hasClicked, setHasClicked] = useState(false);

  // const [userReview, setUserReview] = useState("");

  // const postRating = useMutation({
  //   mutationFn: async (review) => Api.post("user_api/add_rate_product", {
  //     "user_agent": "EI-WEB",
  //     "product_id": productData?.id,
  //     "rate": userRating,
  //     "review_comment": review
  //   }, {
  //     headers: {
  //       "Content-Type": "multipart/form-data"
  //     }
  //   }),

  //   onSuccess: (res) => {
  //     if (res?.data?.status === "success") {
  //       toast.success(res?.data?.message);
  //     } else {
  //       toast.error(res?.data?.message);
  //     }
  //   },

  //   onError: (err) => {
  //     toast.error("Something went wrong!" || err?.message + "!");
  //   }
  // });



  const printRef = useRef();

  const handlePrintInvoice = useReactToPrint({ contentRef: printRef });



  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [activeTab, setActiveTab] = useState("description");

  const [productQuantity, setProductQuantity] = useState(1);

  const galleryImages = productData?.product_image || [];




  const handleRemoveQuantity = () => setProductQuantity(prevQuantity => prevQuantity === 1 ? prevQuantity : prevQuantity - 1);


  const handleAddQuantity = () => setProductQuantity(prevQuantity => prevQuantity === 30 ? prevQuantity : prevQuantity + 1);



  const formattedDateTime = dayjs(productData?.created_on_orig).format("DD/MM/YYYY");


  const reviews = (productData?.product_review || [])
    ?.filter((r) => r?.status === "A" && r?.is_deleted === "N")
    ?.sort((a, b) => new Date(b?.created_on_orig) - new Date(a?.created_on_orig));



  const onSubmit = (data) => {
    postPinCode?.mutate(data?.pincode);

    reset();
  };


  const isValid = (errors) => {
    toast.error(errors?.pincode?.message);
  }



  if (error) return (
    <div className="container my-5">
      <h1>{error.message}</h1>
    </div>
  );



  return (
    <>
      {isPending ? (
        <div className="loader-main">
          <span className="loader" />
        </div>
      ) : (
        <div id="print-area" className="invoice">
          <div className="page-wrapper">
            <div className="property-details-wrap bg-cb compact-header pb-120">
              {/*Listing Details Info starts*/}
              <div className="single-property-details v1 section-padding pb-0">
                <div className="container">

                  {/* Breadcrumbs Start */}
                  <Breadcrumbs parentPath="products" parentLabel="All Products" currentLabel={productData?.product_name} />
                  {/* Breadcrumbs End */}

                  <div className="row">
                    {/* ab sirf ek hi column – full width */}
                    <div className="listing-desc-wrap">
                      {/* ====== GALLERY + NAME/PRICE SIDE BY SIDE ====== */}
                      <div id="gallery" className="list-details-section all-div pd-top-div">
                        <label className="favorite mb-0">
                          <input defaultChecked="" type="checkbox" />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#000000"
                          >
                            <path d="M12 20a1 1 0 0 1-.437-.1C11.214 19.73 3 15.671 3 9a5 5 0 0 1 8.535-3.536l.465.465.465-.465A5 5 0 0 1 21 9c0 6.646-8.212 10.728-8.562 10.9A1 1 0 0 1 12 20z" />
                          </svg>
                        </label>

                        <div className="row">
                          {/* LEFT: slider (thoda chhota, 5/12 width) */}
                          <div className="col-lg-5 col-md-12">
                            <div className="list-gallery position-relative">
                              {/* MAIN SWIPER */}
                              <Swiper
                                modules={[Navigation, Thumbs]}
                                spaceBetween={0}
                                slidesPerView={1}
                                thumbs={{
                                  swiper:
                                    thumbsSwiper && !thumbsSwiper.destroyed
                                      ? thumbsSwiper
                                      : null,
                                }}
                                className="gallery-main-swiper"
                              >
                                {galleryImages?.map((src, index) => (
                                  <SwiperSlide key={index}>
                                    <img
                                      className="d-block w-100"
                                      src={src?.image_name}
                                      alt={`slide-${index + 1}`}
                                    />
                                  </SwiperSlide>
                                ))}
                              </Swiper>

                              {/* THUMBNAILS SWIPER */}
                              <Swiper
                                modules={[FreeMode, Thumbs]}
                                onSwiper={setThumbsSwiper}
                                watchSlidesProgress
                                freeMode
                                spaceBetween={10}
                                slidesPerView={4}
                                breakpoints={{
                                  576: { slidesPerView: 4 },
                                  768: { slidesPerView: 5 },
                                  992: { slidesPerView: 6 },
                                }}
                                className="list-gallery-thumb gallery-thumbs-swiper mt-3"
                              >
                                {galleryImages?.map((src, index) => (
                                  <SwiperSlide key={index} tag="li">
                                    <img
                                      className="img-fluid d-block w-100"
                                      src={src?.image_name}
                                      alt={`thumb-${index + 1}`}
                                    />
                                  </SwiperSlide>
                                ))}
                              </Swiper>
                            </div>
                          </div>

                          {/* RIGHT: name + price + author + buttons */}
                          <div className="col-lg-7 col-md-12 mt-4 mt-lg-0">
                            <div className="pd-product-name">
                              <h4 className="mb-3">{productData?.product_name}</h4>
                            </div>

                            <div className="rating p-0 fw-medium">
                              <span className="rating-value">{productData?.product_review_total === 0 ? 0 : productData?.avg_rate}</span>

                              <span className="rating-stars">
                                <RatingStar rating={productData?.product_review_total === 0 ? 0 : productData?.avg_rate} />
                              </span>

                              <span className="rating-count">
                                {`(${productData?.total_review} ${productData?.total_review > 1 ? "Reviews" : "Review"})`}
                              </span>
                            </div>


                            <div className="d-flex justify-content-between mt-2">
                              <div className="pd-upper-details d-flex flex-column justify-content-between">
                                <div className="d-flex align-items-center">
                                  <p className="pd-para">Manufacturer <span>:</span></p>
                                  <p className="pd-para">{productData?.manufacturer_name}</p>
                                </div>

                                <div className="d-flex align-items-center">
                                  <p className="pd-para">Availability <span>:</span></p>
                                  <p className="pd-para">
                                    {productData?.current_stock > 0 ? (
                                      <>
                                        <span className="text-success">In Stock</span>
                                        {` (${productData?.current_stock} ${productData?.current_stock > 1 ? "items" : "item"})`}
                                      </>
                                    ) : (
                                      <span className="text-danger">Out Of Stock</span>
                                    )}
                                  </p>
                                </div>

                                <div className="d-flex align-items-center">
                                  <p className="pd-para">Delivery by <span>:</span></p>
                                  <p className="pd-para">{productData?.delivery_day_from_display} to {productData?.delivery_day_to_display}</p>
                                </div>
                              </div>

                              <div className="text-center">
                                <QRCode value={`https://e-pharmacy-by-mb.vercel.app/product-details/${productData?.id}`} size={85} />
                                <p className="mt-2 mb-0 small text-muted">Scan to view <br /> this product on your phone</p>
                              </div>
                            </div>

                            <hr />

                            <div className="pd-price">
                              <p className="pd-actual-price">
                                <span className="pd-discount">{productData?.discount_percent}% OFF</span>
                                <span className="rupees-symbol">₹</span><span>{productData?.sale_price}</span>
                              </p>

                              <p className="pd-mrp">M.R.P. : <span>₹{productData?.list_price}</span></p>
                            </div>

                            <div className="pd-pin-code gap-3 flex-column flex-sm-row align-items-start align-items-sm-center">
                              <div className="d-flex align-items-center gap-3">
                                <span>Pincode / Zipcode :</span>

                                <input type="text" {...register("pincode")} />
                              </div>

                              <button type="button" onClick={handleSubmit(onSubmit, isValid)}>Check Delivery</button>
                            </div>

                            {productData?.current_stock > 0 && (
                              <>
                                <div className="pd-quantity">
                                  <div className="d-flex align-items-center" style={{ gap: 85 }}>
                                    <span className="w-auto">Quantity :</span>

                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                      <button onClick={handleRemoveQuantity}><FaMinus size={12} /></button>

                                      <input type="text" value={productQuantity} disabled />

                                      <button onClick={handleAddQuantity}><FaPlus size={12} /></button>
                                    </div>
                                  </div>

                                  <div className="pd-buy-btn">
                                    <button>Add to cart</button>
                                  </div>
                                </div>
                              </>
                            )}

                          </div>
                        </div>

                      </div>


                      {/* ========= TABS + CONTENT ========= */}
                      <div className="list-details-wrap">
                        <div className="pd-tabs-wrapper list-details-section px-0 all-div">
                          {/* Tabs header */}
                          <div className="pd-tabs-header">
                            <button
                              type="button"
                              className={`pd-tab tab-1 ${activeTab === "description" ? "active" : ""
                                }`}
                              onClick={() => setActiveTab("description")}
                            >
                              Description
                            </button>

                            <button
                              type="button"
                              className={`pd-tab tab-2 ${activeTab === "specs" ? "active" : ""
                                }`}
                              onClick={() => setActiveTab("specs")}
                            >
                              Specifications
                            </button>
                          </div>

                          {/* Tabs content */}
                          <div className="pd-tab-content pb-0">
                            {/* DESCRIPTION TAB */}
                            {activeTab === "description" && (
                              <>
                                <p className="mb-0">
                                  {productData?.product_description}
                                </p>

                                <p className="mt-4 mb-0">Disclaimer : {productData?.disclaimer}</p>

                                <button className="pd-print-btn mt-4" onClick={handlePrintInvoice}>Print Product Details</button>

                                <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
                                  <ProductInvoice ref={printRef} productData={productData} />
                                </div>
                              </>
                            )}

                            {/* SPECIFICATIONS TAB */}
                            {activeTab === "specs" && (
                              <div className="spec-container">
                                <ul className="spec-list">
                                  <li className="pt-0">
                                    <span>Category :</span> {productData?.category_name}
                                  </li>
                                  <li>
                                    <span>Sub Category:</span> {productData?.sub_category_name}
                                  </li>
                                  <li>
                                    <span>Prescription Required:</span>
                                    {productData?.is_prescription_needed === "Y" ? "Yes" : "No"}
                                  </li>
                                  <li>
                                    <span>Product Banned:</span>
                                    {productData?.is_banned === "Y" ? "Yes" : "No"}
                                  </li>
                                  <li>
                                    <span>Product Discontinued:</span>
                                    {productData?.is_discontinued === "Y" ? "Yes" : "No"}
                                  </li>
                                  <li className="pb-0">
                                    <span>Added On:</span> {formattedDateTime}
                                  </li>
                                </ul>
                              </div>
                            )}

                          </div>
                        </div>
                      </div>



                      {/* ========= REVIEWS SECTION – TABS KE NEECH ========= */}
                      <div
                        id="reviews"
                        className="list-details-section all-div"
                      >
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h4 className="mb-0">Customer reviews</h4>

                          <h4 className="contact-form__rate-bx-show mb-0">
                            {productData?.product_review_total === 0 ? 0 : productData?.avg_rate} out of 5
                          </h4>
                        </div>

                        <div className="row mb-5">
                          <div className="col-md-6 col-sm-7 col-12">
                            <p className="contact-form__rate">
                              {productData?.product_review_total} {`Global ${productData?.total_review > 1 ? "Ratings" : "Rating"}`}
                            </p>
                          </div>
                        </div>

                        <div className="review-box comment-box">

                          <p>{productData?.product_review?.length} customer reviews</p>

                          <Swiper
                            modules={[Autoplay, Pagination]}
                            loop={false}
                            spaceBetween={16}
                            breakpoints={{
                              0: {
                                slidesPerView: 1,
                              },
                              768: {
                                slidesPerView: 2,
                              },
                            }}
                            autoplay={
                              reviews.length > 1
                                ? {
                                  delay: 5000,
                                  disableOnInteraction: false,
                                }
                                : false
                            }
                            pagination={{
                              type: "progressbar",
                            }}
                            className="review-swiper review-swiper-progress"
                          >
                            {reviews.map((review) => (
                              <SwiperSlide key={review.id}>
                                <div className="customer-review_wrap review-slide">
                                  {/* Top row: name + date */}
                                  <div className="review-top">
                                    <p className="review-name">
                                      {review.user_name || "Anonymous"}
                                    </p>

                                    <p className="comment-date mb-0">
                                      {review.created_on}
                                    </p>
                                  </div>

                                  {/* Rating */}
                                  <div className="rating p-0 mb-0">
                                    <RatingStar rating={review?.rate} />
                                  </div>

                                  {/* Comment text */}
                                  <p className="customer-text mb-0">
                                    {review.review_comment}
                                  </p>
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>


                          {/* Validation Remaining */}
                          {/* <form className="contact-form mt-4 border-0" id="leave-review">
                          <h4 className="contact-form__title">
                            Rate us and Write a Review
                          </h4>

                          <div className="form-group mb-3 d-flex align-items-center gap-3">
                            <label className="mb-0 d-block fw-medium" style={{ color: "var(--grey-text)" }}>Your Rating:</label>

                            <div
                              className="rating-input d-flex gap-2"
                              onMouseLeave={() => {
                                if (!hasClicked) setHoverRating(0);
                              }}
                            >
                              {[1, 2, 3, 4, 5].map((star) => {
                                const current = hasClicked
                                  ? userRating
                                  : (hoverRating || userRating);

                                return (
                                  <FaStar
                                    key={star}
                                    size={24}
                                    color={star <= current ? "#f1c40f" : "#d0d0d0"}
                                    style={{ cursor: "pointer" }}

                                    // ⭐ CLICK LOGIC (1st star toggle only)
                                    onClick={() => {
                                      if (star === 1) {
                                        // ⭐ ONLY FIRST STAR TOGGLES
                                        setUserRating(userRating === 1 ? 0 : 1);
                                        setHasClicked(userRating !== 1);
                                      } else {
                                        // ⭐ Other stars (2-5) → NO toggle, always set rating
                                        setUserRating(star);
                                        setHasClicked(true);
                                      }
                                    }}

                                    // ⭐ HOVER only before click
                                    onMouseEnter={() => {
                                      if (!hasClicked) setHoverRating(star);
                                    }}
                                  />
                                );
                              })}
                            </div>
                          </div>

                          <div className="row">
                            <textarea
                              className="contact-form__textarea"
                              name="review"
                              id="review_msg"
                              placeholder="Review"
                              value={userReview}
                              onChange={(e) => setUserReview(e.target.value)}
                            />
                            <button
                              className="btn v3"
                              type="button"
                              name="submit-contact"
                              onClick={() => postRating.mutate(userReview)}
                            >Submit</button>
                          </div>
                        </form> */}

                        </div>
                      </div>



                      {/* ====== RECENTLY ADDED ====== */}
                      <h3>Today's Deals</h3>
                      <div className="slider trending-slider" style={{ "--quantity": todaysDeals?.length || 1 }}>


                        <div className="list">
                          {Array.isArray(todaysDeals) && todaysDeals?.length ? todaysDeals?.map((product) => (
                            <div className="item" key={product?.id}>
                              <div className="card property-card d-flex flex-column align-items-center justify-content-between text-center">
                                <div className="entry-img">
                                  <img src={product?.default_image} alt={product?.product_name} />
                                  <span className="badge">{product?.label}</span>
                                </div>

                                <NavLink to={`/product-details/${product?.id}`} className="entry-title m-0 text-decoration-none single-line-ellipsis">{product?.product_name}</NavLink>

                                <div className="price m-0">
                                  {product?.discount_percent > 0 && (
                                    <span className="discount-percent me-2" style={{ marginLeft: 12 }}>
                                      {product?.discount_percent}%
                                    </span>
                                  )}
                                  ₹{product?.sale_price}
                                </div>

                                <div className="rating mb-0">
                                  <span className="rating-value">{product?.avg_rate}</span>

                                  <span className="rating-stars">
                                    <RatingStar rating={product?.total_review === "0" ? 0 : product?.avg_rate} />
                                  </span>

                                  <span className="rating-count">
                                    ({product?.total_review})
                                  </span>
                                </div>

                              </div>
                            </div>
                          )) : "No data found !"}
                        </div>
                      </div>
                      {/* ====== RECENTLY ADDED ====== */}
                    </div>

                  </div>
                </div>
              </div>
              {/*Listing Details Info ends*/}
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
