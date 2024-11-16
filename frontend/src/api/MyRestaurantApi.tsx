import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// getting restaurant hook //
export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest
  );

  return { restaurant, isLoading };
};

// creating restaurant hook //
export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }

    return response.json();
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant created!");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { createRestaurant, isLoading };
};

// updating restaurant hook //
export const useUpdateMyRestaurant = () => {
  const {getAccessTokenSilently} = useAuth0();

  const updateMyRestaurantRequest = async( restaurantFormData: FormData) : Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method : "PUT",
      headers : {
        Authorization: `Bearer ${accessToken}`,
      },
      body : restaurantFormData,
    })

    if(!response.ok){
      throw new Error("failed to update restaurant")
    }
    return response.json();
  }

  const {mutate : updateRestaurant, isLoading, error, isSuccess} = useMutation(updateMyRestaurantRequest); 

  if(isSuccess){
    toast.success("Restaurat Updated");
  }

  if(error){
    toast.error("Unable to update the restaurant");
  }

  return{
    isLoading, 
    updateRestaurant,
  }
}

export const useGetMyRestaurantOrders = () => {
  const {getAccessTokenSilently} = useAuth0();
  const getMyRestaurantOrderRequest = async() : Promise<Order[]> =>{
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
      headers : {
        Authorization : `Bearer ${accessToken}`,
        "Content-Type" : "application/json",
      }
    })
    if(!response.ok){
      throw new Error("Failed to fetch order");
    }
    return response.json();
  } 

  const {data:orders, isLoading} = useQuery("fetchMyRestaurantOrders", getMyRestaurantOrderRequest);

  return{
    orders,
    isLoading,
  }
}