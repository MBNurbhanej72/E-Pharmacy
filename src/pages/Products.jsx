import { useInfiniteQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import Breadcrumbs from "../components/Breadcrumbs";
import { Api } from "../services/api";
import { useEffect } from "react";
import "../App.css";

const Products = () => {

  const fetchProducts = async ({ pageParam = 1 }) => {

    // const formData = new FormData();

    // formData.append("user_agent", "EI-AAPP");
    // formData.append("page_number", pageParam);
    // formData.append("limit_per_page", 10);

    const formData = {
      user_agent: "EI-AAPP",
      page_number: pageParam,
      limit_per_page: 12
    };

    const res = await Api.post("/product_api/search_product", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return res.data.data;
  };



  const { data: product, isPending, error, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["products"],

    queryFn: fetchProducts,

    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.length < 12 ? undefined : allPages?.length + 1;
    },

    staleTime: 24 * 60 * 60 * 1000, // 1 Day
  });



  //? For Auto Fetching Using Scroll //
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1500) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      };
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);



  return (
    <>
      {/*Listing filter starts*/}
      <div className="filter-wrapper style1 section-padding mb-20">
        <div className="container">

          {/* Breadcrumbs Start */}
          <Breadcrumbs parentLabel="All Products" />
          {/* Breadcrumbs End */}

          <div className="row">
            {/*Listing filter starts*/}
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <form className="hero__form v1 filter listing-filter property-filter">
                    <div className="row">
                      <div className="col-xl-5 col-lg-6 col-md-6 col-sm-12 col-12 py-3 pl-30 pr-0">
                        <div className="input-search">
                          <input
                            type="text"
                            name="place-event"
                            id="place-event"
                            placeholder="Enter Property, Location, Landmark ..."
                          />
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-6 col-md-6 col-sm-12 col-12 py-3 pl-30 pr-0">
                        <select className="hero__form-input  custom-select">
                          <option>Select Area</option>
                          <option>New York</option>
                          <option>California</option>
                          <option>Washington</option>
                          <option>New Jersey</option>
                          <option>Los angeles</option>
                          <option>Florida</option>
                        </select>
                      </div>
                      <div className="col-xl-2 col-lg-6 col-md-6 col-sm-12 col-12 py-3 pl-30 pr-0">
                        <select className="hero__form-input  custom-select">
                          <option>Select City</option>
                          <option>New York</option>
                          <option>California</option>
                          <option>Washington</option>
                          <option>New Jersey</option>
                          <option>Los angeles</option>
                          <option>Florida</option>
                        </select>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 py-3 pl-30 pr-0">
                        <div className="submit_btn">
                          <button className="btn v3" type="submit">
                            Search
                          </button>
                        </div>
                        <div className="dropdown-filter">
                          <span>More Filters</span>
                        </div>
                      </div>
                      <div className="explore__form-checkbox-list full-filter">
                        <div className="row">
                          <div className="col-lg-4 col-md-6 py-1 pr-30">
                            <select className="hero__form-input  custom-select mb-20">
                              <option>Property Status</option>
                              <option>Any</option>
                              <option>For Rent</option>
                              <option>For Sale</option>
                            </select>
                          </div>
                          <div className="col-lg-4 col-md-6 py-1 pr-30 pl-0 ">
                            <select className="hero__form-input  custom-select  mb-20">
                              <option>Property Type</option>
                              <option>Residential</option>
                              <option>Commercial</option>
                              <option>Land</option>
                            </select>
                          </div>
                          <div className="col-lg-4 col-md-6 py-1 pl-0">
                            <select className="hero__form-input  custom-select  mb-20">
                              <option>Max rooms</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                              <option>7</option>
                            </select>
                          </div>
                          <div className="col-lg-4 col-md-6 py-1 pr-30 ">
                            <select className="hero__form-input  custom-select  mb-20">
                              <option>Bed</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                            </select>
                          </div>
                          <div className="col-lg-4 col-md-6 py-1 pr-30 pl-0">
                            <select className="hero__form-input  custom-select  mb-20">
                              <option>Bath</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                            </select>
                          </div>
                          <div className="col-lg-4 col-md-6 py-1 pl-0">
                            <select className="hero__form-input  custom-select  mb-20">
                              <option>Agents</option>
                              <option>Bob Haris</option>
                              <option>Ross buttler</option>
                              <option>Andrew Saimons</option>
                              <option>Steve Austin</option>
                            </select>
                          </div>
                          <div className="col-lg-4 col-md-6 py-1 pr-30">
                            <select className="hero__form-input  custom-select  mb-20">
                              <option>Agencies</option>
                              <option>Onyx Equities</option>
                              <option>OVG Real Estate</option>
                              <option>Oxford Properties*</option>
                              <option>Cortland</option>
                            </select>
                          </div>
                          <div className="col-lg-4 col-md-6 py-1 pr-30 pl-0">
                            <div className="filter-sub-area style1">
                              <div className="filter-title mb-10">
                                <p>
                                  Price :{" "}
                                  <span>
                                    <input type="text" id="amount_two" />
                                  </span>
                                </p>
                              </div>
                              <div
                                id="slider-range_two"
                                className="price-range mb-30"
                              ></div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 py-1  pl-0">
                            <div className="filter-sub-area style1">
                              <div className="filter-title  mb-10">
                                <p>
                                  Area :{" "}
                                  <span>
                                    <input type="text" id="amount_one" />
                                  </span>
                                </p>
                              </div>
                              <div
                                id="slider-range_one"
                                className="price-range mb-30"
                              ></div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 py-1 pr-30">
                            <div className="filter-checkbox">
                              <p>Sort By Features</p>
                              <ul>
                                <li>
                                  <input
                                    id="check-a"
                                    type="checkbox"
                                    name="check"
                                  />
                                  <label htmlFor="check-a">Air Condition</label>
                                </li>
                                <li>
                                  <input
                                    id="check-b"
                                    type="checkbox"
                                    name="check"
                                  />
                                  <label htmlFor="check-b">Swimming Pool</label>
                                </li>
                                <li>
                                  <input
                                    id="check-c"
                                    type="checkbox"
                                    name="check"
                                  />
                                  <label htmlFor="check-c">Laundry Room</label>
                                </li>
                                <li>
                                  <input
                                    id="check-d"
                                    type="checkbox"
                                    name="check"
                                  />
                                  <label htmlFor="check-d">Free Wifi</label>
                                </li>
                                <li>
                                  <input
                                    id="check-e"
                                    type="checkbox"
                                    name="check"
                                  />
                                  <label htmlFor="check-e">Window Covering</label>
                                </li>
                                <li>
                                  <input
                                    id="check-f"
                                    type="checkbox"
                                    name="check"
                                  />
                                  <label htmlFor="check-f">Central Heating </label>
                                </li>
                                <li>
                                  <input
                                    id="check-g"
                                    type="checkbox"
                                    name="check"
                                  />
                                  <label htmlFor="check-g">24 hour security</label>
                                </li>
                                <li>
                                  <input
                                    id="check-h"
                                    type="checkbox"
                                    name="check"
                                  />
                                  <label htmlFor="check-h">Lawn</label>
                                </li>
                                <li>
                                  <input
                                    id="check-i"
                                    type="checkbox"
                                    name="check"
                                  />
                                  <label htmlFor="check-i">Gym</label>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 py-1 pr-30 pl-0 ">
                            <div className="filter-checkbox">
                              <p>Sort By Ratings</p>
                              <div>
                                <input id="check-w" type="checkbox" name="check" />
                                <label htmlFor="check-w"></label>
                                <div className="list-ratings">
                                  <span className="fas fa-star" />
                                  <span className="fas fa-star" />
                                  <span className="fas fa-star" />
                                  <span className="fas fa-star" />
                                  <span className="fas fa-star" />
                                </div>
                              </div>
                              <div>
                                <input id="check-x" type="checkbox" name="check" />
                                <label htmlFor="check-x"></label>
                                <div className="list-ratings">
                                  <span className="fas fa-star" />
                                  <span className="fas fa-star" />
                                  <span className="fas fa-star" />
                                  <span className="fas fa-star" />
                                  <span className="fas fa-star-half-alt" />
                                </div>
                              </div>
                              <div>
                                <input id="check-y" type="checkbox" name="check" />
                                <label htmlFor="check-y"></label>
                                <div className="list-ratings">
                                  <span className="fas fa-star" />
                                  <span className="fas fa-star" />
                                  <span className="fas fa-star" />
                                  <span className="fas fa-star-half-alt" />
                                  <span className="fas fa-star-half-alt" />
                                </div>
                              </div>
                              <div>
                                <input id="check-z" type="checkbox" name="check" />
                                <label htmlFor="check-z"></label>
                                <div className="list-ratings">
                                  <span className="fas fa-star" />
                                  <span className="fas fa-star" />
                                  <span className="fas fa-star-half-alt" />
                                  <span className="fas fa-star-half-alt" />
                                  <span className="fas fa-star-half-alt" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/*Listing filter ends*/}
            <div className="col-md-12">
              <div className="row pt-60   align-items-center">
                <div className="col-lg-3 col-sm-5 col-5">
                  <div className="item-view-mode res-box">
                    {/* item-filter-list Menu starts */}
                    <ul className="nav item-filter-list" role="tablist">
                      <li>
                        <a className="active" data-toggle="tab" href="#grid-view">
                          <i className="fas fa-th" />
                        </a>
                      </li>
                      <li>
                        <a data-toggle="tab" href="#list-view">
                          <i className="fas fa-list" />
                        </a>
                      </li>
                    </ul>
                    {/* item-filter-list Menu ends */}
                  </div>
                </div>
                <div className="col-lg-4 col-sm-7 col-7">
                  <div
                    className="nice-select hero__form-input custom-select filter-sorting"
                    tabIndex={0}
                  >
                    <span className="current">Sort by Newest</span>
                    <ul className="list">
                      <li className="option focus">Sort by Newest</li>
                      <li className="option focus">Sort by Oldest</li>
                      <li className="option focus">Sort by Featured</li>
                      <li className="option focus">Sort by Price(Low to High)</li>
                      <li className="option focus">Sort by Price(Low to High)</li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-5 col-sm-12">
                  <div className="item-element res-box  text-right sm-left">
                    <p>
                      Showing <span>1-15 of 69</span> Listings
                    </p>
                  </div>
                </div>
              </div>
              <div className="item-wrapper pt-40">
                {isPending ? <div className="loader-main"><span className="loader" /></div> :
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane show active fade property-grid"
                      id="grid-view"
                    >
                      <div className="row">
                        {Array.isArray(product?.pages) && product?.pages?.length ? product?.pages?.flat(Infinity)?.map(e => (
                          <ProductCard key={e.id} data={e} />
                        )) : (
                          <div className="container my-5">
                            <h1>{error.message}</h1>

                            <button className="btn btn-outline-secondary mt-5" onClick={refetch}>Refetch Data</button>
                          </div>
                        )}

                        {isFetchingNextPage && (
                          <div className="w-100 position-relative d-flex justify-content-center">
                            <span className="loader"></span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Listing filter ends*/}
    </>
  );
};

export default Products;