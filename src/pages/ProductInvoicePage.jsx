import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Api } from "../services/api";
import { toast } from "react-toastify";
import ProductInvoice from "../components/ProductInvoice";

const ProductInvoicePage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const { data: productData, mutate, isPending } = useMutation({
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
          toast.error(res.data.message);
          navigate("/products");
          return null;
        }
        return res.data.data;
      }),
  });

  useEffect(() => {
    if (productId) {
      mutate(productId);
    }
  }, [productId, mutate]);

  if (isPending || !productData) {
    return (
      <div className="loader-main">
        <span className="loader" />
      </div>
    );
  }

  // Yaha sirf ProductInvoice dikh raha hai
  return <ProductInvoice product={productData} />;
};

export default ProductInvoicePage;
