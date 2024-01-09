const express = require('express');

const {createReview,getAllReview,getAllByDoctor,getTopReviews} = require("../controllers/reviewController")

const {authenticate, restrict} =require('../auth/verifyToken')

const router = express.Router({mergeParams:true});

router.get('/',getAllReview)
router.get('/getTop',getTopReviews)
router.get('/:id',getAllByDoctor)
router.post('/',authenticate,restrict(["patient"]),createReview)


exports.router = router;