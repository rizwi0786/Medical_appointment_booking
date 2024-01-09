const express = require('express');

const {updateUser,deleteUser,getSingleUser,getAllUser,getUserProfile,getMyAppointments }  = require('../controllers/userController');

const {authenticate, restrict} =require('../auth/verifyToken')

const router = express.Router();

router.get('/:id',authenticate,restrict(["patient"]), getSingleUser)
router.get('/',authenticate,restrict(["admin"]),getAllUser)
router.put('/:id',authenticate,restrict(["patient"]), updateUser)
router.delete('/:id',authenticate,restrict(["patient"]),deleteUser)

router.get('/profile/me',authenticate,restrict(["patient"]),getUserProfile)

router.get('/appointments/my-appointments',authenticate,restrict(["patient"]),getMyAppointments)

exports.router = router;