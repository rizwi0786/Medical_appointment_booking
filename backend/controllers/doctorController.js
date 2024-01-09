const { Doctor } = require('../models/DoctorSchema');
const { Booking } = require('../models/BookingSchema')

exports.updateDoctor = async (req, res) => {
    const id = req.params.id;
    try {

        const updatedDoctor = await Doctor.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({ success: true, message: "Susccessfully Updated", data: updatedDoctor });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to  Update", err: error.message });
    }
};

exports.deleteDoctor = async (req, res) => {
    const id = req.params.id;
    try {

        await Doctor.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Susccessfully deleted" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Some internal error occured", err: error.message });
    }
};

exports.getSingleDoctor = async (req, res) => {
    const id = req.params.id;
    try {

        const doctor = await Doctor.findById(id).populate("reviews").select("-password");
        res.status(200).json({ success: true, message: "Doctor Found", data: doctor });

    } catch (error) {
        res.status(500).json({ success: false, message: "Useer not found", err: error.message });
    }
};

exports.getAllDoctor = async (req, res) => {

    try {

        const { query } = req.query
        let doctors;

        if (query) {

            doctors = await Doctor.find({ isApproved: 'approved', $or: [{ name: { $regex: query, $options: "i" } }, { specialization: { $regex: query, $options: "i" } }], }).select("-password");
        }
        else {
            doctors = await Doctor.find({ isApproved: 'approved' }).select("-password");
        }
        res.status(200).json({ success: true, message: "Doctor found", Doctor_count: doctors.length, data: doctors });

    } catch (error) {
        res.status(500).json({ success: false, message: "Not Found", err: error.message });
    }
}

exports.getDoctorsProfile = async (req, res) => {
    const doctorId = req.userId;
    try {
        
        const doctor = await Doctor.findById(doctorId)

        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor Not Found" })
        }
        const { password, ...rest } = doctor._doc;
        const appointments = await Booking.find({doctor:doctorId})

        return res.status(200).json({ success: true, message: "doctor found", data: { ...rest,appointments } })
    } catch (err) {
        return res.status(500).json({ success: false, message: "something went wrong unable to get" })
    }
}