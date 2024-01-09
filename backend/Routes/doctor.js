const express = require('express');

const {updateDoctor,deleteDoctor,getSingleDoctor,getAllDoctor,getDoctorsProfile }  = require('../controllers/doctorController');
const {authenticate, restrict} =require('../auth/verifyToken')

const reviewRoute = require("./review");

const router = express.Router();


// nested router  
router.use("/:doctorId/review",reviewRoute.router)

router.get('/:id',getSingleDoctor)
router.get('/',getAllDoctor)
router.put('/:id', authenticate,restrict(["doctor"]),updateDoctor)
router.delete('/:id',authenticate,restrict(["doctor"]),deleteDoctor)
router.get('/profile/me',authenticate,restrict(["doctor"]),getDoctorsProfile)

exports.router = router;