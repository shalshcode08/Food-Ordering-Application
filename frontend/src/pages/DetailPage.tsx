import { useGetRestaurant } from "@/api/RestaurantApi";
import CheckOutButton from "@/components/CheckOutButton";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { MenuItem as MenuItemType } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
};

const DetailPage = () => {
    const { restaurantId } = useParams();
    const { restaurant, isLoading } = useGetRestaurant(restaurantId);

    const [cartItems, setCartItems] = useState<CartItem[]>(()=>{
        const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
        return storedCartItems? JSON.parse(storedCartItems) : [];
    });

    const addToCart = (menuItem: MenuItemType) => {
        setCartItems((prevCartItem) => {
            const existingCartItem = prevCartItem.find(
                (cartItem) => cartItem._id === menuItem._id
            );

            let updateCartItem;
            if (existingCartItem) {
                updateCartItem = prevCartItem.map((cartItem) =>
                    cartItem._id === menuItem._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                updateCartItem = [
                    ...prevCartItem,
                    {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1,
                    },
                ];
            }

            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updateCartItem));
            return updateCartItem;
        });
    };

    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems: CartItem[]) => {
            const updatedCartItems = prevCartItems
                .map((item) => {
                    if (item._id === cartItem._id) {
                        return item.quantity > 1
                            ? { ...item, quantity: item.quantity - 1 }
                            : null;
                    }
                    return item;
                })
                .filter((item) => item !== null);
                sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));
                return updatedCartItems;
        });
    };

    if (isLoading || !restaurant) {
        return "Loading...";
    }

    return (
        <div className="flex flex-col gap-10 px-5">
            <AspectRatio ratio={16 / 5}>
                <img
                    className="rounded-md object-cover h-full w-full"
                    src={restaurant?.imageUrl}
                />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-16">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tight px-2">Menu</span>
                    {restaurant.menuItems.map((menuItem) => (
                        <MenuItem
                            menuItem={menuItem}
                            addToCart={() => addToCart(menuItem)}
                        />
                    ))}
                </div>
                <div className="">
                    <Card>
                        <OrderSummary
                            restaurant={restaurant}
                            cartItems={cartItems || []}
                            removeFromCart={removeFromCart}
                        />
                        <CardFooter>
                            <CheckOutButton/>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;
