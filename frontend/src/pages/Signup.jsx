import  { useState } from "react";
import signupImg from "../assets/images/signup.gif";

import { Link, useNavigate } from "react-router-dom";

import uploadImageToCloudinary from "../utils/uploadCloudinary";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
// import ClipLoader from "react-spinners/ClipLoader";

///import database server link
import { BASE_URL } from "../config";

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: "patient",
  });

  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(e.target.value)
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    // later we will change it
    // const data = await uploadImageToCloudinary(file);
    // console.log(data)
    const img_url = `https://source.unsplash.com/random/300×300/?profile&${
      Math.floor(Math.random() * (100 - 1 + 1)) + 1
    }`;
    // console.log(img_url)
    setPreviewURL(img_url);
    setSelectedFile(img_url);
    setFormData({ ...formData, photo: img_url });
  };

  const submitHandler = async (event) => {
    // console.log(formData);
    event.preventDefault();
    setLoading(true);
    console.log(formData);
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(res);
      const { message } = await res.json();
      // console.log("asdkjlaghkjfl")
      if (!res.ok) {
        throw new Error(message);
      }
      setLoading(false);
      toast.success(message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      // console.log(error.message);
    }
  };

  return (
    <section className=" px-5 xl:px-0">
      <div className=" max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* =========Image box */}
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className=" rounded-l-lg">
              <img src={signupImg} alt="" className=" w-full rounded-l-lg" />
            </figure>
          </div>

          {/* ============== sinup form  */}
          <div className=" rounded-l-lg lg:pl-6 py-10">
            <h3 className=" text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className=" text-primaryColor"> Account</span>
            </h3>

            <form className="" onSubmit={submitHandler}>
              <div className=" mb-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className=" w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[17px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>
              <div className=" mb-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Eamil"
                  value={formData.email}
                  onChange={handleInputChange}
                  className=" w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[17px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>
              <div className=" mb-5">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className=" w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[17px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>

              <div className=" mb-5 flex items-center justify-between ">
                <label className=" text-headingColor font-bold text-[16px] leading-7">
                  Are you a:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className=" text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="patient">patient</option>
                    <option value="doctor">doctor</option>
                  </select>
                </label>

                <label className=" text-headingColor font-bold text-[16px] leading-7">
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className=" text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Prafer not to say</option>
                  </select>
                </label>
              </div>

              <div className=" mb-5 flex items-center gap-3">
                {selectedFile && (
                  <figure className=" w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                    <img
                      src={previewURL}
                      alt=""
                      className=" w-full rounded-full"
                    />
                  </figure>
                )}

                <div className=" relative w-[130px] h-[50px]">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileInputChange}
                    accept=" .jpg, .png"
                    className=" absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="customFile"
                    className=" absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                  >
                    Upload Photo
                  </label>
                </div>
              </div>

              <div className=" mt-7">
                <button
                  disabled={loading && true}
                  type="submit"
                  className=" w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 "
                >
                  {loading ? (
                    <HashLoader color="#ffffff" loading={loading} size={30} />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>

              <p className=" mt-5 text-textColor text-center ">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className=" text-primaryColor font-medium ml-1 "
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
