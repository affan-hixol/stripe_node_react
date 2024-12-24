import express from 'express';
import path from 'path';
import Stripe from 'stripe';
import cors from 'cors'
const app = express();

app.use(cors());
const stripe = new Stripe('sk_test_51QVPoFLwo4KUzFjBGAKkXD9Y9FOldD1jib1VksRaT1FKqPI3YYlpbkd15E7kLBqU9ZvzsEs8r3vsbroNtNYKhDye003DqusIbg');
app.use(express.json())
app.use(express.static(path.resolve("")))

app.get('/',(req,res)=>{
    res.send('<h1>Welcome</h1>');
})
app.post('/create', async (req, res) => {
    try {
        const { amount, currency} = req.body
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, 
            currency,
        });
        res.status(200).json({
            paymentIntentID: paymentIntent.id,
            clientSecret: paymentIntent.client_secret,
          });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
app.post('/payment', async (req, res) => {
    try {
        const product = await stripe.products.create({
            name: "T-Shirt",
        });

        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: 12 * 100, // 100 INR
            currency: 'usd',
        });

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: price.id,
                    quantity: 1,
                }
            ],
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel',
            customer_email: 'alihasan331229@gmail.com',
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error('Error creating payment session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
