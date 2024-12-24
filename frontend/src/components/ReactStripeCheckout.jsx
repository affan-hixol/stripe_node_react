import axios from 'axios';
import React, { useEffect, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'

const ReactStripeCheckout = () => {
    const [product, setProduct] = useState({
        name: "M10",
        price: 10,
        productBy: "TWS"
    })
    const [clientSecret, setClientSecret] = useState('');
    const envfile = import.meta.env.STRIPE_KEY
    const key = import.meta.env.key
    console.log("stirpe key: ",envfile);
    console.log(" key: ",key);
    const makePayment =  (token) => {
        const body = {
            token,
            product,
            
        }
        const headers = {
            "Content-Type": "application/json"
        }
        return fetch('http://localhost:3000/create', {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
          })
          .then(response => {
            console.log("RESPONSE: ",response);
            const { status} = response;
            console.log("STATUS: ",status);
          })
          .catch(error => {
            console.error('Error:', error);
          });
       
      };
    
     
  return (
    <div>
      <StripeCheckout
      stripeKey={'pk_test_51QVPoFLwo4KUzFjBzSuz5mdi7gtI5MOp4Pdz5jnJvhLJ9Eg211Annlz26LBTnlEfSnWXSmYfy9R6kNTzmPynVJdJ00XfTrZtEa'}
      token={makePayment}
      name='Buy Order'
      email='ali2@gmail.com'
      amount={product.price * 100}
      >
      <button className='btn-large blue'>Buy Now</button>
      </StripeCheckout>

    </div>
  )
}

export default ReactStripeCheckout
