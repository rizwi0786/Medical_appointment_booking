import React, { useState } from "react";
import avatar from "../../assets/images/avatar-icon.png";
import { formateDate } from "../../utils/formateDate";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";
import { BASE_URL } from "../../config";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

import './feedback.css';

// const [ld,setLd] = useState(true);

const Feedback = () => {
  const [showFeedbackForm, setShowFeedbackform] = useState(false);
  const { id } = useParams();
  const fd = {
    userPhoto: `${avatar}`,
    userName: "Rizwi MD",
    reviewText: "galksjghdlkat4;iwbv skdahgakewuoixvn savdjbhalsbvh",
    date: "2024-01-08T13:01:32.300Z",
    rating: 5,
  };
  let feedback_data = [fd];
  const [displayedReviews, setDisplayedReviews] = useState(4); // State for controlling displayed reviews
  const {
    data: f_data,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/review/${id}`);

  // Data has been fetched, continue with rendering logic
  if (f_data && f_data.length > 0) {
    // Sort feedback_data by rating in descending order
    feedback_data = f_data.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div>
      {loading && <Loading />}
      {!loading && (
        <div className="mb-[50px]">
          <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
            All reviews ({feedback_data.length})
          </h4>

          {feedback_data.slice(0, displayedReviews).map((feedback, index) => (
            <div key={index} className="flex justify-between gap-10 mb-[30px]">
              <div className="flex gap-3">
                <figure className="w-10 h-10 rounded-full">
                  <img className="w-full" src={feedback.userPhoto} alt="" />
                </figure>

                <div>
                  <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                    {feedback.userName}
                  </h5>
                  <p className="text-[14px] leading-6 text-textColor">
                    {formateDate(feedback.date)}
                  </p>
                  <p className="text__para mt-3 font-medium text-[15px]">
                    {feedback.reviewText}
                  </p>
                </div>
              </div>

              <div className="flex gap-1">
                {[...Array(feedback.rating).keys()].map((_, index) => (
                  <AiFillStar key={index} color="#0067FF" />
                ))}
              </div>
            </div>
          ))}

          {feedback_data.length > 4 && (
            <div className="right-0">
              {displayedReviews === 4 ? (
                <button
                  className=" font-semibold btn-show-more"
                  onClick={() => setDisplayedReviews(feedback_data.length)}
                >
                  Show More.....
                </button>
              ) : (
                <button
                  className=" font-semibold btn-show-less"
                  onClick={() => setDisplayedReviews(4)}
                >
                  Show Less
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {!showFeedbackForm && (
        <div className="text-center">
          <button
            className="btn"
            onClick={() => setShowFeedbackform(true)}
          >
            Give Feedback
          </button>
        </div>
      )}
      {showFeedbackForm && <FeedbackForm />}
    </div>
  );
};

export default Feedback;
