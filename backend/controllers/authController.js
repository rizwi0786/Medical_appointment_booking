
const { User } = require('../models/UserSchema');
const { Doctor } = require("../models/DoctorSchema")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const generateToken = user=>{
    return jwt.sign({id:user._id,role:user.role}, process.env.SECRET_KEY,{expiresIn:"15d",});
}

exports.register = async (req, res) => {
    const { email, password, name, role, photo, gender } = req.body;
    // console.log(req.body)
    try {
        let user=null ;
        if (role === 'patient') {
            user = await User.findOne({ email })
        }
        else if (role === 'doctor') {
            user = await Doctor.findOne({ email })
        }
        // check if user exists 
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }
            // console.log(user)
        // hash password 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        if (role === 'patient') {
            console.log(user)
            user = new User({
                name,
                email,
                password: hashPassword,
                photo,
                gender
            });
            // console.log(user)
        }
        else if (role === 'doctor') {
            user = new Doctor({
                name,
                email,
                password: hashPassword,
                photo,
                gender
            });
        }
        // console.log(user)
        await user.save();
        res.status(200).json({ success: true, message: "User successfully registerd" })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal Server error" })
    }
};
exports.login = async (req, res) => {
    const { email } = req.body;
    // console.log(req.body)
    try {
        let user = null;
        const patient = await User.findOne({ email });
        const doctor = await Doctor.findOne({ email });

        if (patient) {
            user = patient;
        } else if (doctor) {
            user = doctor;
        }

        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        // Check password
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Get token
        const token = generateToken(user);

        const { password, role, appointments, ...rest } = user._doc;
        return res.status(200).json({ success: true, message: "Successfully login", token, data: { ...rest }, role });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ success: false, message: "Failed login" });
    }
};
