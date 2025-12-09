import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { useMutation } from "@tanstack/react-query";
import { Api } from "../services/api";
import { toast } from "react-toastify";
import "../App.css";
import Breadcrumbs from "../components/Breadcrumbs";

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
      toast.error(err.message);
    },
  });
  console.log("🚀 ~ ProductDetails ~ productData:", productData);

  useEffect(() => {
    mutate(productId);
  }, [productId, mutate]);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  const galleryImages = productData?.product_image || [];

  if (error) return <h1>{error.message}</h1>;

  return (
    <>
      {isPending ? (
        <div className="loader-main">
          <span className="loader" />
        </div>
      ) : (
        <div className="page-wrapper">
          <div className="property-details-wrap bg-cb pb-3 compact-header">
            {/*Listing Details Info starts*/}
            <div className="single-property-details v1 pt-30">
              <div className="container">

                {/* Breadcrumbs Start */}
                <Breadcrumbs navigate="products" page2="All Products" page3={productData?.product_name} />
                {/* Breadcrumbs End */}

                <div className="row">
                  {/* ab sirf ek hi column – full width */}
                  <div className="col-xl-12 col-lg-12">
                    <div className="listing-desc-wrap">
                      {/* ====== GALLERY + NAME/PRICE SIDE BY SIDE ====== */}
                      <div id="gallery" className="list-details-section all-div">
                        <div className="row">
                          {/* LEFT: slider (thoda chhota, 7/12 width) */}
                          <div className="col-lg-5 col-md-12">
                            <div className="list-gallery pt-2 position-relative">
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
                            <div className="single-listing-title">
                              <h2>
                                Luxury villa in hinterland{" "}
                                <span className="btn v5">For Sale</span>
                              </h2>
                              <p>
                                <i className="fa fa-map-marker-alt" /> 42 Albemarle
                                st. Hinterland, Florida
                              </p>
                              <a href="#" className="property-author">
                                <img
                                  src="images/agents/agent_min_1.jpg"
                                  alt="..."
                                />
                                <span>Tony Stark</span>
                              </a>

                              <div className="list-details-btn mt-4">
                                <div className="trend-open">
                                  <p>
                                    <span className="per_sale">starts from</span>
                                    $85000
                                  </p>
                                </div>
                                <div className="list-ratings">
                                  <span className="fas fa-star" />
                                  <span className="fas fa-star" />
                                  <span className="fas fa-star" />
                                  <span className="fas fa-star" />
                                  <span className="fas fa-star-half-alt" />
                                </div>
                                <ul className="list-btn">
                                  <li className="share-btn">
                                    <a
                                      href="#"
                                      className="btn v2"
                                      data-toggle="tooltip"
                                      title="Share"
                                    >
                                      <i className="fas fa-share-alt" />
                                    </a>
                                    <ul className="social-share">
                                      <li className="bg-fb">
                                        <a href="#">
                                          <i className="fab fa-facebook-f" />
                                        </a>
                                      </li>
                                      <li className="bg-tt">
                                        <a href="#">
                                          <i className="fab fa-twitter" />
                                        </a>
                                      </li>
                                      <li className="bg-ig">
                                        <a href="#">
                                          <i className="fab fa-instagram" />
                                        </a>
                                      </li>
                                    </ul>
                                  </li>
                                  <li className="save-btn">
                                    <a
                                      href="#"
                                      className="btn v2"
                                      data-toggle="tooltip"
                                      title="Save"
                                    >
                                      <i className="fa fa-heart" />
                                    </a>
                                  </li>
                                  <li className="print-btn">
                                    <a
                                      href="#"
                                      className="btn v2"
                                      data-toggle="tooltip"
                                      title="Print"
                                    >
                                      <i className="lnr lnr-printer" />
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
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
                          <div className="pd-tab-content">
                            {/* DESCRIPTION TAB */}
                            {activeTab === "description" && (
                              <div
                                id="description"
                                className="list-details-section mb-0"
                              >
                                <h4>Property Brief</h4>
                                <div className="overview-content">
                                  <p className="mb-10">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Soluta consectetur et porro
                                    voluptatem maiores quidem inventore harum
                                    explicabo deserunt fuga minima sed, sit nemo
                                    expedita. Dolor aliquid rerum recusandae
                                    excepturi.
                                  </p>
                                  <p className="mb-10">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Esse, dicta, impedit. Eveniet
                                    incidunt provident minima totam aut facilis
                                    tenetur quam officia omnis dolorem! Autem iste
                                    fugit mollitia rerum quae, veritatis
                                    perferendis voluptas magni aliquam
                                    consequuntur, minima repellendus eveniet
                                    laboriosam iure.
                                  </p>
                                </div>
                                <div className="mt-40">
                                  <h4 className="list-subtitle">Location</h4>
                                  <a
                                    target="_blank"
                                    href="http://maps.google.com/?q=4936%20N%20Broadway%20St,%20Chicago,%20IL%2060640,%20USA"
                                    className="location-map"
                                  >
                                    View Map
                                    <i className="fa fa-map-marker-alt" />
                                  </a>
                                  <ul className="listing-address">
                                    <li>
                                      Address : <span>42 Albemarle st.</span>
                                    </li>
                                    <li>
                                      State/county : <span>New York</span>
                                    </li>
                                    <li>
                                      Neighborhood : <span>Andersonville</span>
                                    </li>
                                    <li>
                                      Zip/Postal Code : <span>4203</span>
                                    </li>
                                    <li>
                                      Country : <span>United States</span>
                                    </li>
                                    <li>
                                      City : <span>Chicago</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            )}

                            {/* SPECIFICATIONS TAB */}
                            {activeTab === "specs" && (
                              <div
                                id="details"
                                className="list-details-section mb-0"
                              >
                                <div className="mb-40">
                                  <h4>Property Details</h4>
                                  <ul className="property-info">
                                    <li>
                                      Property ID : <span>ZOAC25</span>
                                    </li>
                                    <li>
                                      Property Type : <span>Apartment</span>
                                    </li>
                                    <li>
                                      Property status : <span>For rent</span>
                                    </li>
                                    <li>
                                      Property Price : <span>$5300/month</span>
                                    </li>
                                    <li>
                                      Rooms : <span>6</span>
                                    </li>
                                    <li>
                                      Bedrooms: <span>4</span>
                                    </li>
                                    <li>
                                      Bath: <span>3</span>
                                    </li>
                                    <li>
                                      Garages: <span>1</span>
                                    </li>
                                    <li>
                                      Year Built: <span>26.3.2019</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="mb-40">
                                  <h4>Amenities</h4>
                                  <ul className="listing-features">
                                    <li>
                                      <i className="fas fa-basketball-ball" />{" "}
                                      basketball court
                                    </li>
                                    <li>
                                      <i className="fas fa-smoking-ban" /> No
                                      Smoking zone
                                    </li>
                                    <li>
                                      <i className="fas fa-car-side" /> Free Parking
                                      on premises
                                    </li>
                                    <li>
                                      <i className="fas fa-fan" /> Air Conditioned
                                    </li>
                                    <li>
                                      <i className="fas fa-dumbbell" /> Gym
                                    </li>
                                    <li>
                                      <i className="fab fa-accessible-icon" />{" "}
                                      Wheelchair Friendly
                                    </li>
                                    <li>
                                      <i className="fas fa-swimmer" /> Swimming
                                      Pool{" "}
                                    </li>
                                    <li>
                                      <i className="fas fa-paw" /> Pet Friendly{" "}
                                    </li>
                                    <li>
                                      <i className="fas fa-dumpster" /> washer and
                                      dryer{" "}
                                    </li>
                                    <li>
                                      <i className="fas fa-tv" /> Home Theater
                                    </li>
                                  </ul>
                                </div>
                                <div>
                                  <h4>Property Documents</h4>
                                  <ul className="listing-features pp_docs">
                                    <li>
                                      <a
                                        target="_blank"
                                        href="images/property-file/demo.docx"
                                      >
                                        <i className="lnr lnr-file-empty" />
                                        Sample Property Document{" "}
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* ========= REVIEWS SECTION – TABS KE NEECH ========= */}
                        <div
                          id="reviews"
                          className="list-details-section all-div mt-40"
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

                {/* ====== RECENTLY ADDED – REVIEW FORM KE NICHE ====== */}
                <div className="widget all-div mt-4">
                  <h3 className="widget-title">Recently Added</h3>
                  <li className="row recent-list">
                    <div className="col-lg-5 col-4">
                      <div className="entry-img">
                        <img src="images/property/property_2.jpg" alt="..." />
                        <span>For Rent</span>
                      </div>
                    </div>
                    <div className="col-lg-7 col-8 no-pad-left">
                      <div className="entry-text">
                        <h4 className="entry-title">
                          <a href="single-news-one.html">Sea View Villa</a>
                        </h4>
                        <div className="property-location">
                          <i className="fa fa-map-marker-alt" />
                          <p>1797 Hillcrest Lane, Irvine, CA</p>
                        </div>
                        <div className="trend-open">
                          <p>
                            $7500<span className="per_month">month</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="row recent-list">
                    <div className="col-lg-5 col-4">
                      <div className="entry-img">
                        <img src="images/property/property_3.jpg" alt="..." />
                        <span>For Sale</span>
                      </div>
                    </div>
                    <div className="col-lg-7 col-8 no-pad-left">
                      <div className="entry-text">
                        <h4 className="entry-title">
                          <a href="single-news-one.html">Apartment on Glasgow</a>
                        </h4>
                        <div className="property-location">
                          <i className="fa fa-map-marker-alt" />
                          <p>60 High St, Glasgow, London</p>
                        </div>
                        <div className="trend-open">
                          <p>
                            <span className="per_sale">starts from</span>$10000
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="row recent-list">
                    <div className="col-lg-5 col-4">
                      <div className="entry-img">
                        <img src="images/property/property_6.jpg" alt="..." />
                        <span>For Rent</span>
                      </div>
                    </div>
                    <div className="col-lg-7 col-8 no-pad-left">
                      <div className="entry-text">
                        <h4 className="entry-title">
                          <a href="single-news-one.html">
                            Family house in Florance.
                          </a>
                        </h4>
                        <div className="property-location">
                          <i className="fa fa-map-marker-alt" />
                          <p>4210 Kha St,Florence,USA</p>
                        </div>
                        <div className="trend-open">
                          <p>
                            $4500<span className="per_month">month</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </div>
                {/* ====== /RECENTLY ADDED ====== */}
              </div>
            </div>
            {/*Listing Details Info ends*/}
          </div>

          {/*Agent Chat box starts*/}
          <div className="chatbox-wrapper">
            <div
              className="chat-popup chat-bounce"
              data-toggle="tooltip"
              title="Have any query? Ask Me !"
              data-placement="top"
            >
              <i className="fas fa-comment-alt" />
            </div>
            <div className="agent-chat-form v1">
              <div className="container">
                <div className="row">
                  <div className="col-4">
                    <img
                      className="agency-chat-img"
                      src="images/agents/agent_min_1.jpg"
                      alt="..."
                    />
                  </div>
                  <div className="col-8 pl-0">
                    <ul className="agent-chat-info">
                      <li>
                        <i className="fas fa-user" />
                        Tony Stark
                      </li>
                      <li>
                        <i className="fas fa-phone-alt" />
                        +440 3456 345
                      </li>
                      <li>
                        <a href="single-agent.html">View Listings</a>
                      </li>
                    </ul>
                    <span className="chat-close">
                      <i className="lnr lnr-cross" />
                    </span>
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col-md-12">
                    <form action="#" method="POST">
                      <div className="chat-group mt-1">
                        <input
                          className="chat-field"
                          type="text"
                          name="chat-name"
                          id="chat-name"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="chat-group mt-1">
                        <input
                          className="chat-field"
                          type="text"
                          name="chat-phone"
                          id="chat-phone"
                          placeholder="Phone"
                        />
                      </div>
                      <div className="chat-group mt-1">
                        <input
                          className="chat-field"
                          type="text"
                          name="chat-email"
                          id="chat-email"
                          placeholder="Email"
                        />
                      </div>
                      <div className="chat-group mt-1">
                        <textarea
                          className="form-control chat-msg"
                          name="message"
                          rows={4}
                          placeholder="Description"
                          defaultValue={
                            "Hello, I am interested in [Luxury apartment bay view]"
                          }
                        />
                      </div>
                      <div className="chat-button mt-3">
                        <a
                          className="chat-btn"
                          data-toggle="modal"
                          data-target="#mortgage_result"
                        >
                          Send Message
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Agent Chat box ends*/}


        </div>
      )}
    </>
  );
};

export default ProductDetails;
