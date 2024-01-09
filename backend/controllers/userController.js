const { User } = require('../models/UserSchema');

const { Booking } = require('../models/BookingSchema')
const { Doctor } = require('../models/DoctorSchema')


exports.updateUser = async (req, res) => {
    const id = req.params.id;
    try {

        const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({ success: true, message: "Susccessfully Updated", data: updatedUser });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to  Update", err: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {

        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Susccessfully deleted" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Some internal error occured", err: error.message });
    }
};

exports.getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {

        const user = await User.findById(id).select("-password");
        res.status(200).json({ success: true, message: "User Found", data: user });

    } catch (error) {
        res.status(500).json({ success: false, message: "Useer not found", err: error.message });
    }
};

exports.getAllUser = async (req, res) => {

    try {

        const users = await User.find({}).select("-password");
        res.status(200).json({ success: true, message: "User found", user_count: users.length, data: users });

    } catch (error) {
        res.status(500).json({ success: false, message: "Not Found", err: error.message });
    }
}

exports.getUserProfile = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: "user Not Found" })
        }
        const { password, ...rest } = user._doc;
        return res.status(200).json({ success: true, message: "user found", data: { ...rest } })
    } catch (err) {
        return res.status(500).json({ success: false, message: "something went wrong unable to get" })
    }
}

exports.getMyAppointments = async (req, res) => {
    try {
        // first get appointmetns from booking for usser 
        const bookings = await Booking.find({ user: req.userId })
        

        // get docttor for each appointments
        const doctorIds = bookings.map(el => el.doctor.id)
        //get doctor using id 
        const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select('-password')
        return res.status(200).json({ success: true, message: "Appointments are here ", data: doctors })

    } catch (err) {
        return res.status(500).json({ success: false, message: "Something went wrong " })
    }
}