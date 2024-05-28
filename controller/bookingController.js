const stripe = require('stripe')(process.env.SESSION_SECRET_KEY);
const Tour = require('./../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('./../utils/catchAsync');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1 get the current book tour
  const tour = await Tour.findById(req.params.tourId);
  // const img = `http://127.0.0.1:5000/img/tours/${tour.imageCover}`;
  // 2 create checkout session
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    // automatic_payment_methods: { enabled: true },
    // metadata: {
    //   'Content-Type': 'image/jpeg',
    // },
    // success_url: `${req.protocol}://${req.get('host')}/?tour${
    //   req.params.tourId
    // }&user=${req.user.id}&price=${tour.price}`,
    success_url: `${req.protocol}://${req.get('host')}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'inr',
          unit_amount: tour.price * 100,
          product_data: {
            description: tour.summary,
            name: `${tour.name} Tour`,
            images: [`http://127.0.0.1:5000/img/tours/${tour.imageCover}`],
          },
        },
      },
    ],
  });
  // console.log(session);
  // 3 create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  const { tour, user, price } = req.query;

  if (!tour && !user && !price) return next();

  await Booking.create({ tour, user, price });
});
