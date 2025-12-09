import { FaRegCalendarAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

const BlogDetails = () => {

  const { state: blog } = useLocation();


  return (
    <div className="page-wrapper">
      <div className="blog-area section-padding">
        <div className="container">

          {/* Breadcrumbs Start */}
          <Breadcrumbs navigate="blogs" page2="All Blogs" page3="Blog Detail" />
          {/* Breadcrumbs End */}

          <div className="row">
            {/*Blog post starts*/}
            <div className="col-12 py-100">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 py-5 px-4 border-1 rounded-3 shadow-lg">
                    <article className="post-single">
                      <div className="post-content-wrap">
                        <div className="post-content">
                          <h1 className="post-title text-center fw-bold">
                            {blog?.title}
                          </h1>
                          <div className="post-meta text-center">
                            <p className="date mt-0  d-flex gap-2 align-items-center justify-content-center">
                              <FaRegCalendarAlt /> {blog?.created_on}
                            </p>
                          </div>
                          <img
                            className="post-img w-100"
                            src={blog?.main_image}
                            alt="Blog Image"
                          />
                          <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
            {/*Blog post ends*/}
          </div>
        </div>
      </div>
    </div >
  );
};

export default BlogDetails;
