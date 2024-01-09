import React from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import patientAwatar from "../../assets/images/patient-avatar.png";
import { HiStar } from "react-icons/hi";
import Loading from "../Loader/Loading";
import Error from "../Error/Error";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Feedback from "../../pages/Doctors/Feedback";

const Testimonial = () => {
  const fd = {
    user: {
      photo: `${patientAwatar}`,
      name: "Rizwi MD",
    },
    reviewText: "galksjghdlkat4;iwbv skdahgakewuoixvn savdjbhalsbvh",
    date: "2024-01-08T13:01:32.300Z",
    rating: 5,
  };
  let feedback_data = [fd];

  const {
    data: f_data,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/review/getTop`);

  // Data has been fetched, continue with rendering logic
  if (f_data && f_data.length > 0) {
    // Sort feedback_data by rating in descending order
    feedback_data = f_data;
  }
  console.log(feedback_data);
  console.log(feedback_data[0].user.name);

  return (
    <div className="mt-[30px] lg:mt-[px]">
      {loading && <Loading />}
      {!loading && feedback_data.length > 0 && (
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {feedback_data.map((feeback, index) => (
            <SwiperSlide key={index}>
              <div className=" py-[30px] px-5 rounded-3">
                <div className=" flex items-center gap-[13px]">
                  <img src={feeback.user.photo} alt="" />
                  <div>
                    <h4 className="text-[18px] leading--[30px] font-semibold text-headingColor">
                      {loading && "Hello"}
                      {!loading && feeback.user.name}
                    </h4>
                    <div className=" flex items-center gap-[2px]">
                      {[...Array(Math.round(feeback.rating)).keys()].map(
                        (_, i) => (
                          <HiStar
                            key={i}
                            className="text-yellowColor w-[18px] h-5"
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-[16px] leading-7 mt-7 text-textColor font-[400]">
                  {feeback.reviewText}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Testimonial;
