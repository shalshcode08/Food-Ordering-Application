import { Order } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";

type Props = {
    order : Order;
}

const OrderItemCard = ({order}:Props) => {
    const getTime = () => {
        const orderDateTime = new Date(order.createdAt);

        const hours = orderDateTime.getHours();
        const minutes = orderDateTime.getMinutes();

        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours} : ${paddedMinutes}`
    }
  return (
    <Card>
        <CardHeader>
            <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
                <div>
                    Customer Name : 
                    <span className="ml-2 font-normal">{order.deliveyDetails.name}</span>
                </div>
                <div>
                    Delivery Address : 
                    <span className="ml-2 font-normal">{order.deliveyDetails.addressLine1}, {order.deliveyDetails.city}</span>
                </div>
                <div>
                    Time : 
                    <span className="ml-2 font-normal">{getTime()}</span>
                </div>
                <div>
                    Total Cost : 
                    <span className="ml-2 font-normal">${(order.totalAmount /100).toFixed(2)}</span>
                </div>
            </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                {order.cartItems.map((item)=> (
                    <span>
                        <Badge variant="outline" className="mr-2">{item.quantity}</Badge>
                        {item.name}
                    </span>
                ))}
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="status">What is the status of the order?</Label>
            </div>
        </CardContent>
    </Card>
  )
}

export default OrderItemCard