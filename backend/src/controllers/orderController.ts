import Stripe from "stripe";
import { Request, Response } from "express";
import Restaurant, { MenuItemType } from "../models/restaurant";
import Order from "../models/order";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FORNTEND_URL as string;

type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: string;
    }[];
    deliveryDetails: {
        name: string;
        email: string;
        addressLine1: string;
        city: string;
    };
    restaurantId: string;
};

const stripeWebhookHandler = async(req : Request , res : Response) => {
    console.log("RECIVED EVENT");
    console.log("=============");
    console.log("event : ", req.body);
    res.send();
    
}

const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const checkoutSessionRequest: CheckoutSessionRequest = req.body;
        const restaurant = await Restaurant.findById(
            checkoutSessionRequest.restaurantId
        );

        if (!restaurant) {
            throw new Error("Restaurant not found");
            return;
        }

        const newOrder = new Order({
            restaurant: restaurant,
            user: req.userId,
            status: "placed",
            deliveyDetails: checkoutSessionRequest.deliveryDetails,
            cartItems: checkoutSessionRequest.cartItems,
            createdAt: new Date(),
        });

        const lineItems = createLineItems(
            checkoutSessionRequest,
            restaurant.menuItems
        );

        const session = await createSession(
            lineItems,
            newOrder._id.toString(),
            restaurant.deliveryPrice,
            restaurant.id.toString()
        );

        if (!session.url) {
            res.status(500).json({
                message: "Error creating stripe session",
            });
            return;
        }
        await newOrder.save();
        res.json({ url: session.url });
    } 
    catch (error: any) {
        console.log(error);
        res.status(500).json({
            message: error.raw.message,
        });
        return;
    }
};

const createLineItems = (
    checkoutSessionRequest: CheckoutSessionRequest,
    menuItems: MenuItemType[]
) => {
    const lineItems = checkoutSessionRequest.cartItems.map((item) => {
        const menuItem = menuItems.find(
            (currentItem) => currentItem._id.toString() == item.menuItemId.toString()
        );

        if (!menuItem) {
            throw new Error(`Menu item not found : ${item.menuItemId}`);
        }

        const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
            price_data: {
                currency: "usd",
                unit_amount: menuItem.price,
                product_data: {
                    name: menuItem.name,
                },
            },
            quantity: parseInt(item.quantity),
        };
        return line_item;
    });
    return lineItems;
};

const createSession = async (
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
    orderId: string,
    deliveryPrice: number,
    restaurantId: string
) => {
    const sessionData = await stripe.checkout.sessions.create({
        line_items: lineItems,
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: "Delivery",
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: deliveryPrice,
                        currency: "usd",
                    },
                },
            },
        ],
        mode: "payment",
        metadata: {
            orderId,
            restaurantId,
        },
        success_url: `${FRONTEND_URL}/order-status?success=true`,
        cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
    });

    return sessionData;
};

export default {
    createCheckoutSession,
    stripeWebhookHandler,
};
