import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";

const ScrollToTop = () => {

  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);



  return (
    <style>{`
      html,
      body,
      #root {
        scroll-behavior: auto !important;
      }
    `}</style>
  );
};

export default ScrollToTop;
