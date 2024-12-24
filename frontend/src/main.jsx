import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from './components/CheckoutForm.jsx'

createRoot(document.getElementById('root')).render(
  <Elements stripe={stripePromise}>
  <App />
</Elements>,
)
