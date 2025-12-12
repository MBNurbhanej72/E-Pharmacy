import { IoIosMail } from "react-icons/io";
import { MdCall, MdLocationPin } from "react-icons/md";
import Breadcrumbs from "../components/Breadcrumbs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../validation/contactSchema";
import { queryClient } from "../main";
import { toast } from "react-toastify";
import { Api } from "../services/api";

const Contact = () => {

  const { data: contactData, error, refetch } = useQuery({
    queryKey: ["contact-data"],

    queryFn: async () => await Api.get("common_request_api/get_list_ddr/country_list").then(res => res.data.data),

    staleTime: 24 * 60 * 60 * 1000, // 1 Day
  });



  const postContactData = useMutation({
    mutationFn: async (data) => await Api.post("common_request_api/submit_contact", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }),

    onSuccess: (res) => {
      if (res.status === 200) {
        queryClient.invalidateQueries(["contact-data"]);

        toast.success(res.data.message);

        reset();
      }
    },

    onError: (err) => {
      toast.error("Something went wrong!" || err?.message + "!");
    }
  });



  const { handleSubmit, register, reset, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema)
  });


  const onSubmit = (data) => {
    const phoneNumber = `${data.countryCode}-${data.phone}`;

    postContactData.mutate({ ...data, phone: phoneNumber, user_agent: "EI-WEB" });
  };



  return (
    <>
      {/*Contact info starts */}
      <div className="contact-info section-padding">
        <div className="container">

          {/* Breadcrumbs Start */}
          <Breadcrumbs parentLabel="Contact Us" />
          {/* Breadcrumbs End */}

          {error ? (
            <>
              <div className="container my-5">
                <h1>{error.message}</h1>
              </div>

              <button className="btn btn-outline-secondary" onClick={refetch}>Refetch Data</button>
            </>
          ) :
            <div className="row mt-50">
              <div className="section-title v2">
                <h2 className="fw-bold">Contact Us</h2>
              </div>
              <form className="p-4 rounded-3" id="contact_form" style={{ boxShadow: "rgb(0 0 0 / 10%) 0px 4px 18px" }} onSubmit={handleSubmit(onSubmit)}>
                <div className="row form-control-wrap">

                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control fw-medium"
                        placeholder="Name *"
                        {...register("name")}
                        style={{ color: "#595c5f" }}
                      />

                      <p className="text-danger ms-2 mt-1" style={{ height: 20 }}>{errors?.name?.message}</p>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control fw-medium"
                        placeholder="Email *"
                        {...register("email")}
                        style={{ color: "#595c5f" }}
                      />

                      <p className="text-danger ms-2 mt-1" style={{ height: 20 }}>{errors?.email?.message}</p>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <select {...register("countryCode")} className="form-control fw-medium" style={{ color: "#595c5f", height: 45, borderRadius: 3 }}>
                        <option value="">Select Country Code *</option>
                        {contactData?.map(e => (
                          <option value={e.country_code} key={e.id}>{e.val} ({e.country_code})</option>
                        ))}
                      </select>

                      <p className="text-danger ms-2 mt-1" style={{ height: 20 }}>{errors?.countryCode?.message}</p>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control fw-medium"
                        placeholder="Phone Number *"
                        {...register("phone")}
                        style={{ color: "#595c5f" }}
                      />

                      <p className="text-danger ms-2 mt-1" style={{ height: 20 }}>{errors?.phone?.message}</p>
                    </div>
                  </div>

                  <div className="form-group">
                    <textarea
                      className="form-control fw-medium"
                      rows={8}
                      placeholder="Message *"
                      {...register("message")}
                      style={{ color: "#595c5f" }}
                    />

                    <p className="text-danger ms-2 mt-1" style={{ height: 20 }}>{errors?.message?.message}</p>
                  </div>
                  <div className="form-group m-0">
                    <button type="submit" className="btn v7">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          }

        </div>
      </div>
      {/*Contact info ends */}


      {/*Contact section starts*/}
      <div className="contact-section v1 mb-120">
        <div className="container">
          <div className="row p-4 rounded-3" style={{ boxShadow: "rgb(0 0 0 / 10%) 0px 4px 18px" }}>

            <div className="col-lg-6 col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470027.2875200896!2d72.25005607057591!3d23.020534158517542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1764394113759!5m2!1sen!2sin"
                className="w-100"
                height={500}
                style={{ border: 0 }}
              />
            </div>

            <div className="col-lg-6 col-12 d-flex flex-column justify-content-center mt-5 mt-lg-0">
              <div>
                <div className="col-12">
                  <div className="contact-info-item">
                    <MdLocationPin size={35} color="#018bc8" />
                    <h4 className="fw-bold">E-Pharmacy</h4>
                    <p>Gujarat, 383001 India</p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="contact-info-item">
                    <MdCall size={35} color="#018bc8" />
                    <h4 className="fw-bold">Phone Number</h4>
                    <p>
                      +91 1234567890
                    </p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="contact-info-item">
                    <IoIosMail size={35} color="#018bc8" />
                    <h4 className="fw-bold">Email</h4>
                    <p>
                      info@emaadinfotech.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/*Contact section ends*/}
    </>
  );
};

export default Contact;