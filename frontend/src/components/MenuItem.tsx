import type { MenuItem } from "@/types";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

type Props = {
    menuItem : MenuItem;
    addToCart : ()=>void;
}
const MenuItem = ({menuItem, addToCart}:Props) => {
  return(
    <Card className="cursor-pointer w-full">
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle>{menuItem.name}</CardTitle>
        <Button onClick={addToCart} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-gray-400">
          Add
        </Button>
      </div>
    </CardHeader>
    <CardContent className="font-bold">
      ${((menuItem.price) / 100).toFixed(2)}
    </CardContent>
  </Card>
  )
}

export default MenuItem