import axios from 'axios';
import Stripe from 'stripe';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51PKDQqSFNAryMmIcftwmnjuysN80ByZxzeR2aIViS0xBgW7GowngFTjOD462JH8m1BlIq6hAIspZwUo4Cz9KNpRC00cqSckLa6'
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios(
      `http://127.0.0.1:5000/api/v1/bookings/checkout-session/${tourId}`
    );

    location.replace(session.data.session.url);
    console.log(session);
  } catch (err) {
    console.log(err);
  }
};
