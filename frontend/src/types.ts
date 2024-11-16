
export type User = {
    _id : string,
    email : string,
    name : string,
    country : string,
    city : string,
    addressLine1 : string,
}

export type MenuItem = {
    _id : string,
    name : string,
    price : number,
}

export type Restaurant = {
    _id : string,
    user : string,
    restaurantName : string,
    city : string,
    country : string,
    deliveryPrice : number,
    estimatedDeliveryTime : number,
    cuisines : string[],
    menuItems : MenuItem[];
    imageUrl : string,
    lastUpdated : string,
}

export type OrderStatus = "placed" | "paid" | "inProgress" | "outForDelivery" | "delivered";

export type Order = {
    _id : string,
    restaurant : Restaurant,
    user : User,
    cartItems : {
        menuItemId : string,
        name : string,
        quantity : string,
    }[];
    deliveyDetails : {
        name : string,
        email : string,
        city : string,
        addressLine1 : string,
    },
    totalAmount : number,
    status : OrderStatus,
    createdAt : string,
    restaurantId : string,
}

export type RestaurantSearchResponse = {
    data : Restaurant[],
    pagination : {
        total : number,
        page : number,
        pages : number,
    }
}