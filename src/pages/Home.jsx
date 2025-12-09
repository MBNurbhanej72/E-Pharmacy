import "../assets/css/plugin.css";
import "../assets/css/style.css";
import "../App.css";
// import Swiper JS
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { usePrefetchInfiniteQuery, usePrefetchQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Api } from "../services/api";


const Home = () => {

  //? Swiper Api
  const { data: swiperData, isPending, error } = useQuery({
    queryKey: ["swiperData"],

    queryFn: async () => await Api.get("common_request_api/banner_listing?page=1").then(res => res.data.data),

    staleTime: 24 * 60 * 60 * 1000, // 1 Day
  });



  //? Products Api
  usePrefetchInfiniteQuery({
    queryKey: ["products"],

    queryFn: async () => await Api.post("/product_api/search_product", {
      user_agent: "EI-AAPP",
      page_number: 1,
      limit_per_page: 12
    }, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(res => res.data.data),

    staleTime: 24 * 60 * 60 * 1000, // 1 Day
  });



  //? Blogs Api
  usePrefetchQuery({
    queryKey: ["blogs"],

    queryFn: async () => await Api.get("common_request_api/get_blog_listing").then(res => res.data.data),

    staleTime: 24 * 60 * 60 * 1000, // 1 Day
  });



  if (error) return <h1>{error.message}</h1>;


  // const img = ["/images/banner1.png", "/images/banner2.jpg", "/images/banner3.jpg"];



  // const [index, setIndex] = useState(0);

  // const [isPaused, setIsPaused] = useState(false);


  // useEffect(() => {
  //   if (isPaused) return;

  //   const interval = setInterval(() => {
  //     onNext();
  //   }, 3000);

  //   return () => clearInterval(interval);

  // }, [index, isPaused]);



  // const onPrev = () => {
  //   setIndex(prev => (prev - 1 + img.length) % img.length);
  // };



  // const onNext = () => {
  //   setIndex(prev => (prev + 1) % img.length);
  // };



  return (
    <>
      <div className="page-wrapper mt-3" style={{ height: `${isPending ? "100vh" : "100%"}` }}>
        <div className="swiper-main">
          {isPending ? <div className="loader-main"><span className="loader" /></div> :
            <Swiper
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              slidesPerView={1}
              spaceBetween={0}
              centeredSlides={false}
              loop={true}
              modules={[Pagination, Autoplay]}
              className="mySwiper"
            >
              {Array.isArray(swiperData) && swiperData?.length ? (
                swiperData?.map(e => (
                  <SwiperSlide key={e.id}>
                    <img src={e.banner} alt="Slider Image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </SwiperSlide>
                ))) : null}
            </Swiper>
          }


          {/* <div className="position-relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            <img src={img[index]} className="w-100" alt="Banner-Images" />

            <button style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: 20 }} onClick={onPrev}> Prev </button>

            <button style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", right: 20 }} onClick={onNext}> Next </button>
          </div> */}



        </div>
      </div>
    </>
  );
};

export default Home;