import { useQuery } from "@tanstack/react-query";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import Breadcrumbs from "../components/Breadcrumbs";
import { Api } from "../services/api";

const Blogs = () => {

  const navigate = useNavigate();


  const { data: blogs, isPending, error, refetch } = useQuery({
    queryKey: ["blogs"],

    queryFn: async () => await Api.get("common_request_api/get_blog_listing").then((res) => res.data.data),

    staleTime: 24 * 60 * 60 * 1000, // 1 Day
  });



  return (
    <>
      <div className="page-wrapper">
        {/*Blog post starts*/}
        <div className="blog-area section-padding pb-40">
          <div className="container">

            {/* Breadcrumbs Start */}
            <Breadcrumbs parentLabel="All Blogs" />
            {/* Breadcrumbs End */}

            <div className="row mb-3">
              <div className="col-md-12 d-flex justify-content-end blog-top-info">
                <span>Showing 1 to {Array.isArray(blogs) ? blogs.length : 0}</span>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                {isPending ? <div className="loader-main"><span className="loader" /></div> : Array.isArray(blogs) && blogs?.length ? (
                  blogs.map((e) => (
                    <div className="single-blog-item v3 mb-4" key={e.id}>
                      <div className="row align-items-center">
                        {/* IMAGE LEFT */}
                        <div className="col-md-4">
                          <div className="blog-thumb">
                            <img
                              className="img-fluid allBlog-img"
                              src={e.main_image}
                              alt={e.title}
                              onClick={() => navigate("/blog-details", { state: e })}
                            />
                          </div>
                        </div>

                        {/* CONTENT RIGHT */}
                        <div className="col-md-8">
                          <div className="blog-content-wrapper">
                            <div className="blog-meta">
                              <span className="blog-date d-flex gap-2 align-items-center">
                                <FaRegCalendarAlt /> {e.created_on}
                              </span>
                            </div>

                            <h4 className="blog-title" onClick={() => navigate("/blog-details", { state: e })} style={{ cursor: "pointer" }}>
                              {e.title}
                            </h4>

                            <p className="blog-excerpt" dangerouslySetInnerHTML={{ __html: `${e.content.substring(0, 400)}...` }} />

                            <button onClick={() => navigate("/blog-details", { state: e })} className="read-btn blog-read-more text-decoration-none">
                              Read More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="container my-5">
                    <h1>{error.message}</h1>

                    <button className="btn btn-outline-secondary mt-5" onClick={refetch}>Refetch Data</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/*Blog post ends*/}
      </div>
      {/*Page Wrapper ends*/}
    </>
  );
};

export default Blogs;
