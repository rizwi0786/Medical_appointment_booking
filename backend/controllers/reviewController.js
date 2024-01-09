const { Doctor } = require("../models/DoctorSchema")
const {Review} = require("../models/ReviewSchema")



// get all review 

exports.getAllReview = async(req,res)=>{
    
    try {
        const review = await Review.find({})
        res.status(200).json({success:true, message:"successfully fetched", data:review});
    } catch (error) {
        res.status(404).json({success:false, message:"Not Found get"});
    }
}

exports.getTopReviews = async (req, res) => {
  try {
    const topReviews = await Review.find({})
      .sort({ rating: -1 }) // Sort in descending order based on rating
      .limit(10); // Limit the result to the top 10 reviews

    res.status(200).json({ success: true, message: "Successfully fetched top reviews", data: topReviews });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.createReview = async (req, res) => {
    if (!req.body.doctor)
        req.body.doctor = req.params.doctorId;
    if (!req.body.user)
        req.body.user = req.userId;

    // Create a new Review instance
    const newReview = new Review({
        doctor: req.body.doctor,
        user: req.body.user,
        reviewText: req.body.reviewText,
        rating: req.body.rating,
    });

    try {
        // Save the newReview to the database
        const savedReview = await newReview.save();

        // Update the Doctor model to include the new review ID
        await Doctor.findByIdAndUpdate(req.body.doctor, { $push: { reviews: savedReview._id } });

        return res.status(200).json({ success: true, message: "Successfully submitted review", data: savedReview });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Unable to submit review", error: err.message });
    }
}
exports.getAllByDoctor = async (req,res)=>{
    
        const doctorId = req.params.id;
        // console.log(doctorId)
        try {
            // Find the doctor by ID and populate the reviews field with user data
            const doctor = await Doctor.findById(doctorId).populate({
              path: 'reviews',
              populate: {
                path: 'user',
                select: 'name photo',
              },
            });
        
            if (!doctor) {
              return res.status(404).json({ success: false, message: 'Doctor not found' });
            }
        
            // The doctor.reviews array now contains all reviews with populated user data
            const reviewsWithUserData = doctor.reviews.map(review => ({
              reviewText: review.reviewText,
              rating: review.rating,
              userPhoto: review.user.photo,
              userName: review.user.name,
              date: review.createdAt, // Assuming createdAt is the date property of the Review model
            }));
        
            res.status(200).json({ success: true, data: reviewsWithUserData });
          } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
          }
}


