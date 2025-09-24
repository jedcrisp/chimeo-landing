// Stripe Backend Integration Example
// This is a Node.js/Express example for handling Stripe payments

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json());

// Stripe pricing configuration
const PRICING = {
    pro: {
        monthly: 'price_pro_monthly_id', // Replace with your actual Stripe price ID
        annual: 'price_pro_annual_id'
    },
    premium: {
        monthly: 'price_premium_monthly_id', // Replace with your actual Stripe price ID
        annual: 'price_premium_annual_id'
    }
};

// Create checkout session endpoint
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { plan, price, success_url, cancel_url } = req.body;
        
        // Determine if it's annual or monthly based on price
        const isAnnual = price.toString().endsWith('00'); // e.g., 1000 = annual, 100 = monthly
        const priceId = PRICING[plan][isAnnual ? 'annual' : 'monthly'];
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: success_url + '?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: cancel_url,
            metadata: {
                plan: plan,
                price: price
            }
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});

// Webhook endpoint for Stripe events
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.log(`Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log('Payment succeeded:', session.id);
            // Update user's subscription status in your database
            break;
        case 'invoice.payment_succeeded':
            const invoice = event.data.object;
            console.log('Subscription payment succeeded:', invoice.id);
            // Handle successful recurring payment
            break;
        case 'invoice.payment_failed':
            const failedInvoice = event.data.object;
            console.log('Subscription payment failed:', failedInvoice.id);
            // Handle failed payment
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({received: true});
});

// Success page handler
app.get('/success', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Payment Successful - Chimeo</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                    .success { color: #10b981; font-size: 24px; margin-bottom: 20px; }
                    .btn { background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; }
                </style>
            </head>
            <body>
                <div class="success">✅ Payment Successful!</div>
                <p>Welcome to Chimeo! Your subscription is now active.</p>
                <a href="https://chimeo.app" class="btn">Go to Dashboard</a>
            </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Environment variables needed:
// STRIPE_SECRET_KEY=sk_test_...
// STRIPE_WEBHOOK_SECRET=whsec_...
// PORT=3000
