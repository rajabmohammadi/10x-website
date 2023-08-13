import paypal from "@paypal/checkout-server-sdk";
import calculateAmount from "../utils/calculateAmount";
const stripe = require('stripe')('sk_test_51NUif2Fonw9wgdCPOVJnfoueYHKg0IB47I6lVDA2e4EYVKgbctlipq6H4zmQA39aQk8M7TiS4FBOqOiL9bls7neQ00hmXTO50A');
let Environment = process.env.NODE_ENV === 'production' ? paypal.core.LiveEnvironment : paypal.core.SandboxEnvironment
let client = new paypal.core.PayPalHttpClient(new Environment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET));
let storeItems = new Map([
    [1, { price: 100, name: "product1" }],
    [2, { price: 200, name: "product2" }]
])
const resolvers = {
    Query: {},
    Mutation: {
        checkout: async (_, args) => {
            let amount = await calculateAmount(args.items);
            console.log(amount)
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'usd',
                automatic_payment_methods: { enabled: true },
            });
            return {
                client_secret: paymentIntent.client_secret
            }
        },
        // checkout: async () => {
        //     const session = await stripe.checkout.sessions.create({
        //         line_items: [
        //             {
        //                 price_data: {
        //                     currency: 'usd',
        //                     product_data: {
        //                         name: 'T-shirt',
        //                     },
        //                     unit_amount: 2000,
        //                 },
        //                 quantity: 1,
        //             },
        //         ],
        //         mode: 'payment',
        //         success_url: 'http://localhost:4242/success',
        //         cancel_url: 'http://localhost:4242/cancel',
        //     });
        // },
        paypalCheckout: async () => {
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'T-shirt',
                            },
                            unit_amount: 2000,
                        },
                        quantity: 1,
                    },
                ],
                payment_method_types: ["paypal"],
                mode: 'payment',
                success_url: 'http://localhost:4242/success',
                cancel_url: 'http://localhost:4242/cancel',
            });
            console.log("session", session)
        }

        // createOrder: async (_, args) => {
        //     const request = new paypal.orders.OrdersCreateRequest();
        //     const total = args.body.items.reduce((sum, item) => {
        //         return sum + storeItems.get(item.id).price;
        //     })
        //     request.prefer("return=representation");
        //     request.requestBody({
        //         intent: "CAPTURE",
        //         purchase_units: [
        //             {
        //                 amount: {
        //                     currency_code: "USD",
        //                     value: total,
        //                     breakdown: {
        //                         item_total: {
        //                             currency_code: "USD",
        //                             value: total
        //                         }
        //                     }
        //                 },
        //                 items: args.body.items.map((item) => {
        //                     const storeItem = storeItems.get(item.id);
        //                     return {
        //                         name: storeItem.name,
        //                         unit_amount: {
        //                             currency_code: "USD",
        //                             value: storeItem.price
        //                         }
        //                     }
        //                 })
        //             }
        //         ]
        //     })

        //     try {
        //         let response = await client.execute(request);
        //         console.log(`Response: ${JSON.stringify(response)}`);
        //         // If call returns body in response, you can get the deserialized version from the result attribute of the response.
        //         console.log(`Order: ${JSON.stringify(response.result)}`);
        //     } catch (err) {

        //     }
        // }
    }

};
export default resolvers;