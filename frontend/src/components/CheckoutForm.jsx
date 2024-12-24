import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

// Replace with your actual public key
export const stripePromise = loadStripe('pk_test_51QVPoFLwo4KUzFjBzSuz5mdi7gtI5MOp4Pdz5jnJvhLJ9Eg211Annlz26LBTnlEfSnWXSmYfy9R6kNTzmPynVJdJ00XfTrZtEa');

const CheckoutForm = () => {
  const buyFunction = async () => {
    try {
      const response = await axios.post('http://localhost:3000/payment');
      if (response.status === 200) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };
  
  return (
    <div className='flex flex-col item-center justify-center gap-8'>
     <h1 className='font-bold text-[40px] text-center'>Buy a T-Shirt</h1>
     <button className='btn-large w-[130px] mx-auto' onClick={buyFunction}>Buy Now</button>
    </div>
  );
};

export default CheckoutForm;
