const dotenv=require('dotenv')
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET);

module.exports.postIntent = async(req,res)=>{
        try {
            const paymentIntent = await stripe.paymentIntents.create({
            amount:req.body.amount,
            currency:'inr',
            automatic_payment_methods:{
                enabled:true
            }
        })
        res.status(200).json({paymentIntent:paymentIntent.client_secret})
        } catch (error) {
            res.status(500).json({error:error.message})
        }
} 