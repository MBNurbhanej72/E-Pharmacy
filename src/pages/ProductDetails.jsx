import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import dayjs from "dayjs";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Api } from "../services/api";
import { toast } from "react-toastify";
import "../App.css";
import Breadcrumbs from "../components/Breadcrumbs";
import RatingStar from "../components/RatingStar";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";


const ProductDetails = () => {
  const { id: productId } = useParams();

  const navigate = useNavigate();

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


  console.log("🚀 ~ ProductDetails ~ productData:", productData);


  useEffect(() => {
    mutate(productId);
  }, [productId, mutate]);


  const { data: trendingProducts, error: tpError, isPending: tpPending } = useQuery({
    queryKey: ["trendingProducts"],

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
        toast.error(res?.data?.message);
      }
    },

    onError: (err) => {
      toast.error("Something went wrong!" || err?.message + "!");
    }
  });


  const printRef = useRef();

  const handlePrintInvoice = useReactToPrint({ contentRef: printRef });



  const pinCodeRef = useRef();

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [activeTab, setActiveTab] = useState("description");

  const [productQuantity, setProductQuantity] = useState(1);

  const galleryImages = productData?.product_image || [];


  const handleRemoveQuantity = () => setProductQuantity(prevQuantity => prevQuantity === 1 ? prevQuantity : prevQuantity - 1);


  const handleAddQuantity = () => setProductQuantity(prevQuantity => prevQuantity === 30 ? prevQuantity : prevQuantity + 1);



  const formattedDateTime = dayjs(productData?.created_on_orig).format("DD/MM/YYYY hh:mm a");



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
        <div className="page-wrapper">
          <div className="property-details-wrap bg-cb compact-header pb-70">
            {/*Listing Details Info starts*/}
            <div className="single-property-details v1 pt-30">
              <div className="container">

                {/* Breadcrumbs Start */}
                <Breadcrumbs parentPath="products" parentLabel="All Products" currentLabel={productData?.product_name} />
                {/* Breadcrumbs End */}

                <div className="row">
                  {/* ab sirf ek hi column – full width */}
                  <div className="col-xl-12 col-lg-12">
                    <div className="listing-desc-wrap">
                      {/* ====== GALLERY + NAME/PRICE SIDE BY SIDE ====== */}
                      <div id="gallery" className="list-details-section all-div">
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
                              <h4>{productData?.product_name}</h4>
                            </div>

                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <div className="rating p-0 fw-medium">
                                  <span className="rating-value">{productData?.avg_rate}</span>

                                  <span className="rating-stars">
                                    <RatingStar rating={productData?.avg_rate} />
                                  </span>

                                  <span className="rating-count">
                                    {`(${productData?.total_review} ${productData?.total_review > 1 ? "Reviews" : "Review"})`}
                                  </span>
                                </div>

                                <div className="pd-upper-details">
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
                              </div>

                              <div className="text-center">
                                <QRCode value={`https://e-pharmacy-by-mb.vercel.app/product-details/${productData?.id}`} size={100} />
                                <p className="mt-2 mb-0 small text-muted">Scan to view & print invoice</p>
                              </div>

                              {/* <div className="d-none">
                                <ProductInvoice ref={printRef} productData={productData} />
                              </div> */}
                            </div>

                            <hr />

                            <div className="pd-price">
                              <p className="pd-actual-price">
                                <span className="pd-discount">{productData?.discount_percent}% OFF</span>
                                <span className="rupees-symbol">₹</span><span>{productData?.sale_price}</span>
                              </p>

                              <p className="pd-mrp">M.R.P. : <span>₹{productData?.list_price}</span></p>
                            </div>

                            <div className="pd-pin-code gap-3">
                              <span>Pincode / Zipcode :</span>

                              <input type="text" ref={pinCodeRef} />

                              <button onClick={() => postPinCode?.mutate(pinCodeRef?.current?.value)}>Check Delivery</button>

                            </div>

                            {productData?.current_stock > 0 && (
                              <>
                                <div className="pd-quantity" style={{ gap: 85 }}>
                                  <span className="w-auto">Quantity :</span>

                                  <div className="d-flex align-items-center justify-content-center gap-2">
                                    <button onClick={handleRemoveQuantity}><FaMinus size={12} /></button>

                                    <input type="text" value={productQuantity} disabled />

                                    <button onClick={handleAddQuantity}><FaPlus size={12} /></button>
                                  </div>
                                </div>

                                <div className="pd-buy-btn mt-30">
                                  <button>Buy now</button>
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

                        {/* ========= REVIEWS SECTION – TABS KE NEECH ========= */}
                        <div
                          id="reviews"
                          className="list-details-section all-div"
                        >
                          <h4>
                            Reviews <span>(2)</span>
                          </h4>
                          <div className="review-box comment-box">
                            <ul className="review_wrap">
                              <li>
                                <div className="customer-review_wrap">
                                  <div className="reviewer-img">
                                    <img
                                      src="images/others/client_1.jpg"
                                      className="img-fluid"
                                      alt="..."
                                    />
                                    <p>Stacy G.</p>
                                  </div>
                                  <div className="customer-content-wrap">
                                    <div className="customer-content">
                                      <div className="customer-review">
                                        <h6>Lorem ipsum dolor.</h6>
                                        <p className="comment-date">
                                          Jun 13, 2019
                                        </p>
                                        <ul className="product-rating">
                                          <li>
                                            <i className="fas fa-star" />
                                          </li>
                                          <li>
                                            <i className="fas fa-star" />
                                          </li>
                                          <li>
                                            <i className="fas fa-star" />
                                          </li>
                                          <li>
                                            <i className="fas fa-star-half-alt" />
                                          </li>
                                          <li>
                                            <i className="fas fa-star-half-alt" />
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <p className="customer-text">
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipisicing elit. Accusantium voluptates eum,
                                      velit recusandae, ducimus earum aperiam
                                      commodi error officia optio aut et quae nam
                                      nostrum!
                                    </p>
                                    <div className="like-btn">
                                      <a
                                        href="#"
                                        className="rate-review float-right"
                                      >
                                        <i className="fas fa-reply" />
                                        Reply
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <ul className="review_wrap has-child">
                                  <li>
                                    <div className="customer-review_wrap">
                                      <div className="reviewer-img">
                                        <img
                                          src="images/others/client_2.jpg"
                                          className="img-fluid"
                                          alt="..."
                                        />
                                        <p>Tony S.</p>
                                      </div>
                                      <div className="customer-content-wrap">
                                        <div className="customer-content">
                                          <div className="customer-review">
                                            <h6>Lorem ipsum dolor sit.</h6>
                                            <p className="comment-date">
                                              Jun 14, 2019
                                            </p>
                                          </div>
                                        </div>
                                        <p className="customer-text">
                                          Lorem ipsum dolor sit amet, consectetur
                                          adipisicing elit. Tempore quod, nihil
                                          consectetur sit natus eum similique quae
                                          omnis doloribus culpa!
                                        </p>
                                        <div className="like-btn">
                                          <a
                                            href="#"
                                            className="rate-review float-right"
                                          >
                                            <i className="fas fa-reply" />
                                            Reply
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <div className="customer-review_wrap">
                                  <div className="reviewer-img">
                                    <img
                                      src="images/others/client_4.jpg"
                                      className="img-fluid"
                                      alt="..."
                                    />
                                    <p>Louis F.</p>
                                  </div>
                                  <div className="customer-content-wrap">
                                    <div className="customer-content">
                                      <div className="customer-review">
                                        <h6>Lorem ipsum dolor.</h6>
                                        <p className="comment-date">
                                          Mar 02, 2019
                                        </p>
                                        <ul className="product-rating">
                                          <li>
                                            <i className="fas fa-star" />
                                          </li>
                                          <li>
                                            <i className="fas fa-star" />
                                          </li>
                                          <li>
                                            <i className="fas fa-star" />
                                          </li>
                                          <li>
                                            <i className="fas fa-star-half-alt" />
                                          </li>
                                          <li>
                                            <i className="fas fa-star-half-alt" />
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <p className="customer-text">
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipisicing elit. Accusantium voluptates eum,
                                      velit recusandae, ducimus earum aperiam
                                      commodi error officia optio aut et quae nam
                                      nostrum!
                                    </p>
                                    <div className="like-btn">
                                      <a
                                        href="#"
                                        className="rate-review float-right"
                                      >
                                        <i className="fas fa-reply" />
                                        Reply
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>

                            <form className="contact-form" id="leave-review">
                              <h4 className="contact-form__title">
                                Rate us and Write a Review
                              </h4>
                              <div className="row">
                                <div className="col-md-6 col-sm-7 col-12">
                                  <p className="contact-form__rate">
                                    Your rating for this listing:
                                  </p>
                                  <p className="contact-form__rate-bx">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                  </p>
                                  <p className="contact-form__rate-bx-show">
                                    <span className="rate-actual">0</span> / 5
                                  </p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <input
                                    className="contact-form__input-text"
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name:"
                                  />
                                </div>
                                <div className="col-md-6">
                                  <input
                                    className="contact-form__input-text"
                                    type="text"
                                    name="mail"
                                    id="mail"
                                    placeholder="Email:"
                                  />
                                </div>
                              </div>
                              <textarea
                                className="contact-form__textarea"
                                name="comment"
                                id="comment_msg"
                                placeholder="Comment"
                                defaultValue={""}
                              />
                              <input
                                className="btn v3"
                                type="submit"
                                name="submit-contact"
                                defaultValue="Submit"
                              />
                            </form>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDEBAR COMPLETELY HATA DIYA, kyunki Recently Added neeche shift ho gaya */}
                </div>

                {/* ====== RECENTLY ADDED ====== */}
                <div className="slider trending-slider mb-30" style={{ "--quantity": trendingProducts?.length || 1 }}>
                  <div className="list">
                    {trendingProducts?.map((product) => (
                      <div className="item" key={product?.id}>
                        <div className="card property-card d-flex flex-column align-items-center justify-content-between text-center">
                          <div className="entry-img">
                            <img src={product?.default_image} alt={product?.product_name} />
                            <span className="badge">{product?.label}</span>
                          </div>

                          <h4 className="entry-title m-0">{product?.product_name}</h4>

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
                              <RatingStar rating={product?.avg_rate} />
                            </span>

                            <span className="rating-count">
                              ({product?.total_review})
                            </span>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ====== RECENTLY ADDED ====== */}

              </div>
            </div>
            {/*Listing Details Info ends*/}
          </div>

        </div>
      )}
    </>
  );
};

export default ProductDetails;
