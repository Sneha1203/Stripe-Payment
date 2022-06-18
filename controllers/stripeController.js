const stripe = require('stripe')(process.env.SECRET_KEY)

const stripeController = async (request, response) => {
    const {purchase, total_amount, shipping_fee} = request.body

    const calcOrderAmount= () => {
        return total_amount + shipping_fee
    }

    const paymentIntent = await stripe.paymentIntent.create({
        amount: calcOrderAmount(), 
        currency: 'usd'
    })
    // response.send('stripe route')
    response.json({ clientSecret: paymentIntent.client_secret })
}

module.exports = stripeController