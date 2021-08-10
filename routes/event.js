const router = require('express').Router();
const {bookingEventHandler}  = require('../events/booking.event')


router.get('/bookingEvents/:id',bookingEventHandler)



module.exports = router