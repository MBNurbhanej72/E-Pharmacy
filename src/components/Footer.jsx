import { useQuery } from "@tanstack/react-query";
import "../App.css";
import logo from "/images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { MdCall, MdLocationPin } from "react-icons/md";
import { IoIosMail, IoMdPaperPlane } from "react-icons/io";
import { BsShieldLock } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { Api } from "../services/api";

const Footer = () => {

  const { data: blogs, error, isPending } = useQuery({
    queryKey: ["blogs"],

    queryFn: async () =>
      await Api
        .get(
          "common_request_api/get_blog_listing"
        )
        .then((res) => res.data.data),

    staleTime: 24 * 60 * 60 * 1000, // 1 Day
  });



  if (error) return <h1>{error.message}</h1>;



  return (
    <>
      <div className="infoblocks_container py-4 ps-3 ps-md-0">
        <ul className="infoblocks_wrap align-items-start align-items-md-center gap-5 gap-md-auto">
          <li>
            <p className="infoblock type_1 m-0">
              <IoMdPaperPlane size={35} color="#018bc8" style={{ marginRight: 10 }} />
              <span className="caption">
                <b>Fast &amp; Free Delivery</b>
              </span>
            </p>
          </li>
          <li>
            <p className="infoblock type_1 m-0">
              <BsShieldLock size={30} color="#018bc8" style={{ marginRight: 10 }} />
              <span className="caption">
                <b>Safe &amp; Secure Payment</b>
              </span>
            </p>
          </li>
          <li>
            <p className="infoblock type_1 m-0">
              <GiMoneyStack size={35} color="#018bc8" style={{ marginRight: 10 }} />
              <span className="caption">
                <b>100% Money back Guaranted</b>
              </span>
            </p>
          </li>
        </ul>
      </div>

      <div className="footer_section text-left">
        <div className="container m-0 m-md-auto">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-0 mb-md-5 mb-lg-0">
              <section className="widget">
                <div
                  style={{
                    display: "inline-block",
                    maxWidth: "100%",
                    overflow: "hidden",
                    position: "relative",
                    boxSizing: "border-box",
                    margin: 0
                  }}
                >
                  <div
                    style={{
                      boxSizing: "border-box",
                      display: "block",
                      maxWidth: "100%"
                    }}
                  >
                    <Link to="/">
                      <img
                        alt=""
                        aria-hidden="true"
                        src={logo}
                        style={{
                          maxWidth: "100%",
                          display: "block",
                          margin: 0,
                          border: "none",
                          padding: 0
                        }}
                      />
                    </Link>
                  </div>
                </div>
                <ul className="c_info_list">
                  <br />
                  <li className="p-0"><MdLocationPin size={20} color="#018bc8" /> Gujarat, 383001 India</li>
                  <li className="c_info_phone p-0">
                    <a href="tel:+91 1234567890"><MdCall size={20} color="#018bc8" /> +91 1234567890</a>
                  </li>
                  <li className="c_info_mail p-0">
                    <a href="mailto:info@emaadinfotech.com ">
                      <IoIosMail size={20} color="#018bc8" /> info@emaadinfotech.com{" "}
                    </a>
                  </li>
                </ul>
              </section>
            </div>
            <div className="col-lg-2 col-md-6 mb-0 mb-md-5 mb-lg-0">
              <section className="widget">
                <h4>Information</h4>
                <ul className="list_of_links">
                  <li>
                    <a href="/cms/about-us">About Us</a>
                  </li>
                  <li>
                    <a href="/cms/faq-page">FAQ page</a>
                  </li>
                  <li>
                    <a href="/cms/privacy-policy">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/cms/disclaimer">Disclaimer</a>
                  </li>
                  <li>
                    <a href="/cms/terms-and-condition">Terms and Condition</a>
                  </li>
                  <li>
                    <a href="/cms/refund-policy">Refund Policy</a>
                  </li>
                </ul>
              </section>
            </div>
            <div className="col-lg-2 col-md-6">
              <section className="widget">
                <h4>My Account</h4>
                <ul className="list_of_links">
                  <li>
                    <a href="/myaccount/dashboard">My Account</a>
                  </li>
                  <li>
                    <a href="/myaccount/myorders">Order History</a>
                  </li>
                  <li>
                    <a href="/myaccount/refill">Refill</a>
                  </li>
                  <li>
                    <a href="/myaccount/wishlist">Wish List</a>
                  </li>
                </ul>
              </section>
            </div>
            <div className="col-lg-3 col-md-6">
              <section className="widget">
                <h4>Latest News</h4>
                <ul className="list_of_entries">
                  {isPending ? (
                    <span className="loader footer-loader"></span>
                  ) : Array.isArray(blogs) && blogs?.length ? blogs?.slice(0, 3)?.map(e => (
                    <li key={e.id}>
                      <article className="entry">
                        <NavLink
                          className="entry_thumb"
                          to="/blog-details/"
                        >
                          <div
                            style={{
                              display: "inline-block",
                              maxWidth: "100%",
                              overflow: "hidden",
                              position: "relative",
                              boxSizing: "border-box",
                              margin: 0
                            }}
                          >
                            <div
                              style={{
                                boxSizing: "border-box",
                                display: "block",
                                maxWidth: "100%"
                              }}
                            >
                              <img
                                alt="Blog Image"
                                aria-hidden="true"
                                src={e.main_image}
                                style={{
                                  maxWidth: "100%",
                                  display: "block",
                                  margin: 0,
                                  border: "none",
                                  padding: 0
                                }}
                              />
                            </div>
                          </div>
                        </NavLink>
                        <div className="wrapper">
                          <h6 className="entry_title">
                            <NavLink to="/blog-details/">{e.title}</NavLink>
                          </h6>
                          <div className="entry_meta">
                            <span>
                              <i className="icon-calendar" />
                              {e.created_on}
                            </span>
                          </div>
                        </div>
                      </article>
                    </li>
                  )) : "No Data Found!"}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="footer_section_3 align_center">
        <div className="container">
          <p className="copyright">© All rights reserved. Made by MB Nurbhanej</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
